require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User, Course } = require('../models/dbModels');

const MONGO_URI = process.env.MONGO_URI;

// Sample course data
const sampleCourses = [
    {
        title: 'Complete Web Development Bootcamp',
        description: 'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive course.',
        categories: ['Web Development', 'JavaScript', 'React'],
        averageRating: 4.8,
        feedbackCount: 234,
        published: true
    },
    {
        title: 'Python for Data Science',
        description: 'Learn Python programming with a focus on data analysis, visualization, and machine learning.',
        categories: ['Python', 'Data Science', 'Machine Learning'],
        averageRating: 4.6,
        feedbackCount: 189,
        published: true
    },
    {
        title: 'Mobile App Development with React Native',
        description: 'Build cross-platform mobile applications using React Native and JavaScript.',
        categories: ['Mobile Development', 'React Native', 'JavaScript'],
        averageRating: 4.5,
        feedbackCount: 156,
        published: true
    },
    {
        title: 'Advanced Java Programming',
        description: 'Deep dive into Java with advanced concepts including multithreading, design patterns, and Spring framework.',
        categories: ['Java', 'Programming', 'Spring'],
        averageRating: 4.4,
        feedbackCount: 98,
        published: true
    },
    {
        title: 'UI/UX Design Fundamentals',
        description: 'Learn the principles of user interface and user experience design with practical projects.',
        categories: ['Design', 'UI/UX', 'Figma'],
        averageRating: 4.7,
        feedbackCount: 167,
        published: true
    },
    {
        title: 'Cloud Computing with AWS',
        description: 'Master Amazon Web Services including EC2, S3, Lambda, and other essential cloud technologies.',
        categories: ['Cloud Computing', 'AWS', 'DevOps'],
        averageRating: 4.3,
        feedbackCount: 142,
        published: true
    },
    {
        title: 'Angular Framework Mastery',
        description: 'Build dynamic single-page applications with Angular, TypeScript, and modern development practices.',
        categories: ['Angular', 'TypeScript', 'Web Development'],
        averageRating: 4.5,
        feedbackCount: 123,
        published: true
    },
    {
        title: 'Cybersecurity Essentials',
        description: 'Learn fundamental cybersecurity concepts, ethical hacking, and network security principles.',
        categories: ['Cybersecurity', 'Networking', 'Ethical Hacking'],
        averageRating: 4.6,
        feedbackCount: 87,
        published: true
    }
];

// Sample instructors
const sampleInstructors = [
    {
        email: 'john.smith@edulearn.com',
        password: 'instructor123',
        role: 'instructor',
        profile: {
            firstName: 'John',
            lastName: 'Smith',
            bio: 'Full-stack developer with 10+ years of experience in web technologies.'
        }
    },
    {
        email: 'sarah.johnson@edulearn.com',
        password: 'instructor123',
        role: 'instructor',
        profile: {
            firstName: 'Sarah',
            lastName: 'Johnson',
            bio: 'Data scientist and machine learning expert with a PhD in Computer Science.'
        }
    },
    {
        email: 'mike.chen@edulearn.com',
        password: 'instructor123',
        role: 'instructor',
        profile: {
            firstName: 'Mike',
            lastName: 'Chen',
            bio: 'Mobile app developer and React Native specialist.'
        }
    },
    {
        email: 'emily.davis@edulearn.com',
        password: 'instructor123',
        role: 'instructor',
        profile: {
            firstName: 'Emily',
            lastName: 'Davis',
            bio: 'Senior Java developer and software architect with enterprise experience.'
        }
    },
    {
        email: 'alex.rodriguez@edulearn.com',
        password: 'instructor123',
        role: 'instructor',
        profile: {
            firstName: 'Alex',
            lastName: 'Rodriguez',
            bio: 'UI/UX designer with a passion for creating intuitive user experiences.'
        }
    },
    {
        email: 'david.wilson@edulearn.com',
        password: 'instructor123',
        role: 'instructor',
        profile: {
            firstName: 'David',
            lastName: 'Wilson',
            bio: 'Cloud solutions architect with extensive AWS certification experience.'
        }
    },
    {
        email: 'lisa.brown@edulearn.com',
        password: 'instructor123',
        role: 'instructor',
        profile: {
            firstName: 'Lisa',
            lastName: 'Brown',
            bio: 'Frontend developer specializing in Angular and modern JavaScript frameworks.'
        }
    },
    {
        email: 'robert.taylor@edulearn.com',
        password: 'instructor123',
        role: 'instructor',
        profile: {
            firstName: 'Robert',
            lastName: 'Taylor',
            bio: 'Cybersecurity expert and ethical hacker with industry certifications.'
        }
    }
];

async function createInstructorsAndCourses() {
    try {
        console.log(' Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log(' Connected to MongoDB');

        // Clear existing courses and instructors (optional - remove if you want to keep existing data)
        console.log(' Clearing existing sample data...');
        await Course.deleteMany({});
        await User.deleteMany({ role: 'instructor' });

        // Create instructors
        console.log(' Creating instructors...');
        const createdInstructors = [];

        for (const instructorData of sampleInstructors) {
            const hashedPassword = await bcrypt.hash(instructorData.password, 10);
            const instructor = new User({
                email: instructorData.email,
                passwordHash: hashedPassword,
                role: instructorData.role,
                profile: instructorData.profile
            });

            const savedInstructor = await instructor.save();
            createdInstructors.push(savedInstructor);
            console.log(` Created instructor: ${instructorData.profile.firstName} ${instructorData.profile.lastName}`);
        }

        // Create courses and assign them to instructors
        console.log(' Creating courses...');
        for (let i = 0; i < sampleCourses.length; i++) {
            const courseData = sampleCourses[i];
            const instructor = createdInstructors[i]; // Assign each course to a different instructor

            const course = new Course({
                title: courseData.title,
                description: courseData.description,
                instructorId: instructor._id,
                categories: courseData.categories,
                published: courseData.published,
                averageRating: courseData.averageRating,
                feedbackCount: courseData.feedbackCount
            });

            await course.save();
            console.log(` Created course: ${courseData.title} (Instructor: ${instructor.profile.firstName} ${instructor.profile.lastName})`);
        }

        console.log('🎉 Successfully created all instructors and courses!');
        console.log(`📊 Total instructors created: ${createdInstructors.length}`);
        console.log(`📚 Total courses created: ${sampleCourses.length}`);

    } catch (error) {
        console.error(' Error creating data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the script
createInstructorsAndCourses();
