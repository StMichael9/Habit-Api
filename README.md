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
