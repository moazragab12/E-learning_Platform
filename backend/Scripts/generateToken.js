require("dotenv").config();
const jwt = require("jsonwebtoken");

const user = {
    _id: "68692a84aa2fb902ce0b9909",
    role: "student",
    email: "test@example.com",
};

const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
});

console.log(token);
