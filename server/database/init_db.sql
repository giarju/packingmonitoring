
USE packing;

drop table PackingHist, PackingInfo

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

CREATE TABLE PackingInfo (
	packing_id VARCHAR(32) PRIMARY KEY,
	start_time DATETIME2 NOT NULL,
  end_time DATETIME2 NOT NULL,
	start_count INT NOT NULL,
  end_count INT NOT NULL,
  createdAt DATETIME2,
  updatedAt DATETIME2,
);

CREATE TABLE PackingHist (
  num INT IDENTITY(1,1) PRIMARY KEY,
	packing_id VARCHAR(32) NOT NULL,
	start_time DATETIME2 NOT NULL,
  end_time DATETIME2 NOT NULL,
	total_bag INT NOT NULL,
  createdAt DATETIME2,
  updatedAt DATETIME2,
);

INSERT INTO PackingInfo(
  packing_id,
	start_time,
  end_time,
	start_count,
  end_count
)
VALUES
  ('packing4','2021-4-22 21:09:10', '2021-4-22 21:10:10', 1000, 1010),
  ('packing3','2021-4-22 21:09:10', '2021-4-22 21:10:10', 1000, 1010)

INSERT INTO PackingHist(
  packing_id,
	start_time,
  end_time,
	total_bag
)
VALUES
  ('packing4','2021-4-22 21:09:10', '2021-4-22 21:10:10',10),
  ('packing3','2021-4-22 21:09:10', '2021-4-22 21:10:10',10),
  ('packing4','2021-4-23 21:09:10', '2021-4-23 21:10:10',10),
  ('packing3','2021-4-23 21:09:10', '2021-4-23 21:10:10',10),
  ('packing4','2021-4-24 21:09:10', '2021-4-24 21:10:10',10),
  ('packing3','2021-4-24 21:09:10', '2021-4-24 21:10:10',10)

select * from PackingInfo
select * from PackingHist


delete from PackingInfo where packing_id = 'packing4'
