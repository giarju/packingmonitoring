
USE speedaciq;

drop table packing_info, downtime, revision

DROP TABLE downtime

/*drop table dev

CREATE TABLE dev (
	id INT identity(1,1) PRIMARY KEY,
	mode VARCHAR(255),
	sequenced VARCHAR(255),
	general_faults VARCHAR(255),
	blocking_faults VARCHAR(255),
	stopping_faults VARCHAR(255),
	warning_faults VARCHAR(255),
	live_weight FLOAT,
	scale_status VARCHAR(255),
	active_weigh_program INT,
	unit VARCHAR(255),
	command INT,
	parameter INT,
	
	
);*/

CREATE TABLE packing_info (
	id INT IDENTITY(1,1) PRIMARY KEY,
	date_time DATETIME2,
	packing_num INT NOT NULL,
	total_count INT NOT NULL,
	total_weight FLOAT NOT NULL,
	count_change INT NOT NULL,
	weight_change FLOAT NOT NULL
);

CREATE TABLE revision (
	id INT IDENTITY(1,1) PRIMARY KEY,
	date_time DATETIME2,
	username VARCHAR(64) NOT NULL,
	reject_count INT NOT NULL,
	packing_num INT NOT NULL,
	reason VARCHAR(255) NOT NULL
);

CREATE TABLE downtime (
	id INT IDENTITY(1,1) PRIMARY KEY,
	start_time DATETIME2,
	resolve_time DATETIME2,
	total_time INT,
	packing_num INT NOT NULL,
	reason VARCHAR(255),
)

CREATE TABLE userlogin (
	username VARCHAR(64) PRIMARY KEY,
	pwd VARCHAR(255) NOT NULL
)

INSERT INTO packing_info(
    date_time,
	packing_num,
	total_count,
	total_weight,
	count_change,
	weight_change
)
VALUES
    ('2021-4-22 21:09:10', 4, 1000, 22344.5, 0, 0),
	('2021-4-22 21:19:10', 4, 1010, 22355, 10, 10.5),
	('2021-4-22 21:09:10', 3, 1000, 22344.5, 0, 0),
	('2021-4-22 21:19:10', 3, 1011, 22356, 11, 11.5),
	('2021-4-22 21:09:10', 2, 1000, 22344.5, 0, 0)



INSERT INTO revision(
    date_time,
	username,
	reject_count,
	packing_num,
	reason
)
VALUES
    ('2021-4-22 23:09:10', 'auto',1, 4, 'overweight'),
	('2021-4-22 23:18:10', 'ali',2, 4, 'broken'),
	('2021-4-22 23:19:10', 'auto',1, 4, 'overweight'),
	('2021-4-22 23:09:10', 'auto',2, 3, 'underweight')


INSERT INTO downtime(
    start_time,
	resolve_time,
	total_time,
	packing_num,
	reason
)
VALUES
    ('2021-4-22 13:09:10', '2021-4-22 13:39:10',30, 2, 'fault'),
	('2021-4-22 15:09:10', '2021-4-22 15:39:10',30, 3, 'warning'),
	('2021-4-22 16:09:10', null,null, 3, null)

INSERT INTO userlogin(
	username,
	pwd
)
VALUES
	('ali', 'ali'),
	('baba', 'baba')

select * from userlogin