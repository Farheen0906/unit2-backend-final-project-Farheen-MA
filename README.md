HomeCookeD 🍲

HomeCookeD is a full-stack home-cooked meal ordering application.
Customers can browse a real, database-backed menu, filter dishes by category, add items to a cart, and place an order with delivery details.
Once an order is placed, customers can view a detailed confirmation, update their special requests, or cancel the order entirely
 — all backed by a real MySQL database through a Java Spring Boot REST API.

 The project began in Unit 1 as a React frontend with hardcoded sample data, and was extended in Unit 2 with a complete backend,
 turning it into a genuine full-stack application.

Technologies Used:

Frontend:
React (functional components + hooks)
Vite
React Router

Backend:
Java
Spring Boot
Spring Web (REST controllers)
Spring Data JPA / Hibernate

Database:
MySQL
MySQL Workbench

Tools:
IntelliJ IDEA
Visual studio code
Postman (API testing)
Git & GitHub


********Installation — Running This Project Locally************

Prerequisites:
Java JDK 21
Node.js and npm
MySQL Server + MySQL Workbench
Visual studio code(for the frontend)
IntelliJ IDEA (for the backend)


1. Clone the repository:
git clone https://github.com/Farheen0906/unit2-backend-final-project-Farheen-MA.git

2. Set up the database:

Open MySQL Workbench and run:

CREATE DATABASE homecooked_db;

3. Configure environment variables:

The backend reads database credentials from environment variables rather than hardcoded values.
In IntelliJ, set up a Run Configuration for BackendApplication with these environment variables:
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

4. Run the backend:
Open the backend folder in IntelliJ and run BackendApplication.java.
On first run, Hibernate will automatically create all necessary tables.
The API will be available at http://localhost:8080.

To populate the menu with sample data, run Meal.sql in MySQL Workbench against homecooked_db.

5. Run the frontend :
cd frontend
npm install
npm run dev
The application will be available at http://localhost:5173.

6. Access the application:

With both the backend and frontend running (and MySQL active in the background)
open http://localhost:5173 in the browser.

Wireframes:
https://docs.google.com/document/d/1tPM47n3S7OK7l5sj7oQaNQgulBPKsdJKf0m9QpHxeAw/edit?usp=sharing

Entity Relationship Diagram:
https://docs.google.com/document/d/1maoKlocckox_M7gQnwgrFnF13XzR42_Qfu7FBZpctqk/edit?usp=sharing

The database consists of 5 tables: User, Meal, Orders, OrderItem, and ContactRequest.

Unsolved Problems & Future Features:

1.Single-chef design: The app currently assumes one home cook managing the whole menu (chefId is hardcoded).
Supporting multiple independent chefs would require meaningful changes to how meals and orders are filtered and displayed.

2.No image upload: Meal images are stored as external URLs rather than uploaded files,
 so there's no way for a chef to upload their own photos directly through the app yet.

3.Authentication is not yet implemented: There is no login page in the current version.
 every order is saved under a placeholder customer ID rather than a real logged-in user.
 A backend login endpoint exists, but it is not yet connected to the frontend.

4.Chef meal management dashboard: Once authentication exists, a logged-in home chef should have their
own dashboard to add, edit, and delete their meals directly through the UI, rather than the menu being populated manually through Postman or a SQL script as it is now.
 his would give chefs real ownership over their own listings instead of a single hardcoded menu.

5.Customer order history: Once authentication exists, a logged-in customer should be able to see a list of their own past orders tied to their account,
rather than only being able to view a single order right after placing it. This would let customers track repeat orders over time instead of losing that information the moment they navigate away.

