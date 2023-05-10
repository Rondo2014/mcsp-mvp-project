DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS trainers CASCADE;
DROP TABLE IF EXISTS users;

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
    id SERIAL NOT NULL,
    name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender CHAR(2) CHECK (gender IN ('M', 'F', 'NA')),
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    trainer INTEGER REFERENCES trainers(id),
    primary_gym INTEGER REFERENCES locations(id)
);

