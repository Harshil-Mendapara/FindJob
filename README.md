Overview

This job portal website is built with Node.js, Sequelize, MySQL, and Express for the backend, and EJS, HTML, and CSS for the frontend. The application provides role-based access for candidates, recruiters, and admins. Each role has specific functionalities, ensuring a tailored experience for different types of users.

Features

Role-Based Access

Candidate:

● Register/Login: Candidates can register and log in to the portal.                                                                                                                                                  
● Apply for Jobs: Candidates can browse available jobs and apply for them.                                                                                                                                           
● View Job Descriptions: Candidates can view detailed job descriptions.
● Manage Profile: Candidates can access their dashboard to manage their profile details.
● Track Applications: Candidates can see a list of jobs they have applied for.

Recruiter:

● Register/Login: Recruiters can register and log in to the portal.
● Create Jobs: Recruiters can create job listings with detailed descriptions.
● Update/Delete Jobs: Recruiters can update or delete job listings they have created.
● Manage Applications: Recruiters can view applications submitted by candidates for the jobs they created.
● Change Application Status: Recruiters can update the status of a candidate’s job application.
● Download Resumes: Recruiters can download the resumes/CVs uploaded by candidates during job application.

Admin:

● Register/Login: Admins can register and log in to the portal.
● Manage Users: Admins can view and manage users who have registered as candidates, recruiters, or admins.
● Change User Roles: Admins have the ability to change the role of any user.                                                                                                                                         
● Delete Users: Admins can delete users from the system.                                                                                                                                                             
● Track Registrations: Admins can see statistics on how many users have registered under each role (candidate, recruiter, admin).                                                                                    


Technology Stack
● Backend: Node.js, Express.js                                                                                                                                                                                       
● Database: MySQL with Sequelize ORM
● Frontend: EJS, HTML, CSS

The application uses session-based authentication to secure user sessions and ensure that only authorized users can access specific functionalities based on their roles.

Installation:

1. Clone the repository:
   ● https://github.com/Harshil-Mendapara/FindJob.git

2. Install dependencies:
   ● cd FindJob
   ● npm i

3. Set up the database:
   ● Create a MySQL database.
   ● Update the database configuration in config/config.json.

4. Start the server:
   ● npm start

The application will be available at http://localhost:3000.
