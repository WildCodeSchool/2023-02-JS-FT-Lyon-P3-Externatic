SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user, candidate, company, job_posting, application;


CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(50),
  city VARCHAR(100),
  picture VARCHAR(200),
  hashedPassword VARCHAR(100) NOT NULL,
  admin BOOL DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE candidate (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  cv VARCHAR(200),
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


CREATE TABLE application (
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


INSERT INTO user (email, phone, city, picture, hashedPassword, admin)
VALUES
  ('john.doe@example.com', '1234567890', 'New York', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('jane.smith@example.com', '9876543210', 'Los Angeles', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('michael.brown@example.com', '5555555555', 'Chicago', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('emily.johnson@example.com', '9999999999', 'San Francisco', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('william.davis@example.com', '1111111111', 'Houston', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('olivia.wilson@example.com', '2222222222', 'Miami', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('james.jones@example.com', '3333333333', 'Seattle', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('sophia.miller@example.com', '4444444444', 'Boston', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('benjamin.taylor@example.com', '6666666666', 'Denver', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('ava.jackson@example.com', '7777777777', 'Atlanta', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('ethan.martin@example.com', '8888888888', 'Dallas', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('mia.moore@example.com', '9999999999', 'Phoenix', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user1@example.com', '123456789', 'City1', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user2@example.com', '987654321', 'City2', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user3@example.com', '555555555', 'City3', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user4@example.com', '999999999', 'City4', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user5@example.com', '111111111', 'City5', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user6@example.com', '222222222', 'City6', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user7@example.com', '333333333', 'City7', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user8@example.com', '444444444', 'City8', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user9@example.com', '666666666', 'City9', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user10@example.com', '777777777', 'City10', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user11@example.com', '888888888', 'City11', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user12@example.com', '888845668', 'City12', NULL, '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0);
  

INSERT INTO candidate (user_id, firstname, lastname, cv)
VALUES
  (1, 'John', 'Doe', NULL),
  (2, 'Jane', 'Smith', NULL),
  (3, 'Michael', 'Brown', NULL),
  (4, 'Emily', 'Johnson', NULL),
  (5, 'William', 'Davis', NULL),
  (6, 'Olivia', 'Wilson', NULL),
  (7, 'James', 'Jones', NULL),
  (8, 'Sophia', 'Miller', NULL),
  (9, 'Benjamin', 'Taylor', NULL),
  (10, 'Ava', 'Jackson', NULL),
  (11, 'Ethan', 'Martin', NULL),
  (12, 'Mia', 'Moore', NULL);

INSERT INTO company (user_id, name, contact, description, website)
VALUES
  (13, 'ABC Corporation', 'John Anderson', 'A multinational corporation specializing in technology solutions', 'www.abccorp.com'),
  (14, 'XYZ Inc.', 'Sarah Johnson', 'An innovative startup focusing on artificial intelligence', 'www.xyzinc.com'),
  (15, 'Global Logistics', 'Robert Smith', 'A leading logistics company providing supply chain solutions', 'www.globallogistics.com'),
  (16, 'Sunshine Hotels', 'Emily Davis', 'A chain of luxury hotels and resorts worldwide', 'www.sunshinehotels.com'),
  (17, 'Green Energy Solutions', 'David Wilson', 'A renewable energy company promoting sustainable solutions', 'www.greenenergysolutions.com'),
  (18, 'Healthcare Innovations', 'Sophia Thompson', 'A healthcare technology company revolutionizing patient care', 'www.healthcareinnovations.com'),
  (19, 'Foodie Delights', 'Daniel Moore', 'A popular restaurant chain offering gourmet dining experiences', 'www.foodiedelights.com'),
  (20, 'Fashion Forward', 'Oliver Jackson', 'A high-end fashion brand known for its cutting-edge designs', 'www.fashionforward.com'),
  (21, 'Tech Solutions', 'Lucy Wilson', 'An IT consulting firm providing comprehensive technology services', 'www.techsolutions.com'),
  (22, 'Creative Agency', 'Ella Davis', 'A creative agency specializing in branding and marketing strategies', 'www.creativeagency.com'),
  (23, 'Financial Experts', 'Noah Thompson', 'A financial advisory firm offering personalized wealth management services', 'www.financialexperts.com'),
  (24, 'Travel Adventures', 'Liam Roberts', 'A travel agency organizing unique and memorable travel experiences', 'www.traveladventures.com');

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

INSERT INTO applications (candidate_id, job_posting_id, date, status)
VALUES
  (1, 1, '2023-06-19', 'en cours'),
  (2, 2, '2023-06-18', 'rejetée'),
  (3, 3, '2023-06-17', 'acceptée'),
  (4, 1, '2023-06-16', 'rejetée'),
  (5, 2, '2023-06-15', 'en cours'),
  (6, 4, '2023-06-14', 'acceptée'),
  (7, 3, '2023-06-13', 'rejetée'),
  (8, 2, '2023-06-12', 'en cours'),
  (9, 1, '2023-06-11', 'acceptée'),
  (10, 4, '2023-06-10', 'en cours'),
  (1, 5, '2023-06-18', 'rejetée'),
  (1, 6, '2023-06-18', 'acceptée'),
  (1, 2, '2023-06-18', 'rejetée');


SET foreign_key_checks = 1;