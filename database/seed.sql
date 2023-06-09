ALTER TABLE locations ADD CONSTRAINT unique_location UNIQUE (city, state);
ALTER TABLE trainers ADD CONSTRAINT unique_trainer UNIQUE (name, location_id);
ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);
ALTER TABLE users ADD CONSTRAINT gender_constraint CHECK (gender IN ('M', 'F', 'NA'));

INSERT INTO locations(city, state) VALUES ('Townplace', 'WA');
INSERT INTO locations(city, state) VALUES ('Hickville', 'ID');
INSERT INTO locations(city, state) VALUES ('Crime City', 'CA');

INSERT INTO trainers(name, age, location_id) VALUES ('Ronnie Miller', 27, 2);

INSERT INTO users(name, date_of_birth, gender, email, username, password, trainer, primary_gym) Values ('John Doe', '01-03-1947', 'M', 'Johnguy@email.com', 'JohnDoeGuyMan', 123, 1, 2);

INSERT INTO stored_workouts(user_id, name, workout, type, sets, reps, weight, distance, time, calories, notes, date) VALUES (1, 'Leg Day', ARRAY['legs', 'legs', 'legs', 'legs', 'legs'], ARRAY['Squat', 'Leg Press', 'Leg Extension', 'Leg Curl', 'Calf Raise'], ARRAY[3, 3, 3, 3, 3], ARRAY[10, 10, 10, 10, 10], ARRAY[135, 270, 90, 90, 90], ARRAY[0, 0, 0, 0, 0], ARRAY['00:00:00'::time, '00:00:00'::time, '00:00:00'::time, '00:00:00'::time, '00:00:00'::time], ARRAY[0, 0, 0, 0, 0], ARRAY['', '', '', '', ''], ARRAY['01-02-2020'::date, '01-02-2020'::date, '01-02-2020'::date, '01-02-2020'::date, '01-02-2020'::date]);
INSERT INTO stored_workouts(user_id, name, workout, type, sets, reps, weight, distance, time, calories, notes, date) VALUES (1, 'Chest Day', ARRAY['chest', 'chest', 'chest', 'chest', 'chest'], ARRAY['Bench Press', 'Incline Bench Press', 'Decline Bench Press', 'Dumbbell Fly', 'Cable Crossover'], ARRAY[3, 3, 3, 3, 3], ARRAY[10, 10, 10, 10, 10], ARRAY[135, 90, 90, 30, 30], ARRAY[0, 0, 0, 0, 0], ARRAY['00:00:00'::time, '00:00:00'::time, '00:00:00'::time, '00:00:00'::time, '00:00:00'::time], ARRAY[0, 0, 0, 0, 0], ARRAY['', '', '', '', ''], ARRAY['01-02-2020'::date, '01-02-2020'::date, '01-02-2020'::date, '01-02-2020'::date, '01-02-2020'::date]);