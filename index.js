require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const enrollmentRoutes = require('./routes/enrollment');
const feedbackRoutes = require('./routes/feedback');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('DB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
