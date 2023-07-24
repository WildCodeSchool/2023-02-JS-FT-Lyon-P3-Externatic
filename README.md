
## Externatic - Project README


## Introduction

Welcome to Externatic! This is an application that serves as a web and mobile platform for candidates, employers, and administrators, complementing and supporting the recruitment expertise of our consultants. The primary goal of Externatic is to connect job seekers and employers efficiently, providing seamless job sharing and allowing candidates to upload their resumes.

## Project Description

Externatic is designed as a marketplace platform that caters to different levels of users, including companies, job seekers (candidates), and administrators. It is linked to the Externatic.fr website and integrated with our ATS (Applicant Tracking System), currently powered by CareerBuilder.

## Features

Externatic offers the following key features:

1. **Company Access**: Employers can create accounts and access the platform to post job offers.
2. **Candidate Access**: Job seekers can sign up, browse job listings, and apply to relevant positions. They can also upload their resumes to increase visibility to potential employers.
3. **Administrator Access**: Administrators have privileged access to manage the platform, user accounts, and oversee the smooth functioning of the application.
4. **Job Sharing**: Employers can share their job listings on the platform for potential candidates to discover.
5. **Resume Upload**: Candidates can upload their resumes, making it easier for employers to find suitable matches.


## User Roles

Externatic distinguishes three main user roles:

1. **Admin**: Administrators have complete control over the platform. They can manage user accounts, review job postings, and ensure the platform's security and integrity.
2. **Candidate**: Candidates are job seekers who can browse job listings, apply to vacancies, and upload their resumes to increase their chances of being hired.
3. **Company**: Companies or employers can access the platform to post job offers and review applications from potential candidates.

## Database Model

The database is a crucial component of Externatic, and careful attention has been given to its design. The database model includes tables for users (admin, candidate, company), job listings, candidate applications, consultant-candidate mappings (bonus feature), and other relevant entities.

## Installation

To run Externatic locally, follow these steps:


1. In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
2. Clone the repository from GitHub
3. Navigate to the project directory.
4. Install the required dependencies by running: `npm install` or `yarn install`.
5. If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
6. Run command `npm install` in frontend and backend
7. _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_
8. Do NPM run migrate
9. Launch npm run dev


## Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)


## Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated


## Usage
Once the application is up and running, users can access it through their web browsers or mobile devices. Admins can log in to the admin panel to manage users and monitor the platform's activity. Companies can create accounts and post job listings, while candidates can browse available positions, apply, and upload their resumes.



## License

Externatic is licensed under the [MIT License](LICENSE), allowing for open-source contributions and usage.

---

Thank you for choosing Externatic! We hope this application facilitates seamless connections between job seekers and employers, transforming the recruitment experience. If you encounter any issues or have questions, please don't hesitate to reach out to us. Happy recruiting!
