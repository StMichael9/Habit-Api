# Habit API

Backend-only REST API built with **Node.js, Express, PostgreSQL, and Drizzle ORM**.  
Focuses on authentication/authorization, database modeling, validation, and clean API structure.

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Drizzle ORM
- drizzle-zod / Zod (validation schemas)
- JWT (auth)
- bcrypt (password hashing)
- dotenv (environment variables)

---

## Features

- User registration with hashed passwords
- User login with JWT authentication
- Protected routes
- Request validation
- Database schema + migrations via Drizzle
- REST-style routing
- Centralized error handling

---

## Requirements

- Node.js (LTS recommended)
- A running PostgreSQL instance (local or hosted)

---

## Setup

1. **Clone the repository**
2. **Install dependencies**
   ````bash
   npm install
3. Create .env file set your values
   ```
   DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DBNAME
   JWT_SECRET=some-long-random-string

4. Apply database schema
   ```
   Push schema
   npm run db:push

5. (Optional) Seed database
      ```
      npm run db:seed

6. Start the API
   ```
   npm run dev
   


