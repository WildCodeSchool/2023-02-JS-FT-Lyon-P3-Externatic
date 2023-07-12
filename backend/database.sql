SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user, candidate, company, job_posting, application, job_category, job_type, job_location;


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
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE company (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  contact VARCHAR(50),
  description VARCHAR(400),
  website VARCHAR(200),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE job_posting (
  id INT NOT NULL AUTO_INCREMENT,
  company_id INT NOT NULL,
  user_id INT NOT NULL,
  job_category_id INT NOT NULL,
  job_type_id INT NOT NULL,
  job_location_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  remote ENUM ('Télétravail', 'Hybride', 'Presentiel'),
  salary VARCHAR(50),
  posting_date DATE NOT NULL,
  archived BOOL,
  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (job_category_id) REFERENCES job_category(id) ON DELETE CASCADE,
  FOREIGN KEY (job_type_id) REFERENCES job_type(id) ON DELETE CASCADE,
  FOREIGN KEY (job_location_id) REFERENCES job_location(id) ON DELETE CASCADE
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE application (
  id INT NOT NULL AUTO_INCREMENT,
  candidate_id INT NOT NULL,
  job_posting_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM ('en cours', 'acceptée', 'rejetée'),
  PRIMARY KEY (id),
  FOREIGN KEY (candidate_id) REFERENCES candidate(id) ON DELETE CASCADE,
  FOREIGN KEY (job_posting_id) REFERENCES job_posting(id) ON DELETE CASCADE
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE job_category (
  id INT NOT NULL AUTO_INCREMENT,
  category VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE job_type (
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE job_location (
  id INT NOT NULL AUTO_INCREMENT,
  location VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;




INSERT INTO user (email, phone, city, picture, hashedPassword, admin)
VALUES
  ('admin@mail.com', '1234567890', 'Admin City', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$OHrIYr3oh1aV8bMvuQQfVg$ulKfOEOlASVNSqHrFtqRQyxUu85biaS/jmsjTH203iE', 1),
  ('jane.smith@example.com', '9876543210', 'Los Angeles', "https://xsgames.co/randomusers/avatar.php?g=female", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('michael.brown@example.com', '5555555555', 'Chicago', "https://xsgames.co/randomusers/avatar.php?g=male", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('emily.johnson@example.com', '9999999999', 'San Francisco', "https://xsgames.co/randomusers/avatar.php?g=female", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('william.davis@example.com', '1111111111', 'Houston', "https://xsgames.co/randomusers/avatar.php?g=male", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('olivia.wilson@example.com', '2222222222', 'Miami', "https://xsgames.co/randomusers/avatar.php?g=female", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('james.jones@example.com', '3333333333', 'Seattle', "https://xsgames.co/randomusers/avatar.php?g=male", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('sophia.miller@example.com', '4444444444', 'Boston', "https://xsgames.co/randomusers/avatar.php?g=female", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('benjamin.taylor@example.com', '6666666666', 'Denver', "https://xsgames.co/randomusers/avatar.php?g=male", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('ava.jackson@example.com', '7777777777', 'Atlanta', "https://xsgames.co/randomusers/avatar.php?g=female", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('ethan.martin@example.com', '8888888888', 'Dallas', "https://xsgames.co/randomusers/avatar.php?g=male", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('mia.moore@example.com', '9999999999', 'Phoenix', "https://xsgames.co/randomusers/avatar.php?g=female", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('company@mail.com', '123456789', 'City1', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$OHrIYr3oh1aV8bMvuQQfVg$ulKfOEOlASVNSqHrFtqRQyxUu85biaS/jmsjTH203iE', 0),
  ('user2@example.com', '987654321', 'City2', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user3@example.com', '555555555', 'City3', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user4@example.com', '999999999', 'City4', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user5@example.com', '111111111', 'City5', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user6@example.com', '222222222', 'City6', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user7@example.com', '333333333', 'City7', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user8@example.com', '444444444', 'City8', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user9@example.com', '666666666', 'City9', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user10@example.com', '777777777', 'City10', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user11@example.com', '888888888', 'City11', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user12@example.com', '888845668', 'City12', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user13@example.com', '333333333', 'City7', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user14@example.com', '444444444', 'City8', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user15@example.com', '666666666', 'City9', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user16@example.com', '777777777', 'City10', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user17@example.com', '888888888', 'City11', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('user18@example.com', '888845668', 'City12', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('johnny.dodoe@example.com', '1234567890', 'San Francisco', 'https://xsgames.co/randomusers/avatar.php?g=male', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('jeanne.richard@example.com', '2345678901', 'New York', 'https://xsgames.co/randomusers/avatar.php?g=female', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('david.caplan@example.com', '2345678901', 'New York', 'https://xsgames.co/randomusers/avatar.php?g=female', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('eliane.robert@example.com', '2345678901', 'New York', 'https://xsgames.co/randomusers/avatar.php?g=female', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('marcel.renfor@example.com', '2345678901', 'New York', 'https://xsgames.co/randomusers/avatar.php?g=female', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('jacky.klein@example.com', '2345678901', 'New York', 'https://xsgames.co/randomusers/avatar.php?g=female', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('sebastien.clarck@example.com', '2345678901', 'New York', 'https://xsgames.co/randomusers/avatar.php?g=female', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('william.peel@example.com', '2345678901', 'New York', 'https://xsgames.co/randomusers/avatar.php?g=female', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('philip.morris@example.com', '2345678901', 'New York', 'https://xsgames.co/randomusers/avatar.php?g=female', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0),
  ('brad.pitttt@example.com', '2345678901', 'New York', 'https://xsgames.co/randomusers/avatar.php?g=female', '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0);

INSERT INTO candidate (user_id, firstname, lastname, cv)
VALUES
  (1, 'Admin', 'Test', NULL),
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
  (24, 'Travel Adventures', 'Liam Roberts', 'A travel agency organizing unique and memorable travel experiences', 'www.traveladventures.com'),
(25, 'CyberGuard', 'Michael Thompson', 'A cybersecurity firm providing robust protection against digital threats', 'www.cyberguard.com'),
(26, 'MobileTech', 'Olivia Lee', 'A mobile app development company creating innovative and user-friendly applications', 'www.mobiletech.com'),
(27, 'AI Solutions', 'James Anderson', 'An artificial intelligence company leveraging cutting-edge technology for various industries', 'www.aisolutions.com'),
(28, 'TechHub', 'Emily Wilson', 'A technology incubator fostering startups and entrepreneurs', 'www.techhub.com'),
(29, 'WebDev', 'Daniel Brown', 'A web development agency specializing in creating dynamic and responsive websites', 'www.webdev.com'),
(30, 'Software Solutions', 'Sophia Clark', 'A software development company delivering customized solutions for businesses', 'www.softwaresolutions.com'),
(31, 'TechGurus', 'Benjamin Davis', 'A technology consultancy providing expert advice and strategies', 'www.techgurus.com'),
(32, 'E-Commerce Solutions', 'Ava Wilson', 'An e-commerce company offering end-to-end solutions for online businesses', 'www.ecommercesolutions.com'),
(33, 'DataSecurity', 'William Thompson', 'A data security company specializing in safeguarding sensitive information', 'www.datasecurity.com'),
(34, 'TechEducate', 'Emma Roberts', 'An educational technology company empowering learners through innovative tools', 'www.techeducate.com'),
(35, 'Digital Solutions', 'Jacob Wilson', 'A digital transformation company enabling organizations to thrive in the digital age', 'www.digitalsolutions.com'),
(36, 'IoT Innovations', 'Mia Johnson', 'An Internet of Things company driving smart and connected solutions', 'www.iotinnovations.com'),
(37, 'TechSupport', 'Liam Anderson', 'A technology support company providing reliable technical assistance', 'www.techsupport.com'),
(38, 'DataTech', 'John Smith', 'A data analytics company offering advanced insights and solutions', 'www.datatech.com'),
(39, 'Cloud Innovators', 'Sarah Johnson', 'A cloud computing company revolutionizing the way businesses operate', 'www.cloudinnovators.com');

INSERT INTO job_posting (
  company_id,
  user_id,
  job_category_id,
  job_type_id,
  job_location_id,
  title,
  description,
  requirements,
  remote,
  salary,
  posting_date,
  archived
)
VALUES (
  1,
  1,
  1,
  1,
  1,
  'Développeur Front-End',
  'Ce que tu peux attendre de nous :\n Des environnements de travail de qualité, où les projets sont dimensionnés et drivés en feature Team (être bien entouré pour performer !) Un enrichissement quotidien grâce à la mutualisation de compétences au sein de la Communauté Front-end et même à l’échelle des 11 expertises d’Atecna. Nous t’accompagnons dans tes réussites techniques au travers de Formations, Meet-up, Conférences… Nous écrivons ensemble ton projet professionnel en fonction de tes envies : une évolution vers une expertise technique, une opportunité de manager, un souhait de porter également un rôle de lead tech, … Les atouts du package Atecna : un salaire fixe et une participation à l’intéressement de l’entreprise. Un périmètre de déplacement réduit (métropole lilloise proche) et de la souplesse dans ton organisation de travail (télétravail partiel possible, horaires adaptés…)',
  'Ce que nous attendons de toi :\n• Être opérationnel sur du Javascript natif et au moins 1 Frameworks JS majeur pour te positionner en tant que référent Front-end auprès de nos clients et leurs équipes.\n• Être capable de prendre de la hauteur de vue sur les enjeux clients / projets / architecture et apporter ton expérience pour cerner au mieux les attentes des utilisateurs. Des convictions en matière d’expérience utilisateur ? On aime !\n• Apporter ton expertise métier et tes connaissances techniques à ton équipe.\nTravailler en mode versioning :\n› Code review en équipe + pilotage agile\n› Tests unitaires et fonctionnels › Code quality › CI/CD',
  'Teletravail',
  'EUR 52,000',
  '2023-06-21',
  0
),
(2, 2, 1, 1, 2, 'Développeur Web Front-End', 'Nous recherchons un développeur Front-End talentueux pour rejoindre notre équipe de développement. Vous serez responsable de la conception et de la mise en œuvre des interfaces utilisateur attrayantes et réactives pour nos applications web. Vos principales tâches incluront la création de maquettes, le développement de composants réutilisables, l''intégration avec les API et la collaboration avec l''équipe de conception. Nous sommes à la recherche d''un développeur passionné et expérimenté pour rejoindre notre équipe dynamique en tant que développeur Full Stack. Vous serez responsable de la conception, du développement et de la maintenance de nos applications web. En collaborant avec notre équipe multidisciplinaire, vous contribuerez à la création d''expériences utilisateur exceptionnelles. Vos principales responsabilités incluront la création de fonctionnalités innovantes, la résolution de problèmes techniques complexes et l''amélioration des performances des applications. Vous devrez maîtriser les langages de programmation tels que JavaScript, HTML et CSS, ainsi que les frameworks tels que React, Angular ou Vue.js. Nous recherchons un candidat ayant une solide expérience en développement web, une bonne compréhension des principes de conception et une passion pour les nouvelles technologies. Vous devrez être autonome, créatif et capable de travailler efficacement en équipe. Si vous souhaitez rejoindre une entreprise en pleine croissance, offrant un environnement de travail stimulant et des opportunités d''évolution, nous serions ravis de discuter avec vous. Rejoignez-nous dès aujourd''hui et participez à la création de produits innovants qui auront un impact réel sur la vie des utilisateurs.', '• Maîtrise de HTML, CSS et JavaScript\n• Expérience avec les frameworks Front-End (par exemple, React, Angular, Vue.js)\n• Connaissance des principes et des meilleures pratiques en matière d''interface utilisateur (UI) et d''expérience utilisateur (UX)', 'Télétravail', '60 000 EUR', '2023-06-23', 0),
(3, 3, 1, 2, 2, 'Développeur Front-End JS', 'Rejoignez notre équipe en tant que développeur Front-End et participez à la création d''interfaces utilisateur exceptionnelles pour nos applications web. Vous serez responsable de la traduction des maquettes graphiques en code HTML, CSS et JavaScript de haute qualité. Maîtrisant les dernières technologies Front-End telles que React, Angular et Vue.js, vous travaillerez en étroite collaboration avec les concepteurs et les développeurs Back-End pour offrir des expériences utilisateur fluides et attrayantes. Si vous êtes passionné par le développement Front-End, que vous aimez résoudre des problèmes complexes et que vous souhaitez contribuer à des projets innovants, rejoignez notre équipe dynamique.', '• Plus de 5 ans d''expérience en développement Front-End\n• Maîtrise approfondie de HTML, CSS et JavaScript\n• Capacité à résoudre des problèmes et à travailler en équipe', 'Presentiel', '80 000 EUR', '2023-06-23', 0),
(4, 4, 1, 1, 5, 'Développeur Web Front-End', 'Nous sommes à la recherche d''un développeur Front-End senior pour rejoindre notre équipe de développement. Dans ce rôle, vous serez responsable de la création d''interfaces utilisateur réactives et conviviales en utilisant les dernières technologies Front-End. Vous devrez maîtriser les langages HTML, CSS et JavaScript, ainsi que les frameworks tels que React, Angular ou Vue.js. En tant que membre clé de l''équipe, vous travaillerez en étroite collaboration avec les concepteurs et les développeurs Back-End pour créer des applications web innovantes. Rejoignez-nous si vous êtes passionné par le développement Front-End, avez une solide expérience dans le domaine et souhaitez contribuer à des projets stimulants.', '• Excellente maîtrise de JavaScript, HTML et CSS\n• Expérience avec les frameworks Front-End tels que React, Angular ou Vue.js\n• Connaissance des principes de conception web et des bonnes pratiques de développement\n• Capacité à résoudre des problèmes complexes et à travailler de manière autonome\n• Bonnes compétences en communication', 'Télétravail', '70 000 EUR', '2023-06-23', 0),
(5, 5, 1, 1, 6, 'Développeur Web Front-End', 'Rejoignez notre équipe en tant que développeur Front-End expérimenté et contribuez à la création d''interfaces utilisateur de qualité pour nos applications web. Dans ce rôle, vous serez responsable du développement de fonctionnalités Front-End, de l''optimisation des performances et de la résolution des problèmes techniques. Vous devrez maîtriser les langages HTML, CSS et JavaScript, ainsi que les frameworks tels que React, Angular ou Vue.js. Si vous avez une solide expérience en développement web, un souci du détail et une passion pour l''amélioration continue, ce poste est fait pour vous.', '• Solide expérience en développement Front-End\n• Maîtrise des technologies Front-End telles que HTML, CSS, JavaScript et les frameworks associés\n• Connaissance approfondie des principes de conception UX/UI\n• Expérience dans la création de wireframes et de maquettes interactives\n• Capacité à travailler en équipe et à collaborer avec des designers','Hybride', '65 000 EUR', '2023-06-23', 0),
(6, 6, 1, 4, 9, 'Développeur Web Front-End', 'Nous recherchons un développeur Front-End créatif pour rejoindre notre équipe passionnée. En tant que développeur Front-End, vous aurez l''opportunité de participer à des projets innovants et de créer des interfaces utilisateur uniques. Vous devrez maîtriser les langages HTML, CSS et JavaScript, ainsi que les frameworks Front-End tels que React, Angular ou Vue.js. Si vous êtes passionné par l''art de la programmation, que vous avez un sens esthétique développé et que vous souhaitez contribuer à des projets qui repoussent les limites, rejoignez-nous et apportez votre créativité au développement web.', '• Solide expérience en développement Front-End pour des plateformes e-commerce\n• Maîtrise des langages et des technologies Front-End tels que HTML, CSS, JavaScript, jQuery\n• Connaissance des frameworks e-commerce (par exemple, Magento, Shopify)\n• Capacité à intégrer des API et à collaborer avec des développeurs back-end\n• Bonne compréhension des enjeux de sécurité et des meilleures pratiques en matière de performance', 'Hybride','50 000 EUR', '2023-06-23', 0),
(7, 7, 1, 4, 9, 'Alternance Développeur Front-End', 'Nous recherchons un développeur Front-End Junior en alternance motivé pour rejoindre notre équipe. Vous aurez l''opportunité d''apprendre et de développer vos compétences en travaillant sur des projets concrets. Sous la supervision de notre équipe expérimentée, vous participerez à la création et à la maintenance d''interfaces utilisateur attrayantes et réactives pour nos applications web. Vous serez impliqué dans toutes les phases du cycle de développement, de la conception des maquettes à l''intégration du code. Vous devrez maîtriser les langages HTML, CSS et JavaScript, ainsi que les principes de base de l''UI/UX. Votre capacité à apprendre rapidement et à vous adapter aux nouvelles technologies sera un atout essentiel. Vous travaillerez en étroite collaboration avec notre équipe de développeurs expérimentés, qui vous guidera tout au long de votre parcours d''apprentissage. Ce poste en alternance offre une excellente opportunité d''acquérir une expérience pratique dans le domaine du développement web et de travailler sur des projets réels. Si vous êtes passionné par le développement Front-End, que vous souhaitez élargir vos connaissances et que vous êtes prêt à relever de nouveaux défis, rejoignez notre équipe dès aujourd''hui.', '• Connaissance de base en HTML, CSS et JavaScript\n• Intérêt pour les technologies Front-End\n• Capacité à apprendre rapidement et à s''adapter\n• Aptitude à travailler en équipe et à suivre les directives\n• Bonnes compétences en résolution de problèmes', 'Presentiel', '35 000 EUR', '2023-06-23', 0),
(8, 8, 4, 3, 10, 'Développeur Mobile', 'Nous recherchons un développeur mobile talentueux et polyvalent pour rejoindre notre équipe de développement. En tant que développeur mobile, vous serez responsable de la conception, du développement et de la maintenance d''applications mobiles pour les plateformes iOS et Android. Vous travaillerez en étroite collaboration avec les concepteurs d''interfaces utilisateur et les développeurs back-end pour créer des expériences utilisateur fluides et attrayantes. Vos principales tâches incluront la traduction des spécifications fonctionnelles en code, l''intégration avec les API, les tests et le déploiement des applications. Vous devrez maîtriser les langages de programmation spécifiques à chaque plateforme (Objective-C/Swift pour iOS, Java/Kotlin pour Android) ainsi que les frameworks et outils de développement associés. Une connaissance approfondie des bonnes pratiques en matière de conception mobile, de performance et de sécurité est essentielle pour ce poste. Si vous êtes passionné par le développement mobile, que vous aimez relever les défis techniques et que vous souhaitez contribuer à la création d''applications mobiles de qualité, rejoignez notre équipe dynamique dès aujourd''hui.', '• Solide expérience dans le développement d''applications mobiles Front-End\n• Maîtrise de HTML, CSS et JavaScript\n• Expertise avec les frameworks Front-End mobiles tels que React Native ou Flutter\n• Connaissance des bonnes pratiques de conception mobile\n• Capacité à travailler en équipe agile\n• Excellentes compétences en résolution de problèmes','Télétravail', 'Salaire compétitif', '2023-06-23', 0),
(1, 1, 2, 1, 1, 'Développeur Back-End', 'Ce que tu peux attendre de nous :\nDes environnements de travail de qualité, où les projets sont dimensionnés et drivés en feature Team (être bien entouré pour performer !) Un enrichissement quotidien grâce à la mutualisation de compétences au sein de la Communauté Back-end et même à l’échelle des 11 expertises d’Atecna. Nous t’accompagnons dans tes réussites techniques au travers de Formations, Meet-up, Conférences… Nous écrivons ensemble ton projet professionnel en fonction de tes envies : une évolution vers une expertise technique, une opportunité de manager, un souhait de porter également un rôle de lead tech, … Les atouts du package Atecna : un salaire fixe et une participation à l’intéressement de l’entreprise. Un périmètre de déplacement réduit (métropole lilloise proche) et de la souplesse dans ton organisation de travail (télétravail partiel possible, horaires adaptés…)', 'Ce que nous attendons de toi :\n• Maîtrise des langages de programmation Back-End tels que Java, Python, C#, etc.\n• Expérience avec les frameworks et les outils Back-End (par exemple, Spring, Django, .NET)\n• Connaissance des bases de données et des requêtes SQL\n• Compréhension des principes de conception et d''architecture Back-End\n• Capacité à résoudre des problèmes techniques et à travailler en équipe', 'Teletravail', 'EUR 55,000', '2023-06-21', 0), 
(2, 2, 2, 1, 2, 'Développeur Web Back-End', 'Nous recherchons un développeur Back-End talentueux pour rejoindre notre équipe de développement. Vous serez responsable de la conception, du développement et de la maintenance des fonctionnalités Back-End de nos applications web. Vos principales tâches incluront la mise en place de l''architecture, l''implémentation des API, l''optimisation des performances et la résolution des problèmes techniques. Nous recherchons un candidat passionné par le développement Back-End, ayant une solide expérience avec les langages et les frameworks Back-End tels que Java, Python, .NET, Spring, Django, etc. Vous devrez également avoir une bonne compréhension des bases de données et des requêtes SQL. Rejoignez notre équipe dynamique et contribuez à la création d''applications web performantes et robustes.', '• Maîtrise des langages de programmation Back-End tels que Java, Python, .NET\n• Expérience avec les frameworks Back-End (par exemple, Spring, Django)\n• Connaissance des bases de données et des requêtes SQL\n• Capacité à résoudre des problèmes techniques et à travailler en équipe', 'Teletravail', 'EUR 60,000', '2023-06-23', 0), 
(3, 3, 2, 1, 2, 'Développeur Back-End Java', 'Rejoignez notre équipe en tant que développeur Back-End et participez à la création de solutions logicielles robustes et performantes. En tant que développeur Back-End Java, vous serez responsable du développement et de la maintenance des fonctionnalités Back-End de nos applications d''entreprise. Vous travaillerez en étroite collaboration avec les équipes Front-End et serez impliqué dans toutes les phases du cycle de développement logiciel. Nous recherchons un candidat ayant une solide expérience en développement Back-End avec Java, une connaissance des frameworks tels que Spring, ainsi qu''une compréhension approfondie des bases de données et des requêtes SQL. Si vous êtes passionné par le développement logiciel, que vous aimez résoudre des problèmes techniques et que vous souhaitez contribuer à des projets d''envergure, rejoignez notre équipe talentueuse.', '• Plus de 3 ans d''expérience en développement Back-End avec Java\n• Maîtrise de Spring Framework et des outils associés\n• Connaissance des bases de données SQL\n• Capacité à travailler en équipe et à résoudre des problèmes techniques', 'Presentiel', 'EUR 65,000', '2023-06-23', 0),
(1, 1, 5, 5, 3, 'Développeur de jeux vidéo - Gameplay', 'Nous recherchons un développeur de jeux vidéo talentueux pour rejoindre notre équipe de développement. En tant que développeur de jeux vidéo spécialisé dans le gameplay, vous serez responsable de la conception, de l''implémentation et de l''optimisation des mécanismes de jeu. Vos principales tâches incluront la programmation de l''intelligence artificielle, la gestion des interactions joueur-environnement, la mise en place de la physique du jeu et la résolution des problèmes de gameplay. Nous recherchons un candidat passionné par les jeux vidéo, ayant une solide expérience en programmation et une bonne compréhension des concepts de gameplay. Rejoignez notre équipe dynamique et contribuez à la création de jeux vidéo immersifs et captivants.', '• Expérience en programmation de jeux vidéo\n• Bonne compréhension des concepts de gameplay\n• Connaissance des langages et des outils de développement de jeux vidéo (par exemple, C++, Unity, Unreal Engine)\n• Capacité à résoudre des problèmes techniques et à travailler en équipe', 'Presentiel', 'EUR 70,000', '2023-06-23', 0), 
(2, 2, 5, 1, 4, 'Développeur de jeux vidéo - Graphismes', 'Rejoignez notre équipe en tant que développeur de jeux vidéo spécialisé dans les graphismes et participez à la création de visuels époustouflants pour nos jeux vidéo. En tant que développeur de jeux vidéo axé sur les graphismes, vous serez responsable de la création d''effets visuels, de la modélisation 3D, de l''animation et de l''optimisation des performances graphiques. Vous travaillerez en étroite collaboration avec les concepteurs et les artistes pour donner vie à nos mondes virtuels. Nous recherchons un candidat passionné par les jeux vidéo, ayant une solide expérience en développement graphique, une maîtrise des outils de modélisation et d''animation 3D, ainsi qu''une bonne compréhension des pipelines de rendu. Rejoignez notre équipe créative et contribuez à la création de jeux vidéo visuellement immersifs.', '• Expérience en développement graphique pour les jeux vidéo\n• Maîtrise des outils de modélisation et d''animation 3D (par exemple, Maya, 3ds Max)\n• Connaissance des pipelines de rendu et des techniques d''optimisation graphique\n• Capacité à travailler en équipe et à collaborer avec des concepteurs et des artistes', 'Presentiel', 'EUR 75,000', '2023-06-25', 0),
(1, 1, 3, 4, 1, 'Développeur Web Full Stack', 'Nous recherchons un développeur Web Full Stack talentueux pour rejoindre notre équipe de développement. En tant que développeur Full Stack, vous serez responsable de la conception, du développement et de la maintenance de nos applications Web. Vos principales tâches incluront la création de fonctionnalités, l''intégration avec les API, la gestion des bases de données et l''optimisation des performances. Nous recherchons un candidat passionné par le développement Web, ayant une solide expérience avec les langages de programmation tels que HTML, CSS, JavaScript, ainsi qu''une connaissance des frameworks Back-End et Front-End tels que Node.js, React, Angular ou Vue.js. Rejoignez notre équipe dynamique et contribuez à la création d''applications Web innovantes.', '• Maîtrise des langages de programmation Web tels que HTML, CSS, JavaScript\n• Expérience avec les frameworks Back-End et Front-End (par exemple, Node.js, React, Angular, Vue.js)\n• Connaissance des bases de données et des requêtes SQL\n• Capacité à résoudre des problèmes techniques et à travailler en équipe', 'Teletravail', 'EUR 60,000', '2023-06-21', 0), 
(2, 2, 3, 1, 2, 'Développeur Web Full Stack', 'Rejoignez notre équipe en tant que développeur Web Full Stack et participez à la création d''applications Web innovantes. En tant que développeur Full Stack, vous serez responsable de la conception, du développement et de la maintenance des fonctionnalités Back-End et Front-End de nos applications Web. Vos principales tâches incluront la programmation, l''intégration de l''UI/UX, la gestion des bases de données et l''optimisation des performances. Nous recherchons un candidat passionné par le développement Web, ayant une solide expérience avec les langages de programmation tels que HTML, CSS, JavaScript, ainsi qu''une connaissance approfondie des frameworks Back-End (par exemple, Node.js, Python, PHP) et Front-End (par exemple, React, Angular, Vue.js). Rejoignez notre équipe créative et contribuez à la création d''applications Web performantes et attrayantes.', '• Maîtrise des langages de programmation Web tels que HTML, CSS, JavaScript\n• Expérience avec les frameworks Back-End et Front-End (par exemple, Node.js, React, Angular, Vue.js)\n• Connaissance des bases de données et des requêtes SQL\n• Capacité à résoudre des problèmes techniques et à travailler en équipe', 'Teletravail', 'EUR 65,000', '2023-06-23', 0), 
(3, 3, 3, 1, 2, 'Développeur Web Full Stack', 'Nous recherchons un développeur Web Full Stack expérimenté pour rejoindre notre équipe de développement. En tant que développeur Full Stack, vous serez responsable de la conception, du développement et de la maintenance de nos applications Web. Vous travaillerez sur tous les aspects du développement, du Front-End au Back-End, en utilisant une variété de langages et de technologies. Nous recherchons un candidat passionné par le développement Web, ayant une solide expérience avec les langages de programmation tels que HTML, CSS, JavaScript, ainsi qu''une connaissance approfondie des frameworks Back-End (par exemple, Node.js, Java, .NET) et Front-End (par exemple, React, Angular, Vue.js). Rejoignez notre équipe expérimentée et contribuez à la création d''applications Web de qualité.', '• Maîtrise des langages de programmation Web tels que HTML, CSS, JavaScript\n• Expérience avec les frameworks Back-End et Front-End (par exemple, Node.js, React, Angular, Vue.js)\n• Connaissance des bases de données et des requêtes SQL\n• Capacité à résoudre des problèmes techniques et à travailler en équipe', 'Presentiel', 'EUR 70,000', '2023-06-23', 0), 
(4, 4, 3, 2, 5, 'Développeur Web Full Stack', 'Rejoignez notre équipe en tant que développeur Web Full Stack et participez à la création de solutions Web innovantes. En tant que développeur Full Stack, vous serez responsable de la conception, du développement et de la maintenance de nos applications Web. Vos principales tâches incluront la création de fonctionnalités, l''intégration avec les API, la gestion des bases de données et l''optimisation des performances. Nous recherchons un candidat passionné par le développement Web, ayant une solide expérience avec les langages de programmation tels que HTML, CSS, JavaScript, ainsi qu''une connaissance des frameworks Back-End et Front-End tels que Node.js, React, Angular ou Vue.js. Rejoignez notre équipe dynamique et contribuez à la création d''applications Web innovantes.', '• Maîtrise des langages de programmation Web tels que HTML, CSS, JavaScript\n• Expérience avec les frameworks Back-End et Front-End (par exemple, Node.js, React, Angular, Vue.js)\n• Connaissance des bases de données et des requêtes SQL\n• Capacité à résoudre des problèmes techniques et à travailler en équipe', 'Teletravail', 'EUR 75,000', '2023-06-25', 0),
(1, 1, 9, 1, 1, 'Product Owner', 'We are seeking a talented Product Owner to join our team. As a Product Owner, you will be responsible for defining and prioritizing product features, gathering requirements, and collaborating with cross-functional teams to ensure successful product delivery. Your main tasks will include creating and maintaining the product backlog, conducting user research, and working closely with stakeholders to understand their needs. We are looking for a candidate with excellent communication and leadership skills, strong analytical abilities, and a deep understanding of agile methodologies. Join our dynamic team and contribute to the development of innovative products.', '• Previous experience as a Product Owner or similar role\n• Strong understanding of agile methodologies and product management practices\n• Excellent communication and collaboration skills\n• Analytical mindset and problem-solving abilities\n• Knowledge of user research techniques\n• Experience with project management tools', 'Teletravail', 'EUR 80,000', '2023-06-21', 0),
(5, 5, 1, 3, 3, 'Data Scientist', 'Join our data science team as a Data Scientist and contribute to the development of cutting-edge data-driven solutions. As a Data Scientist, you will be responsible for analyzing complex datasets, developing statistical models, and applying machine learning algorithms to extract meaningful insights. Your main tasks will include data preprocessing, feature engineering, and building predictive models. We are looking for a candidate with a strong background in statistics, programming skills in Python or R, and experience with data visualization tools. Join our innovative team and make a significant impact in the field of data science.', '• Strong background in statistics and data analysis\n• Proficiency in programming languages such as Python or R\n• Experience with machine learning algorithms and frameworks\n• Familiarity with data preprocessing and feature engineering\n• Excellent problem-solving and critical thinking skills\n• Knowledge of data visualization tools (e.g., Tableau, matplotlib)', 'Presentiel', 'EUR 70,000', '2023-06-27', 0),
(3, 6, 2, 2, 2, 'Cybersecurity Analyst', 'We are seeking a skilled Cybersecurity Analyst to join our team and protect our systems from potential threats. As a Cybersecurity Analyst, you will be responsible for monitoring network activity, conducting vulnerability assessments, and implementing security measures to safeguard our infrastructure. Your main tasks will include analyzing security breaches, developing incident response plans, and staying updated on the latest security technologies and trends. We are looking for a candidate with a solid understanding of cybersecurity principles, knowledge of network protocols, and experience with security tools and technologies. Join our dedicated team and help ensure the security of our organization.', '• Strong understanding of cybersecurity principles and best practices\n• Knowledge of network protocols and security technologies\n• Experience with security tools such as SIEM, IDS/IPS, and antivirus software\n• Ability to analyze and respond to security incidents\n• Relevant certifications (e.g., CISSP, CEH) are a plus', 'Presentiel', 'EUR 65,000', '2023-06-23', 0),
(4, 7, 5, 1, 1, 'AI Researcher', 'Join our AI research team as an AI Researcher and contribute to cutting-edge advancements in artificial intelligence. As an AI Researcher, you will be responsible for designing and implementing AI models, conducting experiments, and analyzing large datasets. Your main tasks will include developing machine learning algorithms, optimizing model performance, and staying up to date with the latest research in the field. We are looking for a candidate with a strong background in machine learning, proficiency in programming languages such as Python or TensorFlow, and a passion for pushing the boundaries of AI technology. Join our research-driven team and shape the future of artificial intelligence.', '• Strong background in machine learning and deep learning\n• Proficiency in programming languages such as Python or TensorFlow\n• Experience with AI frameworks and libraries\n• Knowledge of data preprocessing and model evaluation techniques\n• Strong problem-solving and research skills\n• Published papers or contributions to open-source AI projects are a plus', 'Teletravail', 'EUR 80,000', '2023-06-25', 0),
(2, 8, 7, 4, 3, 'Cloud Solutions Architect', 'We are seeking a skilled Cloud Solutions Architect to join our team and design scalable and secure cloud-based solutions. As a Cloud Solutions Architect, you will be responsible for assessing business requirements, developing cloud architectures, and overseeing the implementation of cloud infrastructure. Your main tasks will include defining cloud migration strategies, optimizing resource utilization, and ensuring compliance with industry standards. We are looking for a candidate with a strong background in cloud computing, experience with cloud platforms such as AWS or Azure, and knowledge of containerization technologies. Join our team and drive the adoption of cloud technologies in our organization.', '• Strong understanding of cloud computing concepts and architectures\n• Experience with cloud platforms such as AWS, Azure, or Google Cloud\n• Knowledge of containerization technologies (e.g., Docker, Kubernetes)\n• Familiarity with DevOps practices and tools\n• Excellent problem-solving and communication skills\n• Relevant certifications (e.g., AWS Certified Solutions Architect) are a plus', 'Presentiel', 'EUR 90,000', '2023-06-29', 0),
(3, 9, 4, 2, 4, 'UI/UX Designer', 'Join our design team as a UI/UX Designer and contribute to the development of user-friendly and visually appealing digital products. As a UI/UX Designer, you will be responsible for creating wireframes, prototypes, and high-fidelity designs that enhance the user experience. Your main tasks will include conducting user research, collaborating with developers, and iterating on design solutions based on user feedback. We are looking for a candidate with a strong portfolio showcasing their design skills, proficiency in design tools such as Sketch or Adobe XD, and a solid understanding of user-centered design principles. Join our creative team and shape the future of digital experiences.', '• Strong portfolio demonstrating UI/UX design skills\n• Proficiency in design tools such as Sketch or Adobe XD\n• Experience with user research and usability testing\n• Knowledge of design principles and best practices\n• Excellent communication and collaboration skills\n• Familiarity with front-end development technologies is a plus', 'Teletravail', 'EUR 60,000', '2023-06-30', 0),
(4, 10, 6, 1, 5, 'Data Engineer', 'We are seeking a skilled Data Engineer to join our team and support our data infrastructure and pipelines. As a Data Engineer, you will be responsible for designing, building, and maintaining scalable data systems and ETL processes. Your main tasks will include data modeling, performance optimization, and ensuring data quality and integrity. We are looking for a candidate with a strong background in data engineering, proficiency in programming languages such as Python or SQL, and experience with data warehousing and cloud-based data technologies. Join our data-driven team and contribute to the success of our data initiatives.', '• Strong background in data engineering and database design\n• Proficiency in programming languages such as Python or SQL\n• Experience with data warehousing and ETL processes\n• Familiarity with cloud-based data technologies (e.g., AWS Redshift, Google BigQuery)\n• Strong problem-solving and analytical skills\n• Knowledge of data governance and security practices', 'Presentiel', 'EUR 70,000', '2023-07-01', 0),
(5, 11, 1, 4, 3, 'Software Development Manager', 'Join our team as a Software Development Manager and lead a team of talented software engineers in the development of innovative software solutions. As a Software Development Manager, you will be responsible for project planning, resource allocation, and ensuring the successful delivery of software projects. Your main tasks will include setting development priorities, mentoring team members, and collaborating with stakeholders to define project requirements. We are looking for a candidate with a strong technical background, excellent leadership and communication skills, and experience with agile methodologies. Join our organization and drive the growth andsuccess of our software development team.', '• Strong technical background in software development\n• Proven experience in managing software development projects\n• Excellent leadership and communication skills\n• Knowledge of agile methodologies and project management tools\n• Ability to mentor and motivate team members\n• Strong problem-solving and decision-making abilities\n• Understanding of software development lifecycle', 'Presentiel', 'EUR 100,000', '2023-07-03', 0),
(2, 12, 5, 2, 2, 'Machine Learning Engineer', 'We are seeking a talented Machine Learning Engineer to join our team and contribute to the development of machine learning models and algorithms. As a Machine Learning Engineer, you will be responsible for data preprocessing, feature engineering, and model development and deployment. Your main tasks will include training and optimizing machine learning models, evaluating model performance, and integrating models into production systems. We are looking for a candidate with a strong background in machine learning, proficiency in programming languages such as Python or TensorFlow, and experience with deep learning frameworks. Join our team and work on exciting machine learning projects.', '• Strong background in machine learning and deep learning\n• Proficiency in programming languages such as Python or TensorFlow\n• Experience with machine learning frameworks (e.g., PyTorch, Keras)\n• Familiarity with data preprocessing and feature engineering\n• Strong problem-solving and analytical skills\n• Knowledge of model deployment and production systems', 'Teletravail', 'EUR 75,000', '2023-07-05', 0),
(1, 13, 3, 1, 1, 'Front-End Developer', 'Join our team as a Front-End Developer and contribute to the development of user-friendly and responsive web applications. As a Front-End Developer, you will be responsible for implementing visual elements and user interactions based on design specifications. Your main tasks will include writing clean and efficient code, optimizing application performance, and collaborating with back-end developers to ensure seamless integration. We are looking for a candidate with strong proficiency in HTML, CSS, and JavaScript, experience with front-end frameworks such as React or Angular, and knowledge of web accessibility standards. Join our creative team and build engaging web experiences.', '• Strong proficiency in HTML, CSS, and JavaScript\n• Experience with front-end frameworks (e.g., React, Angular)\n• Knowledge of web accessibility standards\n• Familiarity with version control systems (e.g., Git)\n• Attention to detail and ability to translate designs into code\n• Strong problem-solving and debugging skills', 'Teletravail', 'EUR 55,000', '2023-07-07', 0),
(2, 14, 2, 3, 4, 'Network Administrator', 'We are seeking a skilled Network Administrator to join our IT team and ensure the smooth operation of our network infrastructure. As a Network Administrator, you will be responsible for configuring and maintaining network devices, troubleshooting network issues, and implementing security measures. Your main tasks will include monitoring network performance, managing network access, and conducting regular network audits. We are looking for a candidate with a strong understanding of network protocols, experience with network administration tools, and knowledge of network security best practices. Join our team and help us maintain a secure and efficient network.', '• Strong understanding of network protocols and technologies\n• Experience with network administration tools (e.g., Cisco, Juniper)\n• Knowledge of network security best practices\n• Familiarity with firewall and VPN configurations\n• Excellent problem-solving and troubleshooting skills\n• Relevant certifications (e.g., CCNA, Network+) are a plus', 'Presentiel', 'EUR 60,000', '2023-07-10', 0),
(3, 15, 7, 1, 3, 'DevOps Engineer', 'Join our team as a DevOps Engineer and contribute to the development and deployment of scalable and reliable software solutions. As a DevOps Engineer, you will be responsible for automating deployment processes, configuring and managing infrastructure, and implementing continuous integration and delivery pipelines. Your main tasks will include infrastructure as code, containerization, and monitoring system performance. We are looking for a candidate with a strong background in software development and operations, proficiency in scripting languages such as Bash or Python, and experience with DevOps tools such as Docker and Kubernetes. Join our team and streamline our software development lifecycle.', '• Strong background in software development and operations\n• Proficiency in scripting languages (e.g., Bash, Python)\n• Experience with DevOps tools (e.g., Docker, Kubernetes)\n• Knowledge of infrastructure as code principles\n• Familiarity with continuous integration and delivery\n• Strong problem-solving and troubleshooting skills', 'Teletravail', 'EUR 65,000', '2023-07-12', 0),
(4, 16, 6, 2, 5, 'Database Administrator', 'We are seeking a skilled Database Administrator to join our team and ensure the performance, availability, and security of our databases. As a Database Administrator, you will be responsible for database design, optimization, and backup and recovery strategies. Your main tasks will include monitoring database performance, resolving issues, and implementing data security measures. We are looking for a candidate with a strong understanding of database management systems, experience with SQL and NoSQL databases, and knowledge of database administration tools. Join our team and manage our critical data assets.', '• Strong understanding of database management systems\n• Proficiency in SQL and experience with NoSQL databases\n• Knowledge of database administration tools (e.g., Oracle, MySQL)\n• Experience with database design and optimization\n• Familiarity with backup and recovery strategies\n• Strong problem-solving and analytical skills\n• Relevant certifications (e.g., Oracle Certified Professional) are a plus', 'Presentiel', 'EUR 70,000', '2023-07-14', 0),
(5, 17, 2, 4, 2, 'IT Project Manager', 'Join our team as an IT Project Manager and lead the successful execution of IT projects within our organization. As an IT Project Manager, you will be responsible for project planning, resource allocation, and project delivery. Your main tasks will include defining project objectives, managing project timelines and budgets, and coordinating with cross-functional teams. We are looking for a candidate with strong project management skills, excellent communication and leadership abilities, and a solid understanding of IT infrastructure and systems. Join our organization and drive the successful implementation of IT initiatives.', '• Strong project management skills and experience\n• Excellent communication and leadership abilities\n• Knowledge of IT infrastructure and systems\n• Ability to manage project timelines and budgets\n• Familiarity with project management methodologies\n• Strong problem-solving and decision-making abilities\n• Relevant certifications (e.g., PMP) are a plus', 'Teletravail', 'EUR 80,000', '2023-07-16', 0),
(1, 18, 8, 1, 1, 'Business Analyst', 'We are seeking a talented Business Analyst to join our team and contribute to the development of business strategies and solutions. As a Business Analyst, you will be responsible for gathering and analyzing business requirements, identifying process improvements, and recommending solutions to optimize business operations. Your main tasks will include conducting stakeholder interviews, documenting requirements, and facilitating communication between business and technical teams. We are looking for a candidate with strong analytical and problem-solving skills, excellent communication abilities, and a solid understandingof business analysis techniques and methodologies. Join our team and drive the success of our business initiatives.', '• Strong analytical and problem-solving skills\n• Excellent communication and facilitation abilities\n• Knowledge of business analysis techniques and methodologies\n• Experience with requirement gathering and documentation\n• Ability to bridge the gap between business and technical teams\n• Familiarity with process improvement and optimization\n• Strong attention to detail and organizational skills', 'Presentiel', 'EUR 60,000', '2023-07-18', 0),
(2, 19, 5, 3, 4, 'Software Quality Assurance Engineer', 'Join our team as a Software Quality Assurance Engineer and contribute to the development of high-quality software products. As a Software Quality Assurance Engineer, you will be responsible for designing and executing test plans, identifying and reporting defects, and ensuring the overall product quality. Your main tasks will include test case development, regression testing, and collaborating with developers to resolve issues. We are looking for a candidate with a strong attention to detail, knowledge of software testing methodologies, and experience with testing tools and frameworks. Join our team and ensure the delivery of reliable software solutions.', '• Strong attention to detail and quality-oriented mindset\n• Knowledge of software testing methodologies and best practices\n• Experience with test case development and execution\n• Familiarity with testing tools and frameworks (e.g., Selenium, JUnit)\n• Strong problem-solving and debugging skills\n• Excellent communication and collaboration abilities', 'Teletravail', 'EUR 55,000', '2023-07-20', 0),
(3, 20, 4, 4, 2, 'IT Consultant', 'Join our team as an IT Consultant and provide strategic guidance and technical expertise to our clients. As an IT Consultant, you will be responsible for assessing client needs, designing IT solutions, and managing the implementation process. Your main tasks will include conducting technology assessments, developing IT strategies, and recommending improvements to optimize client operations. We are looking for a candidate with strong problem-solving and communication skills, knowledge of IT infrastructure and systems, and experience with client-facing roles. Join our consultancy team and make a significant impact in our clients'' success.', '• Strong problem-solving and analytical skills\n• Excellent communication and presentation abilities\n• Knowledge of IT infrastructure and systems\n• Experience with technology assessments and IT strategy development\n• Ability to manage client relationships and expectations\n• Strong project management and organizational skills\n• Relevant certifications (e.g., ITIL, CompTIA) are a plus', 'Presentiel', 'EUR 70,000', '2023-07-22', 0);



INSERT INTO application (candidate_id, job_posting_id, date, status)
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

  INSERT INTO job_category (category)
VALUES
('Développeur Web Front-End'),
('Développeur Web Back-End'),
('Développeur Web Full-Stack'),
('Développeur Mobile'),
('Développeur jeux vidéos'),
('DevOps'),
('Chef de projet'),
('Scrum Master'),
('Product Owner'),
('Lead dev'),
('Data Scientist'),
('Data Engineer'),
('Ingénieur cybersécurité'),
('Architecte IT'),
('Chief Technical Officer'),
('Ingénieur IA'),
('Business Analyst'),
('Spécialiste Cloud'),
('UX/UI Designer'),
('Administrateur systèmes et réseaux');

  INSERT INTO job_type (type)
VALUES
('CDI'),
('CDD'),
('Freelance'),
('Alternance'),
('Stage'),
('Intérim');

  INSERT INTO job_location (location)
VALUES
('Paris'),
('Lyon'),
('Marseille'),
('Lille'),
('Reims'),
('Monptellier'),
('Toulouse'),
('Metz'),
('Nantes'),
('Rennes'),
('Strasbourg'),
('Nice'),
('Saint-Etienne'),
('Bordeaux');

SET foreign_key_checks = 1;