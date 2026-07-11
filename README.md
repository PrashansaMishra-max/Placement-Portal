# Placement Portal

A full-stack Placement Portal that connects students with recruiters through a streamlined recruitment system. Students can create profiles, upload resumes, and apply for job opportunities — all in one place.

🔗 **Live Demo:** [placement-portal-sxeu.vercel.app](https://placement-portal-sxeu.vercel.app/)



## Features

- 🔐 Role-based authentication (Students / Recruiters / Admin)
- 👤 Student profile creation and management
- 📄 Resume upload and storage
- 💼 Job posting by recruiters
- 📝 Job application system for students
- 📊 Application tracking and status updates



## Tech Stack

**Frontend**
- React
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Deployment**
- Frontend: Vercel
- Backend: Render



## Project Structure
Placement-Portal/
─ frontend/     # React client application
─ server/       # Node.js + Express backend, REST APIs, MongoDB models
─ .gitignore
─ README.md


## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local instance or MongoDB Atlas connection string)

### 1. Clone the repository
bash
git clone https://github.com/PrashansaMishra-max/Placement-Portal.git
cd Placement-Portal


### 2. Setup the backend
bash
cd server
npm install


Create a `.env` file inside `server/` with the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the server:
bash
npm start


### 3. Setup the frontend
bash
cd ../frontend
npm install
npm run dev

Create a `.env` file inside `frontend/` (if applicable) with:
VITE_API_BASE_URL=http://localhost:5000


## Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com/).
- **Backend** is deployed on [Render](https://render.com/).
- Make sure environment variables are configured on both platforms, and CORS is set to allow the deployed frontend origin.



## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or raise an issue.



## Author

**Prashansa Mishra**
[GitHub](https://github.com/PrashansaMishra-max)
