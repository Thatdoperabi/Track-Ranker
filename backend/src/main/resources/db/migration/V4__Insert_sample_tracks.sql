INSERT INTO tracks (
    name, city, state, zip_code, track_length, track_width, number_of_turns, 
    surface_type, track_direction, year_built, website_url, phone_number, 
    email_address, max_elevation_change, banking_angles, run_off_areas, 
    pit_lane_length, number_of_pit_stalls, track_record_car, track_record_motorcycle,
    track_layout_image_url, track_day_organizations, typical_pricing, 
    available_dates, track_day_schedule, required_safety_equipment, 
    noise_restrictions, fuel_availability, amenities, ai_difficulty_rating,
    ai_difficulty_explanation, ai_assessment_date, average_user_rating, number_of_reviews
) VALUES 
(
    'Laguna Seca Raceway', 'Monterey', 'California', '93940', 2.238, 40, 11,
    'Asphalt', 'Clockwise', 1957, 'https://www.weathertechraceway.com', '(831) 242-8201',
    'info@weathertechraceway.com', 180, 'None', 'Gravel and paved runoff areas',
    1000, 40, '1:05.786', '1:20.066', 'https://www.weathertechraceway.com/sites/default/files/2019-01/Laguna%20Seca%20Track%20Map.jpg',
    'TrackCrafters, Pacific Track Time', '$250-350 per day', 'Year-round',
    'Weekends and select weekdays', 'Full leathers, helmet, gloves, boots',
    '92 dB limit', 'On-site fuel available', 'Restaurant, pro shop, showers, camping',
    8, 'Laguna Seca is known for its challenging Corkscrew turn, a blind crest followed by a sharp left-right combination that drops 59 feet in elevation. The track features significant elevation changes, technical corners, and requires precise braking and throttle control.',
    '2024-01-15 10:00:00', 8.2, 45
),
(
    'Road Atlanta', 'Braselton', 'Georgia', '30517', 2.54, 40, 12,
    'Asphalt', 'Clockwise', 1970, 'https://www.roadatlanta.com', '(770) 967-6143',
    'info@roadatlanta.com', 160, 'None', 'Gravel and paved runoff areas',
    1200, 50, '1:06.249', '1:22.456', 'https://www.roadatlanta.com/wp-content/uploads/2019/01/Road-Atlanta-Track-Map.jpg',
    'Sportbike Track Time, N2 Track Days', '$200-300 per day', 'March to November',
    'Weekends', 'Full leathers, helmet, gloves, boots', '96 dB limit',
    'On-site fuel available', 'Restaurant, pro shop, showers, camping',
    7, 'Road Atlanta features the challenging Turn 12, a high-speed downhill right-hander that leads into the main straight. The track has significant elevation changes and several technical sections that require precise line selection and braking points.',
    '2024-01-15 10:00:00', 7.8, 32
),
(
    'Barber Motorsports Park', 'Birmingham', 'Alabama', '35094', 2.38, 45, 16,
    'Asphalt', 'Clockwise', 2003, 'https://www.barbermotorsports.com', '(205) 655-4744',
    'info@barbermotorsports.com', 80, 'None', 'Extensive paved runoff areas',
    800, 35, '1:07.123', '1:24.789', 'https://www.barbermotorsports.com/wp-content/uploads/2019/01/Barber-Track-Map.jpg',
    'Sportbike Track Time, N2 Track Days', '$250-350 per day', 'March to November',
    'Weekends', 'Full leathers, helmet, gloves, boots', '96 dB limit',
    'On-site fuel available', 'Museum, restaurant, pro shop, showers',
    6, 'Barber Motorsports Park is known for its smooth surface and flowing layout. While it has many turns, they are generally well-cambered and forgiving. The track rewards smooth riding and good line selection rather than aggressive riding.',
    '2024-01-15 10:00:00', 6.5, 28
),
(
    'Thunderhill Raceway Park', 'Willows', 'California', '95988', 3.0, 40, 15,
    'Asphalt', 'Clockwise', 1993, 'https://www.thunderhill.com', '(530) 934-5588',
    'info@thunderhill.com', 120, 'None', 'Gravel and paved runoff areas',
    1000, 45, '1:48.234', '2:05.123', 'https://www.thunderhill.com/wp-content/uploads/2019/01/Thunderhill-Track-Map.jpg',
    'TrackCrafters, Pacific Track Time, Z2 Track Days', '$150-250 per day', 'Year-round',
    'Weekends and weekdays', 'Full leathers, helmet, gloves, boots', '96 dB limit',
    'On-site fuel available', 'Restaurant, pro shop, showers, camping',
    5, 'Thunderhill is a great track for beginners with its wide layout and forgiving runoff areas. The track has good flow and is relatively easy to learn. The 3-mile configuration provides plenty of variety while remaining accessible to riders of all skill levels.',
    '2024-01-15 10:00:00', 5.2, 41
),
(
    'Virginia International Raceway', 'Alton', 'Virginia', '24520', 3.27, 40, 17,
    'Asphalt', 'Clockwise', 1957, 'https://www.virnow.com', '(434) 822-7700',
    'info@virnow.com', 130, 'None', 'Gravel and paved runoff areas',
    1200, 50, '1:42.123', '1:58.456', 'https://www.virnow.com/wp-content/uploads/2019/01/VIR-Track-Map.jpg',
    'Sportbike Track Time, N2 Track Days', '$250-350 per day', 'March to November',
    'Weekends', 'Full leathers, helmet, gloves, boots', '96 dB limit',
    'On-site fuel available', 'Restaurant, pro shop, showers, camping, hotel',
    7, 'VIR is known for its technical nature and elevation changes. The track has several challenging sections including the Oak Tree turn and the Roller Coaster section. The track rewards precision and smooth riding while punishing mistakes.',
    '2024-01-15 10:00:00', 7.1, 35
); 