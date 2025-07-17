require('dotenv').config();
const mongoose = require('mongoose');
const { Course } = require('../models/dbModels');

const MONGO_URI = process.env.MONGO_URI;

// Sample course images - using placeholder images that work well for courses
const courseImages = {
    'Introduction to Web Development': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    'Mastering Python Programming': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
    'Data Structures & Algorithms': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop',
    'React for Beginners': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    'UI/UX Design Essentials': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    'Javascript': 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
    'Complete Web Development Bootcamp': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    'Python for Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    'Mobile App Development with React Native': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    'Advanced Java Programming': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop',
    'Cloud Computing with AWS': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
    'Angular Framework Mastery': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    'Cybersecurity Essentials': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop'
};

async function addImagesToExistingCourses() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Get all courses
        const courses = await Course.find();
        console.log(`📚 Found ${courses.length} courses to update`);

        let updated = 0;
        for (const course of courses) {
            const imageUrl = courseImages[course.title];
            if (imageUrl) {
                await Course.findByIdAndUpdate(course._id, { imageUrl: imageUrl });
                console.log(`✅ Updated image for: ${course.title}`);
                updated++;
            } else {
                // Default placeholder for courses without specific images
                const defaultImage = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop';
                await Course.findByIdAndUpdate(course._id, { imageUrl: defaultImage });
                console.log(`📝 Added default image for: ${course.title}`);
                updated++;
            }
        }

        console.log(`🎉 Successfully updated ${updated} courses with images!`);

        // Display updated courses
        const updatedCourses = await Course.find().select('title imageUrl');
        console.log('\n📸 Courses with images:');
        updatedCourses.forEach(course => {
            console.log(`  • ${course.title}`);
            console.log(`    Image: ${course.imageUrl}`);
        });

    } catch (error) {
        console.error('❌ Error adding images:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

// Run the script
addImagesToExistingCourses();
