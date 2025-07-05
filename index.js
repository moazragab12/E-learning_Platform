require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');

        // Start server after successful DB connection
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(` Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(' MongoDB connection error:', err));
