SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user, candidate, company, job_posting, application;

USE db_externatic;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(50),
  city VARCHAR(100),
  picture BLOB,
  hashedPassword VARCHAR(100) UNIQUE NOT NULL,
  admin BOOL DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE candidate (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  cv BLOB,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE company (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  contact VARCHAR(50),
  description TEXT,
  website TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;


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
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE applications (
  id INT NOT NULL AUTO_INCREMENT,
  candidate_id INT NOT NULL,
  job_posting_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM ('en cours', 'acceptée', 'rejetée'),
  PRIMARY KEY (id),
  FOREIGN KEY (candidate_id) REFERENCES candidate(id),
  FOREIGN KEY (job_posting_id) REFERENCES job_posting(id)
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;


INSERT INTO job_posting (company_id, title, description, requirements, contract_type, remote, location, salary, posting_date, archived)
VALUES
  (1, 'Software Engineer', 'Develop and maintain software applications', 'Bachelor\'s degree in Computer Science, experience with Java and SQL', 'CDI', 'Teletravail', 'New York', 'USD 100,000', '2023-06-01', 0),
  (2, 'Data Scientist', 'Extract insights from large datasets', 'Master\'s degree in Data Science, proficiency in Python and machine learning', 'CDI', 'Hybride', 'Los Angeles', 'USD 120,000', '2023-06-02', 0),
  (3, 'Supply Chain Analyst', 'Optimize supply chain operations', 'Bachelor\'s degree in Supply Chain Management, knowledge of logistics software', 'CDI', 'Presentiel', 'Chicago', 'USD 80,000', '2023-06-03', 0),
  (4, 'Hotel Manager', 'Oversee hotel operations and guest services', 'Bachelor\'s degree in Hospitality Management, previous experience in hotel management', 'CDI', 'Presentiel', 'San Francisco', 'USD 90,000', '2023-06-04', 0),
  (5, 'Renewable Energy Engineer', 'Design and implement renewable energy systems', 'Bachelor\'s degree in Mechanical Engineering, expertise in solar and wind energy', 'CDD', 'Hybride', 'Houston', 'USD 70,000', '2023-06-05', 0),
  (6, 'Healthcare IT Specialist', 'Manage and support healthcare information systems', 'Bachelor\'s degree in Health Informatics, knowledge of electronic health records', 'CDI', 'Teletravail', 'Miami', 'USD 85,000', '2023-06-06', 0),
  (7, 'Sous Chef', 'Assist the head chef in food preparation and menu planning', 'Culinary degree, experience in fine dining restaurants', 'CDD', 'Presentiel', 'Seattle', 'USD 60,000', '2023-06-07', 0),
  (8, 'Fashion Designer', 'Create innovative fashion designs and collections', 'Bachelor\'s degree in Fashion Design, strong artistic and creative skills', 'CDI', 'Hybride', 'Boston', 'USD 70,000', '2023-06-08', 0),
  (9, 'IT Consultant', 'Provide technology consulting services to clients', 'Bachelor\'s degree in IT or related field, expertise in network infrastructure', 'CDI', 'Teletravail', 'Denver', 'USD 95,000', '2023-06-09', 0),
  (10, 'Graphic Designer', 'Create visual designs for various mediums', 'Bachelor\'s degree in Graphic Design, proficiency in Adobe Creative Suite', 'CDD', 'Presentiel', 'Atlanta', 'USD 65,000', '2023-06-10', 0),
  (11, 'Financial Advisor', 'Provide financial planning and investment advice', 'Bachelor\'s degree in Finance, relevant certifications (e.g., CFP)', 'CDI', 'Teletravail', 'Dallas', 'USD 100,000', '2023-06-11', 0),
  (12, 'Travel Consultant', 'Plan and book travel arrangements for clients', 'High school diploma, knowledge of popular travel destinations', 'CDD', 'Presentiel', 'Phoenix', 'USD 50,000', '2023-06-12', 0);


SET foreign_key_checks = 1;