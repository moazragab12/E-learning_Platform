const mongoose = require("mongoose");

// User Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
  },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatarUrl: String,
    bio: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Course Model
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: { type: String },
  categories: [{ type: String }],
  published: { type: Boolean, default: false },
  averageRating: { type: Number, default: 0 },
  feedbackCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Lesson/Module Model
const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true }, // HTML/Markdown
  resources: [
    {
      type: { type: String, enum: ["video", "pdf", "link"] },
      url: { type: String, required: true },
    },
  ],
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Enrollment Model
const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  progress: {
    lessonsCompleted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    lastAccessed: Date,
  },
  enrolledAt: { type: Date, default: Date.now },
});

// Assessment Model
const assessmentSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  type: {
    type: String,
    enum: ["quiz", "assignment"],
    required: true,
  },
  questions: [
    {
      q: { type: String, required: true },
      options: [{ type: String }],
      answer: { type: mongoose.Schema.Types.Mixed, required: true },
    },
  ],
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
});

// Feedback Model
const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Course: mongoose.model("Course", courseSchema),
  Lesson: mongoose.model("Lesson", lessonSchema),
  Enrollment: mongoose.model("Enrollment", enrollmentSchema),
  Assessment: mongoose.model("Assessment", assessmentSchema),
  Feedback: mongoose.model("Feedback", feedbackSchema),
};
