# Ticket Management System

A full-stack role-based ticket management system built with the MERN stack.

## Live Links

- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-api.onrender.com
- **GitHub:** https://github.com/yourusername/qtechy-ticket-system

## Test Credentials

| Role  | Email            | Password  |
| ----- | ---------------- | --------- |
| Admin | admin@qtechy.com | Admin@123 |
| Agent | agent@qtechy.com | Agent@123 |
| User  | user@qtechy.com  | User@123  |

## Tech Stack

- **Frontend:** React, Redux Toolkit, Axios, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (frontend), Render (backend)

## Features

- Role-based access control (Admin, Agent, User)
- JWT authentication with protected routes
- Ticket creation, listing, filtering, sorting, pagination
- Ticket status updates with history tracking
- Ticket assignment to agents
- Comment system on tickets
- Dashboard with statistics and category breakdown
- User management (admin only)

## Local Setup

### Prerequisites

- Node.js v18+
- MongoDB Atlas account

### Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

## API Summary

| Method | Endpoint                  | Access       | Description        |
| ------ | ------------------------- | ------------ | ------------------ |
| POST   | /api/auth/register        | Public       | Register user      |
| POST   | /api/auth/login           | Public       | Login              |
| GET    | /api/auth/me              | Auth         | Get current user   |
| GET    | /api/tickets              | Auth         | List tickets       |
| POST   | /api/tickets              | Auth         | Create ticket      |
| GET    | /api/tickets/:id          | Auth         | Get ticket         |
| PUT    | /api/tickets/:id          | Auth         | Update ticket      |
| DELETE | /api/tickets/:id          | Admin        | Delete ticket      |
| PATCH  | /api/tickets/:id/status   | Admin, Agent | Update status      |
| PATCH  | /api/tickets/:id/assign   | Admin        | Assign ticket      |
| POST   | /api/tickets/:id/comments | Auth         | Add comment        |
| GET    | /api/users                | Admin        | List users         |
| GET    | /api/users/agents         | Admin        | List agents        |
| PATCH  | /api/users/:id/status     | Admin        | Toggle user status |
| GET    | /api/dashboard            | Auth         | Get stats          |

## Environment Variables

### Backend

| Variable     | Description                     |
| ------------ | ------------------------------- |
| PORT         | Server port (5000)              |
| MONGO_URI    | MongoDB Atlas connection string |
| JWT_SECRET   | Secret key for JWT signing      |
| FRONTEND_URL | Deployed frontend URL for CORS  |

### Frontend

| Variable     | Description          |
| ------------ | -------------------- |
| VITE_API_URL | Backend API base URL |

## Folder Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # Axios API files
│   │   ├── app/            # Redux store and slices
│   │   ├── components/     # Reusable components
│   │   └── pages/          # Page components
└── server/                 # Node.js backend
    ├── config/             # Database config
    ├── controllers/        # Request handlers
    ├── middleware/         # Auth and error middleware
    ├── models/             # Mongoose models
    ├── routes/             # Express routes
    ├── services/           # Business logic
    └── utils/              # Helper functions
```
