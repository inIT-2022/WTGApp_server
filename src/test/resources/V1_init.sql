-- drop table if exists categories_for_events CASCADE;
-- drop table if exists categories_for_locations CASCADE;
-- drop table if exists categories_for_users CASCADE;
-- drop table if exists events CASCADE;
-- drop table if exists events_categories CASCADE;
-- drop table if exists locations CASCADE;
-- drop table if exists locations_categories CASCADE;
-- drop table if exists offer_categories CASCADE;
-- drop table if exists offers CASCADE;
-- drop table if exists routes CASCADE;
-- drop table if exists routes_categories CASCADE;
-- drop table if exists routes_locations CASCADE;
-- drop table if exists user_events CASCADE;
-- drop table if exists user_events_info CASCADE;
-- drop table if exists user_roles CASCADE;
-- drop table if exists user_routes CASCADE;
-- drop table if exists user_routes_info CASCADE;
-- drop table if exists users CASCADE;
-- drop table if exists users_categories CASCADE;


-- DROP TABLE IF EXISTS user_roles;
CREATE TABLE IF NOT EXISTS user_roles(
                           id bigserial PRIMARY KEY,
                           title varchar(30) not null unique
);

-- DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
                      id bigserial PRIMARY KEY,
                      login varchar(30) not null unique,
                      password varchar(80) not null,
                      email varchar (80) unique,
                      first_name varchar(80) not null,
                      last_name varchar(80) not null,
                      birthday_date date,
                      created_at timestamp default current_timestamp,
                      updated_at timestamp,
                      is_active boolean default true,
                      role_id integer REFERENCES user_roles(id)
);


-- DROP TABLE IF EXISTS locations;
CREATE TABLE IF NOT EXISTS locations(
                           id bigserial PRIMARY KEY,
                           title varchar(240) not null,
                           description varchar(10000),
                           full_description varchar(10000),
                           address varchar(120),
                           work_time_start time,
                           work_time_end time,
                           work_break_start time,
                           work_break_end time,
                           link_image varchar(10000),
                           latitude DOUBLE PRECISION,
                           longitude DOUBLE PRECISION,
                           created_at timestamp default current_timestamp,
                           updated_at timestamp,
                           link_site varchar(240)
);

-- DROP TABLE IF EXISTS categories_for_locations;
CREATE TABLE IF NOT EXISTS categories_for_locations(
                                         id bigserial PRIMARY KEY,
                                         title varchar(30) not null unique,
                                         description varchar(240)
);

-- DROP TABLE IF EXISTS locations_categories;
CREATE TABLE IF NOT EXISTS locations_categories(
                                     location_id integer REFERENCES locations(id),
                                     category_id integer REFERENCES categories_for_locations(id)
);

-- DROP TABLE IF EXISTS events;
CREATE TABLE IF NOT EXISTS events(
                       id bigserial PRIMARY KEY,
                       title varchar(240) unique,
                       description varchar(10000),
                       start_datetime timestamp,
                       finish_datetime timestamp,
                       link_event_site varchar(240),
                       link_image varchar(10000),
                       price integer,
                       location_id integer REFERENCES locations(id),
                       created_at timestamp default current_timestamp,
                       updated_at timestamp,
                       is_active boolean default true,
                       user_created_id integer REFERENCES users(id)
);

-- DROP TABLE IF EXISTS categories_for_events;
CREATE TABLE IF NOT EXISTS categories_for_events(
                                       id bigserial PRIMARY KEY,
                                       title varchar(30) not null unique,
                                       description varchar(240)
);

-- DROP TABLE IF EXISTS events_categories;
CREATE TABLE IF NOT EXISTS events_categories(
                                 event_id integer REFERENCES events(id),
                                 category_id integer REFERENCES categories_for_events(id)
);

-- DROP TABLE IF EXISTS user_events;
CREATE TABLE IF NOT EXISTS user_events(
                             id bigserial PRIMARY KEY,
                             user_id integer REFERENCES users(id),
                             event_id integer REFERENCES events(id)
);

-- DROP TABLE IF EXISTS user_events_info;
CREATE TABLE IF NOT EXISTS user_events_info(
                                  id bigserial PRIMARY KEY,
                                  user_events_id integer REFERENCES user_events(id),
                                  favorites boolean default false,
                                  visited boolean default false
);

-- DROP TABLE IF EXISTS routes_categories;
CREATE TABLE IF NOT EXISTS routes_categories(
                                      id bigserial PRIMARY KEY,
                                      title varchar(30) not null unique,
                                      description varchar(240)
);

-- DROP TABLE IF EXISTS categories_for_users;
CREATE TABLE IF NOT EXISTS categories_for_users(
                                     id bigserial PRIMARY KEY,
                                     title varchar(30) not null unique,
                                     description varchar(240)
);

-- DROP TABLE IF EXISTS users_categories;
CREATE TABLE IF NOT EXISTS users_categories(
                                 user_id integer REFERENCES users(id),
                                 category_id integer REFERENCES categories_for_users(id)
);

-- DROP TABLE IF EXISTS routes;
CREATE TABLE IF NOT EXISTS routes(
                       id bigserial PRIMARY KEY,
                       title varchar(240) not null unique,
                       description varchar(10000),
                       duration time,
                       distance bigint,
                       routes_categories_id integer REFERENCES routes_categories(id),
                       user_created_id integer REFERENCES users(id),
                       created_at timestamp default current_timestamp,
                       updated_at timestamp
);

-- DROP TABLE IF EXISTS routes_locations;
CREATE TABLE IF NOT EXISTS routes_locations(
                                  route_id bigserial REFERENCES routes(id),
                                  location_id integer REFERENCES locations(id)
);

-- DROP TABLE IF EXISTS user_routes;
CREATE TABLE IF NOT EXISTS user_routes(
                             id bigserial PRIMARY KEY,
                             user_id integer REFERENCES users(id),
                             route_id integer REFERENCES routes(id)
);

-- DROP TABLE IF EXISTS user_routes_info;
CREATE TABLE IF NOT EXISTS user_routes_info(
                                  id bigserial PRIMARY KEY,
                                  user_routes_id integer REFERENCES user_routes(id),
                                  favorites boolean default false,
                                  visited boolean default false
);

-- DROP TABLE IF EXISTS offer_categories;
CREATE TABLE IF NOT EXISTS offer_categories(
                                  id bigserial PRIMARY KEY,
                                  title varchar(240) not null unique,
                                  description varchar(240)
);

-- DROP TABLE IF EXISTS offers;
CREATE TABLE IF NOT EXISTS offers(
                        id bigserial PRIMARY KEY,
                        user_created_id integer REFERENCES users(id),
                        event_id integer REFERENCES events(id),
                        location_id integer REFERENCES locations(id),
                        user_received_id integer REFERENCES users(id),
                        title varchar(240) not null,
                        description varchar(1500),
                        created_at timestamp default current_timestamp,
                        updated_at timestamp,
                        is_active boolean,
                        offer_categories_id integer REFERENCES offer_categories(id)
);
