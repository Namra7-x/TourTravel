drop view if exists public.review_profiles;

create table if not exists public.review_profiles (
    id uuid primary key references public.profiles (id) on delete cascade,
    name text not null,
    created_at timestamptz not null default now()
);

insert into public.review_profiles (id, name, created_at)
select id, name, created_at
from public.profiles
on conflict (id) do update set
    name = excluded.name,
    created_at = excluded.created_at;

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

    insert into public.review_profiles (id, name, created_at)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'name', ''),
        coalesce(new.created_at, now())
    )
    on conflict (id) do update set
        name = excluded.name,
        created_at = excluded.created_at;

    return new;
end;
$$;

alter table public.review_profiles enable row level security;

drop policy if exists review_profiles_select_public on public.review_profiles;
create policy review_profiles_select_public
    on public.review_profiles
    for select
    using (true);

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
    on public.profiles
    for select
    using ((select auth.uid()) = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
    on public.profiles
    for update
    using ((select auth.uid()) = id)
    with check ((select auth.uid()) = id);

drop policy if exists wishlists_select_own on public.wishlists;
create policy wishlists_select_own
    on public.wishlists
    for select
    using ((select auth.uid()) = user_id);

drop policy if exists wishlists_insert_own on public.wishlists;
create policy wishlists_insert_own
    on public.wishlists
    for insert
    with check ((select auth.uid()) = user_id);

drop policy if exists wishlists_delete_own on public.wishlists;
create policy wishlists_delete_own
    on public.wishlists
    for delete
    using ((select auth.uid()) = user_id);

drop policy if exists bookings_select_own on public.bookings;
create policy bookings_select_own
    on public.bookings
    for select
    using ((select auth.uid()) = user_id);

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.recalculate_tour_review_stats(uuid) from public, anon, authenticated;
revoke execute on function public.create_booking(uuid, timestamptz, integer) from public, anon;
revoke execute on function public.pay_booking(uuid) from public, anon;
revoke execute on function public.create_review(uuid, integer, text) from public, anon;

grant execute on function public.create_booking(uuid, timestamptz, integer) to authenticated;
grant execute on function public.pay_booking(uuid) to authenticated;
grant execute on function public.create_review(uuid, integer, text) to authenticated;