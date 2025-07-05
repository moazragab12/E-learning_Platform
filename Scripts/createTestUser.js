require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../models/dbModels');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(async () => {
        const newUser = new User({
            email: "student@example.com",
            passwordHash: "hashedpassword",
            role: "student",
            profile: {
                firstName: "Test",
                lastName: "User",
                bio: "Testing user API"
            }
        });

        const savedUser = await newUser.save();

        console.log(" Test user created:");
        console.log("User ID:", savedUser._id.toString());

        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
    });
