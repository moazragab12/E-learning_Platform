require('dotenv').config();
const mongoose = require('mongoose');
const { User, Course } = require('../models/dbModels');

const MONGO_URI = process.env.MONGO_URI;

async function viewCreatedData() {
    try {
        console.log(' Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log(' Connected to MongoDB');

        // Get all instructors
        const instructors = await User.find({ role: 'instructor' });
        console.log(`\n Found ${instructors.length} instructors:`);
        instructors.forEach(instructor => {
            console.log(`  • ${instructor.profile.firstName} ${instructor.profile.lastName} (${instructor.email})`);
        });

        // Get all courses with instructor info
        const courses = await Course.find().populate('instructorId', 'profile.firstName profile.lastName');
        console.log(`\n Found ${courses.length} courses:`);
        courses.forEach(course => {
            console.log(`  • ${course.title}`);
            console.log(`    Instructor: ${course.instructorId.profile.firstName} ${course.instructorId.profile.lastName}`);
            console.log(`    Rating: ${course.averageRating}/5 (${course.feedbackCount} reviews)`);
            console.log(`    Categories: ${course.categories.join(', ')}`);
            console.log(`    Published: ${course.published ? 'Yes' : 'No'}`);
            console.log('');
        });

        // Test the top courses query (same as your API endpoint)
        console.log(' Top 6 courses (API endpoint simulation):');
        const topCourses = await Course.find({ published: true })
            .populate('instructorId', 'profile.firstName profile.lastName')
            .sort({ averageRating: -1, feedbackCount: -1 })
            .limit(6);

        topCourses.forEach((course, index) => {
            console.log(`  ${index + 1}. ${course.title} - ${course.averageRating}/5 (${course.feedbackCount} reviews)`);
        });

    } catch (error) {
        console.error(' Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\n Disconnected from MongoDB');
    }
}

// Run the script
viewCreatedData();
