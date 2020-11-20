CREATE TABLE todo(
	id SERIAL PRIMARY KEY,
	task VARCHAR (250) NOT NULL,
	status VARCHAR (5) NOT NULL
);

INSERT INTO todo (task, status)
VALUES ('Take dog for walk', 'true');

INSERT INTO todo (task, status)
VALUES ('Learn React', 'false');

SELECT * FROM todo