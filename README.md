# Workout Buddy - Full-Stack Fitness Tracker

Workout Buddy is a scaling, MERN stack (MongoDB, Express.js, React, Node.js) web application designed to help users securely log, search, paginate, and track their workout metrics over time with interactive data visualizations.

---

## Features

### Core Mechanics (Tutorial Foundation)
* **Secure Authentication:** Implementation of stateless user authentication using JSON Web Tokens (JWT) and encrypted password hashing via `bcrypt`.
* **Complete CRUD REST API:** Full Model-View-Controller (MVC) architecture supporting secure Create, Read, Update, and Delete operations for workout logs.
* **Global State Management:** Structured with React Context (`AuthContext` and `WorkoutContext`) to broadcast state changes across all frontend components without prop-drilling.
* **Custom React Hooks:** Network requests and async operations cleanly isolated within clean custom hooks (`useLogin`, `useSignup`, `useLogout`).

### Advanced Engineering Upgrades (Built Independently)
* **Server-Side Search & Pagination:** Avoided frontend-heavy processing by engineering a programmatic query engine on the backend using MongoDB `$regex`. Coupled with `.skip()` and `.limit()` parameters, the Node server optimizes resource loads by only fetching 6 workouts at a time.
* **Synchronized `countDocuments()` Logic:** Solved an order-of-operations bug by calculating total matching records *after* applying dynamic user search filters, ensuring frontend pagination components remain perfectly synchronized.
* **Database-Layer Aggregations:** Utilized multi-stage MongoDB Aggregation Pipelines (`$match`, `$count`) to process user metrics internally on the database layer, significantly reducing server RAM footprint and processing overhead.
* **Visual Analytics Dashboard:** Integrated real-time graphing elements on the user Profile screen to aggregate raw fitness statistics into intuitive chart graphics.

---

## Tech Stack

* **Frontend:** React (v19), React Router DOM (v7), Date-fns, Chart components
* **Backend:** Node.js, Express.js (MVC Pattern)
* **Database:** MongoDB, Mongoose ODM
* **Security & Auth:** JSON Web Tokens (JWT), Custom Express Middleware

---
