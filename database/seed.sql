ALTER TABLE locations ADD CONSTRAINT unique_location UNIQUE (city, state);
ALTER TABLE trainers ADD CONSTRAINT unique_trainer UNIQUE (name, location_id);
ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);
ALTER TABLE users ADD CONSTRAINT gender_constraint CHECK (gender IN ('M', 'F', 'NA'));

INSERT INTO locations(city, state) VALUES ('Townplace', 'WA');
INSERT INTO locations(city, state) VALUES ('Hickville', 'ID');
INSERT INTO locations(city, state) VALUES ('Crime City', 'CA');

INSERT INTO trainers(name, age, location_id) VALUES ('Ronnie Miller', 27, 2);

INSERT INTO users(name, date_of_birth, gender, email, username, password, trainer, primary_gym) Values ('John Doe', '01-03-1947', 'M', 'Johnguy@email.com', 'JohnDoeGuyMan', 123, 1, 2);