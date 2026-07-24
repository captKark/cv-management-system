# CV Management System

A full-stack CV Management System developed as part of the iTransition Front-end Internship project.

The application allows recruiters to manage job positions, maintain an attribute library, generate CV templates automatically from positions, and edit candidate information through a secure role-based system.

---

## Live Demo

Frontend:
https://cv-management-system-u1af.vercel.app/login

Backend API:
https://cv-management-api.onrender.com

---

## Test Account

Administrator

Email:
admin@test.com

Password:
admin123

---

## Features

### Authentication

- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Persistent Login

### Dashboard

- Position statistics
- CV statistics
- Recently created positions
- Recently created CVs

### Position Management

- Create Position
- Edit Position
- Delete Position
- Duplicate Position
- Search
- Department Filter
- Pagination

### Attribute Library

- Create Attribute
- Edit Attribute
- Delete Attribute
- Category Filter
- Search
- Pagination

### Position Templates

- Assign Attributes to Positions
- View Assigned Attributes

### CV Management

- Create CV
- Edit CV
- Delete CV
- Automatic Attribute Generation from Position Templates
- Edit Generated Attribute Values

---

## Technologies

### Frontend

- React
- React Router
- Bootstrap 5
- Bootstrap Icons
- Vite

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### Authentication

- JWT

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL (Render)

---

## Project Structure

```
frontend/
backend/

```

---

## Installation

### Clone

```bash
git clone https://github.com/captKark/cv-management-system.git
```

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Author

Mohammad Munzurul Haque

iTransition Front-end Internship Project