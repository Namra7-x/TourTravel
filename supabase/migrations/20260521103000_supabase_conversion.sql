create extension if not exists pgcrypto;

do $$
begin
    create type public.payment_status as enum ('pending', 'success', 'failed', 'refunded');
exception
    when duplicate_object then null;
end $$;

do $$
begin
    create type public.booking_status as enum ('pending', 'confirmed', 'cancelled');
exception
    when duplicate_object then null;
end $$;

create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    name text not null,
    email text not null unique,
    created_at timestamptz not null default now()
);

create index if not exists profiles_email_idx on public.profiles (email);

create table if not exists public.tours (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    location text not null,
    country text not null,
    price numeric(10, 2) not null check (price >= 0),
    discount_price numeric(10, 2) check (discount_price is null or discount_price >= 0),
    duration integer not null check (duration > 0),
    nights integer not null default 0 check (nights >= 0),
    max_group_size integer not null check (max_group_size > 0),
    rating double precision not null default 0 check (rating >= 0 and rating <= 5),
    total_reviews integer not null default 0 check (total_reviews >= 0),
    overview text not null default '',
    description text not null,
    category text not null,
    best_time_to_visit text not null default '',
    tour_type text not null default '',
    destinations text[] not null default '{}'::text[],
    highlights text[] not null default '{}'::text[],
    inclusions text[] not null default '{}'::text[],
    exclusions text[] not null default '{}'::text[],
    created_at timestamptz not null default now()
);

create index if not exists tours_location_idx on public.tours (location);
create index if not exists tours_country_idx on public.tours (country);
create index if not exists tours_category_idx on public.tours (category);
create index if not exists tours_price_idx on public.tours (price);
create index if not exists tours_created_at_idx on public.tours (created_at);

create table if not exists public.tour_images (
    id uuid primary key default gen_random_uuid(),
    tour_id uuid not null references public.tours (id) on delete cascade,
    url text not null,
    created_at timestamptz not null default now()
);

create index if not exists tour_images_tour_id_idx on public.tour_images (tour_id);

create table if not exists public.itineraries (
    id uuid primary key default gen_random_uuid(),
    tour_id uuid not null references public.tours (id) on delete cascade,
    day_number integer not null check (day_number > 0),
    title text not null,
    description text not null,
    overnight_stay text,
    meals_included text,
    created_at timestamptz not null default now(),
    unique (tour_id, day_number)
);

create index if not exists itineraries_tour_id_idx on public.itineraries (tour_id);

create table if not exists public.wishlists (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    tour_id uuid not null references public.tours (id) on delete cascade,
    created_at timestamptz not null default now(),
    unique (user_id, tour_id)
);

create index if not exists wishlists_user_id_idx on public.wishlists (user_id);
create index if not exists wishlists_tour_id_idx on public.wishlists (tour_id);

create table if not exists public.bookings (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    tour_id uuid not null references public.tours (id) on delete cascade,
    date timestamptz not null,
    people_count integer not null check (people_count >= 1),
    total_price numeric(10, 2) not null check (total_price >= 0),
    payment_status public.payment_status not null default 'pending',
    booking_status public.booking_status not null default 'pending',
    created_at timestamptz not null default now()
);

create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_tour_id_idx on public.bookings (tour_id);
create index if not exists bookings_date_idx on public.bookings (date);

create table if not exists public.reviews (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    tour_id uuid not null references public.tours (id) on delete cascade,
    rating integer not null check (rating >= 1 and rating <= 5),
    comment text not null check (char_length(comment) between 2 and 1000),
    created_at timestamptz not null default now(),
    unique (user_id, tour_id)
);

create index if not exists reviews_tour_id_idx on public.reviews (tour_id);
create index if not exists reviews_user_id_idx on public.reviews (user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, name, email)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'name', ''),
        coalesce(new.email, '')
    );

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace view public.review_profiles as
select
    id,
    name,
    created_at
from public.profiles;

comment on view public.review_profiles is 'Public reviewer profile projection without email';

