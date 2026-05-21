begin;

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
    '00000000-0000-0000-0000-000000000000'::uuid,
    '1324b305-cd01-4abb-acfc-ac85227a2629'::uuid,
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
    '1324b305-cd01-4abb-acfc-ac85227a2629'::uuid,
    jsonb_build_object('sub', '1324b305-cd01-4abb-acfc-ac85227a2629', 'email', 'demo@tourtravel.com', 'email_verified', true),
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
('f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid, 'Santorini Tour Package - A Romantic Greek Getaway', 'Santorini', 'Greece', 2499.00, 2299.00, 5, 4, 12, 0, 0, 'Discover the charm and beauty of Santorini, one of Greece''s most famous islands, known for white-washed houses, blue-domed churches, breathtaking sunsets, and crystal-clear waters.', 'A luxury romance-focused island escape designed for honeymooners, couples, and travelers who want premium relaxation with scenic experiences.', 'Luxury / Romantic', 'April - October', 'Luxury / Romantic / Culture / Adventure', ARRAY['Fira', 'Oia', 'Imerovigli', 'Akrotiri']::text[], ARRAY['Private sunset welcome dinner with Greek cuisine and wine tasting', 'Catamaran cruise around the Santorini caldera', 'Visit Oia Castle for the famous sunset view', 'Explore Akrotiri ruins and volcanic beaches']::text[], ARRAY['Luxury 5-star cliffside hotel stays with caldera views', 'Daily breakfast and selected meals', 'Private airport transfers', 'Sunset catamaran cruise with BBQ and drinks', 'Guided tour of Oia, Fira, and Akrotiri ruins', 'Wine tasting at a traditional Santorini winery', 'Volcano and hot springs tour']::text[], ARRAY['International and domestic flights', 'Travel insurance', 'Personal expenses', 'Optional adventure activities']::text[]),
('c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid, 'Kyoto Heritage and Tea House Escape', 'Kyoto', 'Japan', 1899.00, 1699.00, 6, 5, 10, 0, 0, 'A refined cultural journey through Kyoto''s temples, gardens, geisha districts, and traditional tea houses.', 'Ideal for travelers who want serenity, history, and a slow-paced luxury experience in Japan''s cultural capital.', 'Cultural / Luxury', 'March - May, October - November', 'Culture / Heritage / Food', ARRAY['Arashiyama', 'Gion', 'Fushimi Inari', 'Kiyomizu-dera']::text[], ARRAY['Guided temple and shrine circuit', 'Private tea ceremony experience', 'Traditional kaiseki dinner', 'Scenic bamboo grove walk']::text[], ARRAY['Boutique ryokan stays', 'Daily breakfast', 'English-speaking local guide', 'Tea ceremony and kaiseki dinner', 'Station transfers and welcome kit']::text[], ARRAY['Flights', 'Visa fees', 'Personal shopping']::text[]),
('cff808f0-49fa-48e1-b536-1614f2897484'::uuid, 'Iceland Northern Lights Explorer', 'Reykjavik', 'Iceland', 2799.00, 2599.00, 6, 5, 8, 0, 0, 'A dramatic adventure through glaciers, waterfalls, geothermal lagoons, and the northern lights.', 'Perfect for travelers chasing epic landscapes, outdoor adventure, and winter magic in Iceland.', 'Adventure / Nature', 'September - March', 'Adventure / Nature / Winter', ARRAY['Golden Circle', 'Vik', 'Blue Lagoon', 'South Coast']::text[], ARRAY['Northern lights hunt with expert guide', 'Golden Circle and waterfall tours', 'Blue Lagoon geothermal spa', 'Black sand beach and glacier lagoon']::text[], ARRAY['4-star stays', 'Breakfast', 'Transfers', 'Northern lights excursion', 'Spa entry']::text[], ARRAY['Flights', 'Winter gear rental', 'Meals not listed']::text[]),
('f03735b9-9beb-4998-bb32-88d1e1096dd8'::uuid, 'Maldives Private Island Retreat', 'Male Atoll', 'Maldives', 3299.00, 2999.00, 5, 4, 6, 0, 0, 'An exclusive tropical escape featuring overwater villas, private beaches, and ocean experiences.', 'A premium retreat for couples and small groups looking for luxury, privacy, and clear blue waters.', 'Luxury / Beach', 'November - April', 'Luxury / Honeymoon / Beach', ARRAY['Male Atoll', 'Private Resort Island', 'Sandbank', 'House Reef']::text[], ARRAY['Overwater villa stay', 'Private beach dining', 'Sunset dolphin cruise', 'Snorkeling and spa']::text[], ARRAY['All-villa accommodation', 'Breakfast and selected meals', 'Speedboat transfers', 'Sunset cruise']::text[], ARRAY['Flights', 'Premium alcohol', 'Spa upgrades']::text[]),
('ac6d083e-445c-4e6c-8a91-76fdc57c1e70'::uuid, 'Marrakech Desert Journey', 'Marrakech', 'Morocco', 899.00, 749.00, 4, 3, 15, 0, 0, 'A rich blend of souks, desert adventure, and traditional Moroccan hospitality.', 'Perfect for travelers looking for culture, cuisine, and a taste of the Sahara.', 'Cultural / Adventure', 'March - May, September - November', 'Cultural / Desert / Food', ARRAY['Marrakech Medina', 'Agafay Desert', 'Atlas foothills', 'Ait Benhaddou']::text[], ARRAY['Souk shopping', 'Desert camp dinner', 'Camel ride', 'Traditional hammam']::text[], ARRAY['Riad stay', 'Breakfast', 'Desert camp dinner', 'Camel ride']::text[], ARRAY['Flights', 'Tips', 'Personal expenses']::text[]),
('7f2b0622-b5f8-4cf0-815b-697dccd0d60c'::uuid, 'Swiss Alps Scenic Rail Escape', 'Zermatt', 'Switzerland', 3199.00, 2899.00, 6, 5, 10, 0, 0, 'An alpine journey with luxury stays, scenic rail, and mountain dining in the Swiss Alps.', 'Designed for travelers who want breathtaking mountain views paired with comfort and convenience.', 'Luxury / Nature', 'June - September, December - February', 'Luxury / Scenic / Rail', ARRAY['Zermatt', 'Matterhorn', 'Gornergrat', 'Interlaken']::text[], ARRAY['Scenic train ride', 'Matterhorn views', 'Mountain spa', 'Chocolate tasting']::text[], ARRAY['Boutique alpine hotels', 'Breakfast', 'Rail passes', 'Mountain excursion']::text[], ARRAY['Flights', 'Cable car upgrades', 'Personal expenses']::text[]),
('a2979043-a7d1-4818-a23b-c2fcbbf2309f'::uuid, 'Bali Wellness and Waterfall Experience', 'Ubud', 'Indonesia', 1399.00, 1249.00, 6, 5, 12, 0, 0, 'A wellness-focused Bali escape with rice terraces, waterfalls, and beachfront sunsets.', 'A restorative trip combining spa time, nature, and Balinese culture.', 'Wellness / Culture', 'April - October', 'Wellness / Culture / Nature', ARRAY['Ubud', 'Tegalalang', 'Nusa Dua', 'Kintamani']::text[], ARRAY['Rice terrace sunrise', 'Spa and yoga', 'Waterfall visits', 'Beach sunset dinner']::text[], ARRAY['Boutique villa', 'Breakfast', 'Airport transfers', 'Yoga and spa session']::text[], ARRAY['Flights', 'Visa fees', 'Optional surf lessons']::text[]),
('ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 'New Zealand South Island Adventure', 'Queenstown', 'New Zealand', 2899.00, 2699.00, 7, 6, 10, 0, 0, 'A high-energy South Island journey packed with lakes, glaciers, and adventure sports.', 'Ideal for travelers seeking a mix of epic scenery and active experiences.', 'Adventure / Nature', 'November - April', 'Adventure / Nature / Scenic', ARRAY['Queenstown', 'Milford Sound', 'Wanaka', 'Franz Josef']::text[], ARRAY['Milford Sound cruise', 'Lakeside stays', 'Jet boat ride', 'Alpine viewpoints']::text[], ARRAY['Lodge stays', 'Breakfast', 'Cruise tickets', 'Airport transfers']::text[], ARRAY['Flights', 'Adventure add-ons', 'Insurance']::text[]),
('e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 'Patagonia Glacier Trail Expedition', 'El Calafate', 'Argentina', 3099.00, 2899.00, 7, 6, 8, 0, 0, 'A remote adventure through glaciers, mountain trails, and dramatic Patagonian landscapes.', 'For travelers who want raw nature, hiking, and unforgettable glacier scenery.', 'Adventure / Nature', 'October - March', 'Adventure / Expedition / Nature', ARRAY['El Calafate', 'Perito Moreno', 'El Chaltén', 'Lago Argentino']::text[], ARRAY['Perito Moreno glacier walk', 'Patagonian hiking', 'Lakeside lodge', 'Wildlife spotting']::text[], ARRAY['Lodge stays', 'Breakfast', 'Park tickets', 'Guided glacier excursion']::text[], ARRAY['Flights', 'Hiking gear', 'Personal expenses']::text[]),
('5290c645-66d4-4408-8c5e-ec6a6d6973da'::uuid, 'Dubai Luxury Skyline Weekend', 'Dubai', 'United Arab Emirates', 1799.00, 1599.00, 4, 3, 12, 0, 0, 'A glamorous city break with skyline views, desert safari, and premium dining.', 'Ideal for travelers looking for luxury shopping, iconic landmarks, and nightlife.', 'Luxury / City', 'November - March', 'Luxury / City / Desert', ARRAY['Downtown Dubai', 'Palm Jumeirah', 'Desert Camp', 'Dubai Marina']::text[], ARRAY['Burj Khalifa visit', 'Desert safari', 'Private dhow cruise', 'Luxury brunch']::text[], ARRAY['5-star hotel', 'Breakfast', 'Desert safari', 'Airport transfers']::text[], ARRAY['Flights', 'Alcoholic beverages', 'Personal shopping']::text[]),
('16a5b891-f1f2-4b80-ad1b-26f872583bdc'::uuid, 'Paris Art and Culinary Discovery', 'Paris', 'France', 2199.00, 1999.00, 5, 4, 10, 0, 0, 'A stylish Paris escape combining art, iconic sights, and French dining.', 'A balanced city break for food lovers, first-time visitors, and romantic travelers.', 'City / Romance', 'April - June, September - October', 'City / Culinary / Romantic', ARRAY['Eiffel Tower', 'Louvre', 'Montmartre', 'Seine River']::text[], ARRAY['Eiffel Tower evening access', 'Louvre guided visit', 'Seine cruise', 'Wine and cheese tasting']::text[], ARRAY['Boutique hotel', 'Breakfast', 'Museum tickets', 'Seine cruise']::text[], ARRAY['Flights', 'City tax', 'Personal purchases']::text[]);

insert into public.tour_images (
    id,
    tour_id,
    url
) values
('eaa87309-a87b-4cc9-8882-fe6eda10cdf5'::uuid, 'f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80'),
('766b3c81-9c73-46bd-aedd-e385267fe724'::uuid, 'f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'),
('e208a612-1326-4ad7-bdf0-070cbcaf0965'::uuid, 'c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid, 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80'),
('821fc80e-de4a-4eac-af32-74ae72a5b08e'::uuid, 'c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid, 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1200&q=80'),
('6d2c3805-7dcd-4140-b342-a4331e1bea15'::uuid, 'cff808f0-49fa-48e1-b536-1614f2897484'::uuid, 'https://images.unsplash.com/photo-1539066838719-9b9a0d7f0f0e?auto=format&fit=crop&w=1200&q=80'),
('a2a2e0e9-6ea2-4fae-a7cf-d0ab0021ec82'::uuid, 'cff808f0-49fa-48e1-b536-1614f2897484'::uuid, 'https://images.unsplash.com/photo-1500043357865-c6b8827edf3a?auto=format&fit=crop&w=1200&q=80'),
('0b1a80e3-deba-45c7-bade-217a8843f4d7'::uuid, 'f03735b9-9beb-4998-bb32-88d1e1096dd8'::uuid, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80'),
('5738aa03-f0c8-483a-a8c6-455c93ccc7e0'::uuid, 'f03735b9-9beb-4998-bb32-88d1e1096dd8'::uuid, 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=1200&q=80'),
('25e7e378-3549-4069-9614-9440753c5ac4'::uuid, 'ac6d083e-445c-4e6c-8a91-76fdc57c1e70'::uuid, 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80'),
('385ea957-8d29-4855-8524-b7036517d7c8'::uuid, 'ac6d083e-445c-4e6c-8a91-76fdc57c1e70'::uuid, 'https://images.unsplash.com/photo-1502920917128-1aa500764b77?auto=format&fit=crop&w=1200&q=80'),
('a6db2a77-0cf5-4d6c-8a58-408540f8df07'::uuid, '7f2b0622-b5f8-4cf0-815b-697dccd0d60c'::uuid, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'),
('631120ab-9088-4fd2-bec0-8d4870faa111'::uuid, '7f2b0622-b5f8-4cf0-815b-697dccd0d60c'::uuid, 'https://images.unsplash.com/photo-1517797164172-7bb4a7de7d9d?auto=format&fit=crop&w=1200&q=80'),
('f87432c1-c32a-4caf-af15-81b444c4c133'::uuid, 'a2979043-a7d1-4818-a23b-c2fcbbf2309f'::uuid, 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1200&q=80'),
('aa8eadb4-68ca-465c-a4f8-da82d92b67aa'::uuid, 'a2979043-a7d1-4818-a23b-c2fcbbf2309f'::uuid, 'https://images.unsplash.com/photo-1501238295340-c810d3c9c3d0?auto=format&fit=crop&w=1200&q=80'),
('c693b484-11f1-4b77-a033-7f54f0f23f2c'::uuid, 'ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80'),
('3b4147d0-9989-4e00-a64d-2940538cfe36'::uuid, 'ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 'https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1200&q=80'),
('505613d2-37ae-4bd8-933f-bd7ef0b662f6'::uuid, 'e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80'),
('9ce88ef8-35e1-410b-9f51-16335ddc21b1'::uuid, 'e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80'),
('1001a686-2587-4811-9430-2936d4232aed'::uuid, '5290c645-66d4-4408-8c5e-ec6a6d6973da'::uuid, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'),
('574406f9-82ed-4b64-a23e-a21e52903354'::uuid, '5290c645-66d4-4408-8c5e-ec6a6d6973da'::uuid, 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80'),
('0e02f727-b570-4bc2-b547-8327271aa1ab'::uuid, '16a5b891-f1f2-4b80-ad1b-26f872583bdc'::uuid, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'),
('d2a4caa9-5087-47d0-ad5e-beb3c454cd04'::uuid, '16a5b891-f1f2-4b80-ad1b-26f872583bdc'::uuid, 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80');

insert into public.itineraries (
    id,
    tour_id,
    day_number,
    title,
    description,
    overnight_stay,
    meals_included
) values
('74fbbe94-2aa9-48e2-a35d-6cdc9814ba53'::uuid, 'f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid, 1, 'Arrival in Santorini - Welcome to Paradise', 'Arrive at Santorini International Airport, transfer to a luxury cliffside hotel, relax, and enjoy a sunset welcome dinner.', '5-star cliffside hotel in Fira', 'Dinner'),
('14a3827e-0b48-4cca-ae1c-47af374de814'::uuid, 'f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid, 2, 'Explore Oia and Sunset at the Famous Castle', 'Walk through Oia''s whitewashed streets, visit Ammoudi Bay, see the Blue-Domed Churches, and watch sunset from Oia Castle.', '5-star cliffside hotel in Oia', 'Breakfast'),
('8ea02a1c-ee68-4b45-9745-7e7f8e199194'::uuid, 'f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid, 3, 'Santorini Volcano and Hot Springs Cruise', 'Sail around the caldera, hike Nea Kameni volcano, swim in Palea Kameni hot springs, and enjoy a BBQ lunch onboard.', '5-star cliffside hotel in Imerovigli', 'Breakfast & Lunch'),
('e8dd43ca-3920-4509-b8f2-0e622e60a38d'::uuid, 'f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid, 4, 'Akrotiri Ruins and Beach Day', 'Visit the ancient ruins of Akrotiri, relax at Red Beach and Perissa Beach, and enjoy a Greek wine-tasting experience.', '5-star cliffside hotel in Imerovigli', 'Breakfast'),
('affaf145-3561-48dc-b8ca-5ce3524af20f'::uuid, 'f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid, 5, 'Departure from Santorini', 'Enjoy a relaxed morning with caldera views before private transfer to Santorini Airport or ferry port.', NULL, 'Breakfast'),
('95b69135-9da3-499e-922a-7119290b4e75'::uuid, 'c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid, 1, 'Arrival and Kyoto Night Walk', 'Settle into your ryokan and enjoy a calm evening walk through historic streets.', 'Boutique ryokan in central Kyoto', 'Dinner'),
('19e72bee-6641-47e9-afbc-3a8feb03db6b'::uuid, 'c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid, 2, 'Arashiyama and Bamboo Grove', 'Explore the bamboo forest, river district, and scenic viewpoints with a private guide.', 'Boutique ryokan in Kyoto', 'Breakfast'),
('28742091-9834-4852-b254-d59d87b33d75'::uuid, 'c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid, 3, 'Gion and Tea Ceremony', 'Visit Gion, learn about geisha culture, and join a traditional tea ceremony.', 'Boutique ryokan in Kyoto', 'Breakfast & Tea Snacks'),
('b0eb4cb8-3d1d-473a-8b65-0bc3f11be76e'::uuid, 'c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid, 4, 'Temples and Garden Tour', 'Spend the day exploring Kyoto''s most iconic temples and landscaped gardens.', 'Boutique ryokan in Kyoto', 'Breakfast'),
('62dfe4a4-78ba-434f-a4ce-3bdd3e402a02'::uuid, 'c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid, 5, 'Fushimi Inari and Local Markets', 'Walk the torii gates and browse local markets for souvenirs and street snacks.', 'Boutique ryokan in Kyoto', 'Breakfast'),
('f461ffbd-525d-4de7-9787-7d2d747834da'::uuid, 'c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid, 6, 'Departure', 'Leisurely morning before airport transfer.', NULL, 'Breakfast'),
('1f5117ae-436a-4fe3-85a3-d7905d1a0f8f'::uuid, 'cff808f0-49fa-48e1-b536-1614f2897484'::uuid, 1, 'Arrival in Reykjavik', 'Check in and enjoy a warm city welcome dinner.', '4-star city hotel in Reykjavik', 'Dinner'),
('bdf65e56-6df8-48eb-82da-df38e6e503f2'::uuid, 'cff808f0-49fa-48e1-b536-1614f2897484'::uuid, 2, 'Golden Circle', 'Visit geysers, waterfalls, and tectonic landmarks.', '4-star city hotel in Reykjavik', 'Breakfast'),
('c2dc30f4-7564-44e5-beaf-f2da6c4fb3bf'::uuid, 'cff808f0-49fa-48e1-b536-1614f2897484'::uuid, 3, 'South Coast and Black Sand Beach', 'Drive along the south coast with glacier and beach stops.', '4-star hotel near Vik', 'Breakfast'),
('3d3123c1-411b-4d1e-a548-8240d665c8b8'::uuid, 'cff808f0-49fa-48e1-b536-1614f2897484'::uuid, 4, 'Blue Lagoon and Northern Lights', 'Relax at the lagoon and join a guided aurora hunt at night.', '4-star city hotel in Reykjavik', 'Breakfast'),
('32d45e36-e281-439d-ac9d-85ce5b73945b'::uuid, 'cff808f0-49fa-48e1-b536-1614f2897484'::uuid, 5, 'Free Day', 'Optional shopping or museum visits.', '4-star city hotel in Reykjavik', 'Breakfast'),
('09c7a56d-bb92-46ca-b632-facfe6012616'::uuid, 'cff808f0-49fa-48e1-b536-1614f2897484'::uuid, 6, 'Departure', 'Airport transfer and departure.', NULL, 'Breakfast'),
('7cc0eec1-2e5b-43ff-bb27-bf83336f9ee8'::uuid, 'f03735b9-9beb-4998-bb32-88d1e1096dd8'::uuid, 1, 'Arrival and Resort Check-in', 'Speedboat transfer to the resort and sunset dinner.', 'Overwater villa', 'Dinner'),
('ee72a09a-67f2-4146-9e34-05238397dcc7'::uuid, 'f03735b9-9beb-4998-bb32-88d1e1096dd8'::uuid, 2, 'Lagoon and Reef Day', 'Snorkel the house reef and relax by the lagoon.', 'Overwater villa', 'Breakfast'),
('b4370327-9222-4dff-8f2f-19753a588757'::uuid, 'f03735b9-9beb-4998-bb32-88d1e1096dd8'::uuid, 3, 'Sandbank Picnic', 'Private lunch on a sandbank followed by free time.', 'Overwater villa', 'Breakfast & Lunch'),
('f732d5bd-f9ae-4b4d-801b-e0ba3a74c4f1'::uuid, 'f03735b9-9beb-4998-bb32-88d1e1096dd8'::uuid, 4, 'Spa and Sunset Cruise', 'Spa session and dolphin watching at sunset.', 'Overwater villa', 'Breakfast'),
('ef22c3b3-c1b3-4038-9eaf-1ca45cbcc6e6'::uuid, 'f03735b9-9beb-4998-bb32-88d1e1096dd8'::uuid, 5, 'Departure', 'Leisurely breakfast and check-out.', NULL, 'Breakfast'),
('c6fdcc4d-033f-4a0f-a16a-38aecb31ceef'::uuid, 'ac6d083e-445c-4e6c-8a91-76fdc57c1e70'::uuid, 1, 'Medina Orientation', 'Guided walk through the medina and souks.', 'Traditional riad in Marrakech', 'Dinner'),
('18f58c84-4c8c-42d1-9a1d-5b829da9ed8d'::uuid, 'ac6d083e-445c-4e6c-8a91-76fdc57c1e70'::uuid, 2, 'Desert Transfer', 'Travel to the desert and settle into camp.', 'Luxury desert camp', 'Breakfast & Dinner'),
('debd7f56-9330-423f-81ef-91fce41d225a'::uuid, 'ac6d083e-445c-4e6c-8a91-76fdc57c1e70'::uuid, 3, 'Agafay Experience', 'Camel ride, sunset, and local music.', 'Luxury desert camp', 'Breakfast & Dinner'),
('655299e3-f80a-4141-8250-dabb3ed46d5d'::uuid, 'ac6d083e-445c-4e6c-8a91-76fdc57c1e70'::uuid, 4, 'Departure', 'Return to Marrakech and transfer out.', NULL, 'Breakfast'),
('f87e3902-ced5-4791-ae6d-77c1993f738a'::uuid, '7f2b0622-b5f8-4cf0-815b-697dccd0d60c'::uuid, 1, 'Arrival in Zurich', 'Train transfer to the mountains and hotel check-in.', 'Alpine hotel in Zermatt', 'Dinner'),
('780b4a79-752b-4d4e-bfef-71a5f55d77ad'::uuid, '7f2b0622-b5f8-4cf0-815b-697dccd0d60c'::uuid, 2, 'Gornergrat Railway', 'Ride the scenic mountain railway and enjoy glacier views.', 'Alpine hotel in Zermatt', 'Breakfast'),
('445f6c5e-0f49-42f9-9d89-9d322417cba5'::uuid, '7f2b0622-b5f8-4cf0-815b-697dccd0d60c'::uuid, 3, 'Matterhorn Village Day', 'Relax in Zermatt and explore local cafes.', 'Alpine hotel in Zermatt', 'Breakfast'),
('5ec6023b-5e60-4a07-b43d-03f25b779861'::uuid, '7f2b0622-b5f8-4cf0-815b-697dccd0d60c'::uuid, 4, 'Interlaken Excursion', 'Scenic transfer and lakeside walk.', 'Boutique lake hotel', 'Breakfast'),
('7dbb6202-9018-4c72-95af-d8b95bcd20cd'::uuid, '7f2b0622-b5f8-4cf0-815b-697dccd0d60c'::uuid, 5, 'Free Day', 'Optional spa and shopping.', 'Boutique lake hotel', 'Breakfast'),
('35af641c-ecca-44ac-8289-747f4830f10d'::uuid, '7f2b0622-b5f8-4cf0-815b-697dccd0d60c'::uuid, 6, 'Departure', 'Return transfer and departure.', NULL, 'Breakfast'),
('054b552b-9fa0-467a-b273-27f982827a6e'::uuid, 'a2979043-a7d1-4818-a23b-c2fcbbf2309f'::uuid, 1, 'Arrival and Ubud Check-in', 'Settle into your villa and enjoy a welcome dinner.', 'Private villa in Ubud', 'Dinner'),
('0c26a04e-e6f3-4681-9038-c5e4c51deb4c'::uuid, 'a2979043-a7d1-4818-a23b-c2fcbbf2309f'::uuid, 2, 'Rice Terraces and Temples', 'Explore terraces and sacred sites.', 'Private villa in Ubud', 'Breakfast'),
('39bb11ed-2cef-4ca7-8239-d91e19658d2d'::uuid, 'a2979043-a7d1-4818-a23b-c2fcbbf2309f'::uuid, 3, 'Waterfall Day', 'Visit Bali''s iconic waterfalls and local markets.', 'Private villa in Ubud', 'Breakfast'),
('0bb9a6c0-9785-4a3a-bb50-aca2479bdc60'::uuid, 'a2979043-a7d1-4818-a23b-c2fcbbf2309f'::uuid, 4, 'Spa and Yoga', 'Relax with a wellness day and Balinese massage.', 'Private villa in Ubud', 'Breakfast'),
('ff398630-b245-42f1-9e8c-aa36738b4653'::uuid, 'a2979043-a7d1-4818-a23b-c2fcbbf2309f'::uuid, 5, 'Beach Sunset', 'Head to the coast for a beach sunset dinner.', 'Beach resort', 'Breakfast & Dinner'),
('1351fdef-6f7d-4313-b67a-6a79a4546f84'::uuid, 'a2979043-a7d1-4818-a23b-c2fcbbf2309f'::uuid, 6, 'Departure', 'Check-out and airport transfer.', NULL, 'Breakfast'),
('297eb77c-9a88-472c-a569-e9bd7f3005b8'::uuid, 'ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 1, 'Arrival in Queenstown', 'Lakefront arrival and welcome dinner.', 'Lakeview lodge', 'Dinner'),
('3288c242-9eba-43ed-8bc5-03d28cc03555'::uuid, 'ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 2, 'Queenstown Adventure', 'Jet boat ride and scenic lookout points.', 'Lakeview lodge', 'Breakfast'),
('6c2f4109-9229-43bb-9463-a6090e73949a'::uuid, 'ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 3, 'Wanaka and Road Trip', 'Drive through scenic mountain roads and stop at Wanaka.', 'Boutique hotel in Wanaka', 'Breakfast'),
('5d3dee77-e632-4fef-8ae0-3881b5390e61'::uuid, 'ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 4, 'Franz Josef Glacier', 'Visit the glacier region and unwind.', 'Boutique hotel near Franz Josef', 'Breakfast'),
('51b6d6ed-2415-4635-a655-f8078256ee18'::uuid, 'ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 5, 'Milford Sound Cruise', 'Full-day cruise through the fjord.', 'Lakeview lodge', 'Breakfast & Lunch'),
('b42e2240-2334-48fb-90c0-5444fa7de2f8'::uuid, 'ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 6, 'Free Day', 'Optional hiking or spa day.', 'Lakeview lodge', 'Breakfast'),
('619720d9-5e3b-4485-8a32-028024b25162'::uuid, 'ed239882-f6ca-439c-a13c-37841f44a8c7'::uuid, 7, 'Departure', 'Airport transfer.', NULL, 'Breakfast'),
('24f83777-bd96-420a-9ff5-fefdf8f2a496'::uuid, 'e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 1, 'Arrival in El Calafate', 'Check in and enjoy a welcome dinner.', 'Lakeside lodge', 'Dinner'),
('fccd01e0-45d5-407c-bc04-d7957de198de'::uuid, 'e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 2, 'Perito Moreno Glacier', 'Visit the glacier and walk the viewing trails.', 'Lakeside lodge', 'Breakfast'),
('bfde881b-b2b5-4f91-a94d-74c44ea17cfb'::uuid, 'e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 3, 'El Chaltén Transfer', 'Drive to the hiking capital of Argentina.', 'Mountain lodge', 'Breakfast'),
('ab6270d0-be70-45d6-93ff-25c760dbea9b'::uuid, 'e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 4, 'Full-Day Trek', 'Guided trek with breathtaking mountain views.', 'Mountain lodge', 'Breakfast & Lunch'),
('2659e08a-3b5d-4045-89a7-318df0bb69ae'::uuid, 'e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 5, 'Lake Exploration', 'Boat excursion and wildlife stops.', 'Lakeside lodge', 'Breakfast'),
('a9d5c005-e1f5-4433-8bc6-6d51ef53ddae'::uuid, 'e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 6, 'Free Day', 'Rest, spa, or optional short hike.', 'Lakeside lodge', 'Breakfast'),
('95df594f-123b-45d9-83e2-d1e0bf48e237'::uuid, 'e6214a1a-d1fd-46cf-8289-6b125d35353d'::uuid, 7, 'Departure', 'Transfer to the airport.', NULL, 'Breakfast'),
('da3d6ec4-0069-4f08-98ff-f11c7a055314'::uuid, '5290c645-66d4-4408-8c5e-ec6a6d6973da'::uuid, 1, 'Arrival and Skyline Dinner', 'Check in and enjoy a rooftop welcome dinner.', '5-star hotel in Downtown Dubai', 'Dinner'),
('7fc3e7e4-c8b4-431f-9fd4-9921792d3f15'::uuid, '5290c645-66d4-4408-8c5e-ec6a6d6973da'::uuid, 2, 'City Icons', 'Visit Burj Khalifa and the Dubai Mall.', '5-star hotel in Downtown Dubai', 'Breakfast'),
('d4c6b868-fecd-426d-9260-4065674cbf88'::uuid, '5290c645-66d4-4408-8c5e-ec6a6d6973da'::uuid, 3, 'Desert Safari', 'Evening safari with camp entertainment.', '5-star hotel in Downtown Dubai', 'Breakfast & Dinner'),
('f16415c1-ffd8-4008-b9af-7a0e43407adb'::uuid, '5290c645-66d4-4408-8c5e-ec6a6d6973da'::uuid, 4, 'Departure', 'Morning at leisure and airport transfer.', NULL, 'Breakfast'),
('8a8e9f86-4e5c-4e2b-9640-508b1dead3f6'::uuid, '16a5b891-f1f2-4b80-ad1b-26f872583bdc'::uuid, 1, 'Arrival and Seine Evening', 'Check in and take a relaxed river cruise.', 'Boutique hotel in Paris', 'Dinner'),
('7e0e9147-4583-4d2d-91ac-c8a8fcfa588b'::uuid, '16a5b891-f1f2-4b80-ad1b-26f872583bdc'::uuid, 2, 'Louvre and Left Bank', 'Private museum visit and cafe hopping.', 'Boutique hotel in Paris', 'Breakfast'),
('ef8bc0b2-58ee-4552-b13c-7b188ae43437'::uuid, '16a5b891-f1f2-4b80-ad1b-26f872583bdc'::uuid, 3, 'Montmartre and Wine Tasting', 'Explore artistic streets and taste French wines.', 'Boutique hotel in Paris', 'Breakfast'),
('94e54531-ee5e-4542-8007-5562a3da35d4'::uuid, '16a5b891-f1f2-4b80-ad1b-26f872583bdc'::uuid, 4, 'Eiffel Tower and Shopping', 'Iconic tower time followed by free shopping.', 'Boutique hotel in Paris', 'Breakfast'),
('3b57f7af-47f8-403d-a239-2411f2d3c301'::uuid, '16a5b891-f1f2-4b80-ad1b-26f872583bdc'::uuid, 5, 'Departure', 'Leisurely breakfast and checkout.', NULL, 'Breakfast');

insert into public.wishlists (
    id,
    user_id,
    tour_id
) values (
    'b57dbef6-6553-43a2-b4da-1200ec8ea034'::uuid,
    '1324b305-cd01-4abb-acfc-ac85227a2629'::uuid,
    'c13734a1-bb10-45c4-8627-d9e5c979b38b'::uuid
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
    'bc7194fe-f915-4b7e-8fd6-2a4ba0027a35'::uuid,
    '1324b305-cd01-4abb-acfc-ac85227a2629'::uuid,
    'f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid,
    '2026-06-20T14:03:08.078Z'::timestamptz,
    2,
    4598.00,
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
    'f180f196-820c-4ffc-97f9-1ef9b2ec2e12'::uuid,
    '1324b305-cd01-4abb-acfc-ac85227a2629'::uuid,
    'f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid,
    5,
    'Excellent curated travel experience.'
);

select public.recalculate_tour_review_stats('f9ed2923-cbb0-4aae-bc54-35a0a01e9d0c'::uuid);

commit;
