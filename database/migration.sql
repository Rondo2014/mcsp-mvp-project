DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS trainers CASCADE;
DROP TABLE IF EXISTS stored_workouts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE locations(
    id SERIAL NOT NULL PRIMARY KEY,
    city TEXT NOT NULL,
    state TEXT NOT NULL
);

CREATE TABLE trainers(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    age SMALLINT NOT NULL,
    location_id INTEGER REFERENCES locations(id)
);

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender CHAR(2) CHECK (gender IN ('M', 'F', 'NA')),
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    trainer INTEGER REFERENCES trainers(id),
    primary_gym INTEGER REFERENCES locations(id)
);

CREATE TABLE stored_workouts(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    workout TEXT[] NOT NULL,
    type TEXT[] NOT NULL,
    sets INTEGER[] NOT NULL,
    reps INTEGER[] NOT NULL,
    weight INTEGER[] NOT NULL,
    distance INTEGER[] NOT NULL,
    time TIME[] NOT NULL,
    calories INTEGER[] NOT NULL,
    notes TEXT[] NOT NULL,
    date DATE[] NOT NULL
);