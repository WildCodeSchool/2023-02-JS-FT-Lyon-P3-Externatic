SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user, candidate, company, job_posting, application, job_category, job_type, job_location;

USE db_externatic;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(50),
  city VARCHAR(100),
  picture BLOB,
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
  cv BLOB,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
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
  FOREIGN KEY (candidate_id) REFERENCES candidate(id),
  FOREIGN KEY (job_posting_id) REFERENCES job_posting(id)
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

  INSERT INTO job_posting (company_id, user_id, job_category_id, job_type_id, job_location_id, title, description, requirements, remote, salary, posting_date, archived)
VALUES 
(1, 1, 1, 1, 1, 'Développeur Front-End', 'Ce que tu peux attendre de nous : Des environnements de travail de qualité, où les projets sont dimensionnés et drivés en feature Team (être bien entouré pour performer !) Un enrichissement quotidien grâce à la mutualisation de compétences au sein de la Communauté Front-end et même à l’échelle des 11 expertises d’Atecna. Nous t’accompagnons dans tes réussites techniques au travers de Formations, Meet-up, Conférences… Nous écrivons ensemble ton projet professionnel en fonction de tes envies : une évolution vers une expertise technique, une opportunité de manager, un souhait de porter également un rôle de lead tech, … Les atouts du package Atecna : un salaire fixe et une participation à l’intéressement de l’entreprise. Un périmètre de déplacement réduit (métropole lilloise proche) et de la souplesse dans ton organisation de travail (télétravail partiel possible, horaires adaptés…)', 'Ce que nous attendons de toi : • Être opérationnel sur du Javascript natif et au moins 1 Frameworks JS majeur pour te positionner en tant que référent Front-end auprès de nos clients et leurs équipes. • Être capable de prendre de la hauteur de vue sur les enjeux clients / projets / architecture et apporter ton expérience pour cerner au mieux les attentes des utilisateurs. Des convictions en matière d’expérience utilisateur ? On aime ! • Apporter ton expertise métier et tes connaissances techniques à ton équipe.

Travailler en mode versioning : › Code review en équipe + pilotage agile › Tests unitaires et fonctionnels › Code quality › CI/CD', 'Teletravail', 'EUR 52,000', '2023-06-21', 0),
(2, 2, 1, 1, 2, 'Développeur Web Front-End', 'Nous recherchons un développeur Front-End talentueux pour rejoindre notre équipe de développement. Vous serez responsable de la conception et de la mise en œuvre des interfaces utilisateur attrayantes et réactives pour nos applications web. Vos principales tâches incluront la création de maquettes, le développement de composants réutilisables, l''intégration avec les API et la collaboration avec l''équipe de conception. Nous sommes à la recherche d''un développeur passionné et expérimenté pour rejoindre notre équipe dynamique en tant que développeur Full Stack. Vous serez responsable de la conception, du développement et de la maintenance de nos applications web. En collaborant avec notre équipe multidisciplinaire, vous contribuerez à la création d''expériences utilisateur exceptionnelles. Vos principales responsabilités incluront la création de fonctionnalités innovantes, la résolution de problèmes techniques complexes et l''amélioration des performances des applications. Vous devrez maîtriser les langages de programmation tels que JavaScript, HTML et CSS, ainsi que les frameworks tels que React, Angular ou Vue.js. Nous recherchons un candidat ayant une solide expérience en développement web, une bonne compréhension des principes de conception et une passion pour les nouvelles technologies. Vous devrez être autonome, créatif et capable de travailler efficacement en équipe. Si vous souhaitez rejoindre une entreprise en pleine croissance, offrant un environnement de travail stimulant et des opportunités d''évolution, nous serions ravis de discuter avec vous. Rejoignez-nous dès aujourd''hui et participez à la création de produits innovants qui auront un impact réel sur la vie des utilisateurs.', '• Maîtrise de HTML, CSS et JavaScript\n• Expérience avec les frameworks Front-End (par exemple, React, Angular, Vue.js)\n• Connaissance des principes et des meilleures pratiques en matière d''interface utilisateur (UI) et d''expérience utilisateur (UX)', 'Télétravail', '60 000 EUR', '2023-06-23', 0),
(3, 3, 1, 2, 2, 'Développeur Front-End JS', 'Rejoignez notre équipe en tant que développeur Front-End et participez à la création d''interfaces utilisateur exceptionnelles pour nos applications web. Vous serez responsable de la traduction des maquettes graphiques en code HTML, CSS et JavaScript de haute qualité. Maîtrisant les dernières technologies Front-End telles que React, Angular et Vue.js, vous travaillerez en étroite collaboration avec les concepteurs et les développeurs Back-End pour offrir des expériences utilisateur fluides et attrayantes. Si vous êtes passionné par le développement Front-End, que vous aimez résoudre des problèmes complexes et que vous souhaitez contribuer à des projets innovants, rejoignez notre équipe dynamique.', '• Plus de 5 ans d''expérience en développement Front-End\n• Maîtrise approfondie de HTML, CSS et JavaScript\n• Capacité à résoudre des problèmes et à travailler en équipe', 'Presentiel', '80 000 EUR', '2023-06-23', 0),
(4, 4, 1, 1, 5, 'Développeur Web Front-End', 'Nous sommes à la recherche d''un développeur Front-End senior pour rejoindre notre équipe de développement. Dans ce rôle, vous serez responsable de la création d''interfaces utilisateur réactives et conviviales en utilisant les dernières technologies Front-End. Vous devrez maîtriser les langages HTML, CSS et JavaScript, ainsi que les frameworks tels que React, Angular ou Vue.js. En tant que membre clé de l''équipe, vous travaillerez en étroite collaboration avec les concepteurs et les développeurs Back-End pour créer des applications web innovantes. Rejoignez-nous si vous êtes passionné par le développement Front-End, avez une solide expérience dans le domaine et souhaitez contribuer à des projets stimulants.', '• Excellente maîtrise de JavaScript, HTML et CSS\n• Expérience avec les frameworks Front-End tels que React, Angular ou Vue.js\n• Connaissance des principes de conception web et des bonnes pratiques de développement\n• Capacité à résoudre des problèmes complexes et à travailler de manière autonome\n• Bonnes compétences en communication', 'Télétravail', '70 000 EUR', '2023-06-23', 0),
(5, 5, 1, 1, 6, 'Développeur Web Front-End', 'Rejoignez notre équipe en tant que développeur Front-End expérimenté et contribuez à la création d''interfaces utilisateur de qualité pour nos applications web. Dans ce rôle, vous serez responsable du développement de fonctionnalités Front-End, de l''optimisation des performances et de la résolution des problèmes techniques. Vous devrez maîtriser les langages HTML, CSS et JavaScript, ainsi que les frameworks tels que React, Angular ou Vue.js. Si vous avez une solide expérience en développement web, un souci du détail et une passion pour l''amélioration continue, ce poste est fait pour vous.', '• Solide expérience en développement Front-End\n• Maîtrise des technologies Front-End telles que HTML, CSS, JavaScript et les frameworks associés\n• Connaissance approfondie des principes de conception UX/UI\n• Expérience dans la création de wireframes et de maquettes interactives\n• Capacité à travailler en équipe et à collaborer avec des designers','Hybride', '65 000 EUR', '2023-06-23', 0),
(6, 6, 1, 4, 9, 'Développeur Web Front-End', 'Nous recherchons un développeur Front-End créatif pour rejoindre notre équipe passionnée. En tant que développeur Front-End, vous aurez l''opportunité de participer à des projets innovants et de créer des interfaces utilisateur uniques. Vous devrez maîtriser les langages HTML, CSS et JavaScript, ainsi que les frameworks Front-End tels que React, Angular ou Vue.js. Si vous êtes passionné par l''art de la programmation, que vous avez un sens esthétique développé et que vous souhaitez contribuer à des projets qui repoussent les limites, rejoignez-nous et apportez votre créativité au développement web.', '• Solide expérience en développement Front-End pour des plateformes e-commerce\n• Maîtrise des langages et des technologies Front-End tels que HTML, CSS, JavaScript, jQuery\n• Connaissance des frameworks e-commerce (par exemple, Magento, Shopify)\n• Capacité à intégrer des API et à collaborer avec des développeurs back-end\n• Bonne compréhension des enjeux de sécurité et des meilleures pratiques en matière de performance', 'Hybride','50 000 EUR', '2023-06-23', 0),
(7, 7, 1, 4, 9, 'Alternance Développeur Front-End', 'Nous recherchons un développeur Front-End Junior en alternance motivé pour rejoindre notre équipe. Vous aurez l''opportunité d''apprendre et de développer vos compétences en travaillant sur des projets concrets. Sous la supervision de notre équipe expérimentée, vous participerez à la création et à la maintenance d''interfaces utilisateur attrayantes et réactives pour nos applications web. Vous serez impliqué dans toutes les phases du cycle de développement, de la conception des maquettes à l''intégration du code. Vous devrez maîtriser les langages HTML, CSS et JavaScript, ainsi que les principes de base de l''UI/UX. Votre capacité à apprendre rapidement et à vous adapter aux nouvelles technologies sera un atout essentiel. Vous travaillerez en étroite collaboration avec notre équipe de développeurs expérimentés, qui vous guidera tout au long de votre parcours d''apprentissage. Ce poste en alternance offre une excellente opportunité d''acquérir une expérience pratique dans le domaine du développement web et de travailler sur des projets réels. Si vous êtes passionné par le développement Front-End, que vous souhaitez élargir vos connaissances et que vous êtes prêt à relever de nouveaux défis, rejoignez notre équipe dès aujourd''hui.', '• Connaissance de base en HTML, CSS et JavaScript\n• Intérêt pour les technologies Front-End\n• Capacité à apprendre rapidement et à s''adapter\n• Aptitude à travailler en équipe et à suivre les directives\n• Bonnes compétences en résolution de problèmes', 'Presentiel', '35 000 EUR', '2023-06-23', 0),
(8, 8, 4, 3, 10, 'Développeur Mobile', 'Nous recherchons un développeur mobile talentueux et polyvalent pour rejoindre notre équipe de développement. En tant que développeur mobile, vous serez responsable de la conception, du développement et de la maintenance d''applications mobiles pour les plateformes iOS et Android. Vous travaillerez en étroite collaboration avec les concepteurs d''interfaces utilisateur et les développeurs back-end pour créer des expériences utilisateur fluides et attrayantes. Vos principales tâches incluront la traduction des spécifications fonctionnelles en code, l''intégration avec les API, les tests et le déploiement des applications. Vous devrez maîtriser les langages de programmation spécifiques à chaque plateforme (Objective-C/Swift pour iOS, Java/Kotlin pour Android) ainsi que les frameworks et outils de développement associés. Une connaissance approfondie des bonnes pratiques en matière de conception mobile, de performance et de sécurité est essentielle pour ce poste. Si vous êtes passionné par le développement mobile, que vous aimez relever les défis techniques et que vous souhaitez contribuer à la création d''applications mobiles de qualité, rejoignez notre équipe dynamique dès aujourd''hui.', '• Solide expérience dans le développement d''applications mobiles Front-End\n• Maîtrise de HTML, CSS et JavaScript\n• Expertise avec les frameworks Front-End mobiles tels que React Native ou Flutter\n• Connaissance des bonnes pratiques de conception mobile\n• Capacité à travailler en équipe agile\n• Excellentes compétences en résolution de problèmes','Télétravail', 'Salaire compétitif', '2023-06-23', 0);



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