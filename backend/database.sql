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
  ('user12@example.com', '888845668', 'City12', "https://xsgames.co/randomusers/avatar.php?g=pixel", '$argon2id$v=19$m=19456,t=2,p=1$vvakCosUkyOkLzeryb3Ahg$8mfwLBB4Wqv7sDLSoRDSuKqADfnC/cSVo8wHvOnLdLI', 0);
  
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
  (24, 'Travel Adventures', 'Liam Roberts', 'A travel agency organizing unique and memorable travel experiences', 'www.traveladventures.com');

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
(1, 1, 9, 1, 1, 'Product Owner', 'We are seeking a talented Product Owner to join our team. As a Product Owner, you will be responsible for defining and prioritizing product features, gathering requirements, and collaborating with cross-functional teams to ensure successful product delivery. Your main tasks will include creating and maintaining the product backlog, conducting user research, and working closely with stakeholders to understand their needs. We are looking for a candidate with excellent communication and leadership skills, strong analytical abilities, and a deep understanding of agile methodologies. Join our dynamic team and contribute to the development of innovative products.', '• Previous experience as a Product Owner or similar role\n• Strong understanding of agile methodologies and product management practices\n• Excellent communication and collaboration skills\n• Analytical mindset and problem-solving abilities\n• Knowledge of user research techniques\n• Experience with project management tools', 'Teletravail', 'EUR 80,000', '2023-06-21', 0);



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