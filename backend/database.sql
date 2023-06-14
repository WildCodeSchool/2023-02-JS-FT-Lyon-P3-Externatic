SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user, candidate, company, job_posting, application;
SET foreign_key_checks = 1;

USE db_externatic;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(50),
  city VARCHAR(100),
  picture BLOB,
  password VARCHAR(100) UNIQUE NOT NULL,
  admin BOOL DEFAULT 0,
  PRIMARY KEY (id)
);


CREATE TABLE candidate (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  cv BLOB,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);


CREATE TABLE company (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  contact VARCHAR(50),
  description TEXT,
  website TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);


CREATE TABLE job_posting (
  id INT NOT NULL AUTO_INCREMENT,
  company_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  contract_type ENUM ('CDI', 'CDD', 'Stage', 'Alternance') NOT NULL,
  remote ENUM ('Teletravail', 'Hybride', 'Presentiel'),
  location VARCHAR(50) NOT NULL,
  salary VARCHAR(50),
  posting_date DATE NOT NULL,
  archived BOOL,
  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES company(id)
);


CREATE TABLE applications (
  id INT NOT NULL AUTO_INCREMENT,
  candidate_id INT NOT NULL,
  job_posting_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM ('en cours', 'acceptée', 'rejetée'),
  PRIMARY KEY (id),
  FOREIGN KEY (candidate_id) REFERENCES candidate(id),
  FOREIGN KEY (job_posting_id) REFERENCES job_posting(id)
);


INSERT INTO user (id, email, phone, city, picture, password, admin)
VALUES
  (1, 'user1@example.com', '123456789', 'City1', NULL, 'password1', 0),
  (2, 'user2@example.com', '987654321', 'City2', NULL, 'password2', 0),
  (3, 'user3@example.com', '555555555', 'City3', NULL, 'password3', 0),
  (4, 'user4@example.com', '999999999', 'City4', NULL, 'password4', 0),
  (5, 'user5@example.com', '111111111', 'City5', NULL, 'password5', 0),
  (6, 'user6@example.com', '222222222', 'City6', NULL, 'password6', 0),
  (7, 'user7@example.com', '333333333', 'City7', NULL, 'password7', 0),
  (8, 'user8@example.com', '444444444', 'City8', NULL, 'password8', 0),
  (9, 'user9@example.com', '666666666', 'City9', NULL, 'password9', 0),
  (10, 'user10@example.com', '777777777', 'City10', NULL, 'password10', 0);

INSERT INTO candidate (id, user_id, firstname, lastname, cv)
VALUES
  (1, 1, 'Candidate1', 'Lastname1', NULL),
  (2, 2, 'Candidate2', 'Lastname2', NULL),
  (3, 3, 'Candidate3', 'Lastname3', NULL),
  (4, 4, 'Candidate4', 'Lastname4', NULL),
  (5, 5, 'Candidate5', 'Lastname5', NULL);


INSERT INTO company (id, user_id, name, contact, description, website)
VALUES
  (1, 6, 'Company1', 'Contact1', 'Description1', 'www.company1.com'),
  (2, 7, 'Company2', 'Contact2', 'Description2', 'www.company2.com'),
  (3, 8, 'Company3', 'Contact3', 'Description3', 'www.company3.com'),
  (4, 9, 'Company4', 'Contact4', 'Description4', 'www.company4.com'),
  (5, 10, 'Company5', 'Contact5', 'Description5', 'www.company5.com');


INSERT INTO job_posting (id, company_id, title, description, requirements, contract_type, remote, location, salary, posting_date, archived)
VALUES
  (1, 1, 'Job1', 'Job description 1', 'Requirements 1', 'CDI', 'Teletravail', 'Location1', 'Salary1', '2023-01-01', 0),
  (2, 2, 'Job2', 'Job description 2', 'Requirements 2', 'CDD', 'Hybride', 'Location2', 'Salary2', '2023-01-02', 0),
  (3, 3, 'Job3', 'Job description 3', 'Requirements 3', 'Stage', 'Presentiel', 'Location3', 'Salary3', '2023-01-03', 0),
  (4, 4, 'Job4', 'Job description 4', 'Requirements 4', 'Alternance', 'Presentiel', 'Location4', 'Salary4', '2023-01-04', 0),
  (5, 5, 'Job5', 'Job description 5', 'Requirements 5', 'CDI', 'Hybride', 'Location5', 'Salary5', '2023-01-05', 0);