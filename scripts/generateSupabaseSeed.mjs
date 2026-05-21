import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const workspaceRoot = path.resolve(process.cwd());
const sourcePath = path.join(workspaceRoot, 'Tour-travel', 'prisma', 'seed.js');
const outputPath = path.join(workspaceRoot, 'supabase', 'seed.sql');

const escapeSql = (value) => String(value).replace(/'/g, "''");

const sqlText = (value) => `'${escapeSql(value)}'`;

const sqlArray = (items = []) => `ARRAY[${items.map((item) => sqlText(item)).join(', ')}]::text[]`;

const numeric = (value) => Number.parseFloat(value).toFixed(2);

const readTourData = () => {
    const source = fs.readFileSync(sourcePath, 'utf8');
    const startToken = 'const tourData = [';
    const mainIndex = source.indexOf('async function main()', source.indexOf(startToken));
    const startIndex = source.indexOf(startToken);
    const endIndex = source.lastIndexOf('];', mainIndex);

    if (startIndex === -1 || endIndex === -1) {
        throw new Error('Could not find tourData in prisma/seed.js');
    }

    const arraySource = source.slice(startIndex + 'const tourData = '.length, endIndex + 1);

    return Function('decimal', `return ${arraySource};`)((value) => value);
};

const createIdMap = (count) => Array.from({ length: count }, () => crypto.randomUUID());

const tourData = readTourData();
const tourIds = createIdMap(tourData.length);
const demoUserId = crypto.randomUUID();

const tourRows = tourData.map((tour, index) => {
    const tourId = tourIds[index];

    return [
        `(${sqlText(tourId)}::uuid, ${sqlText(tour.title)}, ${sqlText(tour.location)}, ${sqlText(tour.country)}, ${numeric(tour.price)}, ${tour.discountPrice ? numeric(tour.discountPrice) : 'NULL'}, ${tour.duration}, ${tour.nights}, ${tour.maxGroupSize}, 0, 0, ${sqlText(tour.overview)}, ${sqlText(tour.description)}, ${sqlText(tour.category)}, ${sqlText(tour.bestTimeToVisit)}, ${sqlText(tour.tourType)}, ${sqlArray(tour.destinations)}, ${sqlArray(tour.highlights)}, ${sqlArray(tour.inclusions)}, ${sqlArray(tour.exclusions)})`,
    ];
}).flat();

const imageRows = tourData.flatMap((tour, index) => {
    const tourId = tourIds[index];

    return tour.images.map((url) => `(${sqlText(crypto.randomUUID())}::uuid, ${sqlText(tourId)}::uuid, ${sqlText(url)})`);
});

const itineraryRows = tourData.flatMap((tour, index) => {
    const tourId = tourIds[index];

    return tour.itinerary.map((day) => `(${sqlText(crypto.randomUUID())}::uuid, ${sqlText(tourId)}::uuid, ${day.dayNumber}, ${sqlText(day.title)}, ${sqlText(day.description)}, ${day.overnightStay ? sqlText(day.overnightStay) : 'NULL'}, ${day.mealsIncluded ? sqlText(day.mealsIncluded) : 'NULL'})`);
});

const firstTourId = tourIds[0];
const secondTourId = tourIds[1];
const bookingDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
const firstTour = tourData[0];
const firstTourTotal = numeric((Number.parseFloat(firstTour.discountPrice) || Number.parseFloat(firstTour.price)) * 2);
const authInstanceId = '00000000-0000-0000-0000-000000000000';

const sql = `begin;

delete from auth.identities where user_id in (select id from auth.users where email = 'demo@tourtravel.com');
delete from auth.users where email = 'demo@tourtravel.com';

insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    confirmation_token,
    recovery_token,
    email_change_token_current,
    email_change_token_new,
    email_change,
    phone_change_token,
    phone_change,
    reauthentication_token,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    is_super_admin,
    is_anonymous
) values (
    ${sqlText(authInstanceId)}::uuid,
    ${sqlText(demoUserId)}::uuid,
    'authenticated',
    'authenticated',
    'demo@tourtravel.com',
    crypt('Password123!', gen_salt('bf', 12)),
    now(),
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
    jsonb_build_object('name', 'Demo User'),
    now(),
    now(),
    false,
    false
);

insert into auth.identities (
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
) values (
    'demo@tourtravel.com',
    ${sqlText(demoUserId)}::uuid,
    jsonb_build_object('sub', ${sqlText(demoUserId)}, 'email', 'demo@tourtravel.com', 'email_verified', true),
    'email',
    now(),
    now(),
    now()
);

insert into public.tours (
    id,
    title,
    location,
    country,
    price,
    '',
    discount_price,
    duration,
    nights,
    max_group_size,
    rating,
    total_reviews,
    overview,
    description,
    category,
    best_time_to_visit,
    tour_type,
    destinations,
    highlights,
    inclusions,
    exclusions
) values
${tourRows.join(',\n')};

insert into public.tour_images (
    id,
    tour_id,
    url
) values
${imageRows.join(',\n')};

insert into public.itineraries (
    id,
    tour_id,
    day_number,
    title,
    description,
    overnight_stay,
    meals_included
) values
${itineraryRows.join(',\n')};

insert into public.wishlists (
    id,
    user_id,
    tour_id
) values (
    ${sqlText(crypto.randomUUID())}::uuid,
    ${sqlText(demoUserId)}::uuid,
    ${sqlText(secondTourId)}::uuid
);

insert into public.bookings (
    id,
    user_id,
    tour_id,
    date,
    people_count,
    total_price,
    payment_status,
    booking_status
) values (
    ${sqlText(crypto.randomUUID())}::uuid,
    ${sqlText(demoUserId)}::uuid,
    ${sqlText(firstTourId)}::uuid,
    ${sqlText(bookingDate)}::timestamptz,
    2,
    ${firstTourTotal},
    'pending',
    'pending'
);

insert into public.reviews (
    id,
    user_id,
    tour_id,
    rating,
    comment
) values (
    ${sqlText(crypto.randomUUID())}::uuid,
    ${sqlText(demoUserId)}::uuid,
    ${sqlText(firstTourId)}::uuid,
    5,
    'Excellent curated travel experience.'
);

select public.recalculate_tour_review_stats(${sqlText(firstTourId)}::uuid);

commit;
`;

fs.writeFileSync(outputPath, sql, 'utf8');
console.log(`Wrote ${outputPath}`);