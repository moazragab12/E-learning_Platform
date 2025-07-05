require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const enrollmentRoutes = require('./routes/enrollment');
const feedbackRoutes = require('./routes/feedback');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('DB connection error:', err));

app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
