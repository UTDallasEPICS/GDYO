# GDY-CMI-Scheduling Conceptual Overview
The goal of this project is to have an Android + IOS app (used by admins, instructors, students, and family) that solves the following (4) main issues for The Greater Dallas Youth Orchestra (GDYO): 
* Attendance
    * Concerts/volunteer/practice/class
* Calendar
    * push-notification
    * reminders
    * newsletter
    * Concert/volunteer/practice/class schedules
* Volunteer tracking & scheduling (sign-up / check-in)
* T-shirt/tickets/ect. payment/form/fees tracking & management
<br><br/>

# Functional Requirements
## Users
There are 5 types of user roles
* Users are most likely invite only
* Users are authenticated via Atuh0
* Users receive invitation emails via AWS SES

Each user role has the following permissions:

### User Levels
* C-reate
* R-ead
* W-rite
* D-elete

### Admin
* User info: CRWD
* Master Class Schedule: CRWD
* Practice Schedule: CRWD
* Directory: CRWD

### Staff
* User info: CRWD
* Master Class Schedule: CRWD
* Practice Schedule: CRWD
* Directory: CRWD

### Instructors
* User info: RW
* Master Class Schedule: CRWD
* Practice Schedule: CRWD
* Directory: R
### Parents / Family
* User info: R
* Master Class Schedule: R
* Practice Schedule: R
* Directory: R

### Students
* User info: R
* Master Class Schedule: R
* Practice Schedule: R
* Directory: R
<br><br/>

## Pages
* Splash Page
* Login and Registraton Page
* User Preference
    1. Name
    2. Login Name
    3. Password
    4. Email
    5. Phone
    6. Address
    7. Photo
    8. User Level
    9. Security
* Status
    * Table of Status
        1. Master Class
            * Team Members
            * Instructor
        2. Practice Team
            * Team Members
            * Location
            * Time
        3. Concert
            * Volunteer
            * Hour
            * Signup
    * Activities
        1. Master Class
            * Class Schedule
            * Attendance
        2. Practice
            * Practice Schedule
            * Attendance
        3. Concert
            * Concert Schedule
            * Attendance
        4. Volunteer
            * Information
            * Sign-up
            * Check-in
* Directory
    1. Staff
    2. Parents
        * Name
        * Phone
        * Address
        * Email
        * Students
    3. Students
        * Name
        * Phone
        * Address
        * Email
        * Parents

## Tech Stack
* React Native
* Express JS
* Node.js
* Prisma
* Postgres
* Auth0

## Research Questions
* None

## Third Party Integrations
* Auth0 for authentication
* Stripe for payments
* AWS SES for emails

## Deployment 
* AWS EC2

## Links
* Link to Figma Page (viewing access only): https://www.figma.com/file/FH3uXXYsg6KynXAb3wrSLe/GDYO-App-(Copy)?type=design&node-id=114%3A1196&mode=design&t=f6jgjdkGvA1F9NV4-1