create or replace function public.recalculate_tour_review_stats(p_tour_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
    v_average_rating double precision;
    v_review_count integer;
begin
    select
        avg(rating)::double precision,
        count(*)::integer
    into v_average_rating, v_review_count
    from public.reviews
    where tour_id = p_tour_id;

    update public.tours
    set
        rating = coalesce(v_average_rating, 0),
        total_reviews = coalesce(v_review_count, 0)
    where id = p_tour_id;
end;
$$;

create or replace function public.create_booking(
    p_tour_id uuid,
    p_date timestamptz,
    p_people_count integer
)
returns public.bookings
language plpgsql
security definer
set search_path = public, auth
as $$
declare
    v_user_id uuid := auth.uid();
    v_tour public.tours;
    v_effective_price numeric(10, 2);
    v_booking public.bookings;
begin
    if v_user_id is null then
        raise exception 'You are not logged in';
    end if;

    if p_date <= now() then
        raise exception 'Travel date must be in the future';
    end if;

    if p_people_count < 1 then
        raise exception 'People count must be at least 1';
    end if;

    select *
    into v_tour
    from public.tours
    where id = p_tour_id;

    if not found then
        raise exception 'Tour not found';
    end if;

    if p_people_count > v_tour.max_group_size then
        raise exception 'People count exceeds tour capacity';
    end if;

    v_effective_price := coalesce(v_tour.discount_price, v_tour.price);

    insert into public.bookings (
        user_id,
        tour_id,
        date,
        people_count,
        total_price,
        payment_status,
        booking_status
    )
    values (
        v_user_id,
        p_tour_id,
        p_date,
        p_people_count,
        v_effective_price * p_people_count,
        'pending',
        'pending'
    )
    returning * into v_booking;

    return v_booking;
end;
$$;

create or replace function public.pay_booking(p_booking_id uuid)
returns public.bookings
language plpgsql
security definer
set search_path = public, auth
as $$
declare
    v_user_id uuid := auth.uid();
    v_booking public.bookings;
begin
    if v_user_id is null then
        raise exception 'You are not logged in';
    end if;

    select *
    into v_booking
    from public.bookings
    where id = p_booking_id
      and user_id = v_user_id;

    if not found then
        raise exception 'Booking not found';
    end if;

    update public.bookings
    set
        payment_status = 'success',
        booking_status = 'confirmed'
    where id = p_booking_id
      and user_id = v_user_id
    returning * into v_booking;

    delete from public.wishlists
    where user_id = v_user_id
      and tour_id = v_booking.tour_id;

    return v_booking;
end;
$$;

create or replace function public.create_review(
    p_tour_id uuid,
    p_rating integer,
    p_comment text
)
returns public.reviews
language plpgsql
security definer
set search_path = public, auth
as $$
declare
    v_user_id uuid := auth.uid();
    v_tour_id uuid;
    v_comment text := trim(coalesce(p_comment, ''));
    v_review public.reviews;
begin
    if v_user_id is null then
        raise exception 'You are not logged in';
    end if;

    if p_rating < 1 or p_rating > 5 then
        raise exception 'Rating must be between 1 and 5';
    end if;

    if char_length(v_comment) < 2 or char_length(v_comment) > 1000 then
        raise exception 'Comment must be between 2 and 1000 characters';
    end if;

    select id
    into v_tour_id
    from public.tours
    where id = p_tour_id;

    if not found then
        raise exception 'Tour not found';
    end if;

    insert into public.reviews (
        user_id,
        tour_id,
        rating,
        comment
    )
    values (
        v_user_id,
        v_tour_id,
        p_rating,
        v_comment
    )
    returning * into v_review;

    perform public.recalculate_tour_review_stats(v_tour_id);

    return v_review;
end;
$$;

alter table public.profiles enable row level security;
alter table public.tours enable row level security;
alter table public.tour_images enable row level security;
alter table public.itineraries enable row level security;
alter table public.wishlists enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
    on public.profiles
    for select
    using (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
    on public.profiles
    for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

drop policy if exists tours_select_public on public.tours;
create policy tours_select_public
    on public.tours
    for select
    using (true);

drop policy if exists tour_images_select_public on public.tour_images;
create policy tour_images_select_public
    on public.tour_images
    for select
    using (true);

drop policy if exists itineraries_select_public on public.itineraries;
create policy itineraries_select_public
    on public.itineraries
    for select
    using (true);

drop policy if exists wishlists_select_own on public.wishlists;
create policy wishlists_select_own
    on public.wishlists
    for select
    using (auth.uid() = user_id);

drop policy if exists wishlists_insert_own on public.wishlists;
create policy wishlists_insert_own
    on public.wishlists
    for insert
    with check (auth.uid() = user_id);

drop policy if exists wishlists_delete_own on public.wishlists;
create policy wishlists_delete_own
    on public.wishlists
    for delete
    using (auth.uid() = user_id);

drop policy if exists bookings_select_own on public.bookings;
create policy bookings_select_own
    on public.bookings
    for select
    using (auth.uid() = user_id);

drop policy if exists reviews_select_public on public.reviews;
create policy reviews_select_public
    on public.reviews
    for select
    using (true);

grant usage on schema public to anon, authenticated;
grant select on public.tours to anon, authenticated;
grant select on public.tour_images to anon, authenticated;
grant select on public.itineraries to anon, authenticated;
grant select on public.reviews to anon, authenticated;
grant select on public.review_profiles to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, delete on public.wishlists to authenticated;
grant select on public.bookings to authenticated;
grant execute on function public.recalculate_tour_review_stats(uuid) to authenticated;
grant execute on function public.create_booking(uuid, timestamptz, integer) to authenticated;
grant execute on function public.pay_booking(uuid) to authenticated;
grant execute on function public.create_review(uuid, integer, text) to authenticated;