# E-Learning Platform

A full-stack e-learning platform built with Angular (frontend) and Node.js/Express (backend) with MongoDB Atlas database.

## 🏗️ Project Structure

```
E-learning_Platform/
├── backend/          # Node.js/Express API server
│   ├── controllers/  # Route controllers
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Express middleware
│   ├── validation/   # Input validation
│   ├── Scripts/      # Database scripts
│   └── index.js      # Server entry point
├── frontend/         # Angular application
│   ├── src/          # Source code
│   │   ├── app/      # Angular components
│   │   └── ...
│   └── angular.json  # Angular configuration
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/moazragab12/E-learning_Platform.git
   cd E-learning_Platform
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The API will be available at `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The application will be available at `http://localhost:4200`

## 📚 Features

- **User Authentication** (Register/Login)
- **Course Management** (Browse, View, Rate)
- **Popular Courses** with ratings and images
- **Instructor Profiles**
- **Responsive Design** with Angular Material
- **Course Categories** and search
- **Real-time course data** from MongoDB Atlas

## 🛠️ Technology Stack

### Frontend
- **Angular 18+** - Frontend framework
- **Angular Material** - UI components
- **Bootstrap** - CSS framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/top` - Get top-rated courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses` - Create course (protected)
- `PUT /api/courses/:id` - Update course (protected)
- `DELETE /api/courses/:id` - Delete course (protected)

## 🗄️ Database Scripts

The project includes useful database scripts in `backend/Scripts/`:

- `createSampleCourses.js` - Populate database with sample courses and instructors
- `addCourseImages.js` - Add images to existing courses
- `viewDatabaseData.js` - View current database contents
- `createTestUser.js` - Create test users

Run scripts with: `node Scripts/scriptName.js`

## 🎨 UI Features

- **Responsive Design** that works on desktop and mobile
- **Course Cards** with images, ratings, and instructor info
- **Material Design** components and theming
- **Loading States** and error handling
- **Interactive Elements** with hover effects

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to platforms like:
- Heroku
- Railway
- Vercel
- AWS EC2

### Frontend Deployment
The frontend can be deployed to:
- Netlify
- Vercel
- Firebase Hosting
- GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Moaz Ragab** - [@moazragab12](https://github.com/moazragab12)

## 🙏 Acknowledgments

- Angular team for the excellent framework
- MongoDB for the cloud database service
- Unsplash for the course images
- Material Design for the UI components
