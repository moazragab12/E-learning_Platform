const { User } = require('../models/dbModels');



exports.createUser = async (req, res) => {
    try {
        const newUser = new User({
            email: req.body.email,
            passwordHash: req.body.password,
            role: req.body.role,
            profile: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                bio: req.body.bio
            }
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        console.error("CREATE USER ERROR:", err);
        res.status(500).json({ message: err.message, error: err });
    }
};


exports.getMyProfile = async (req, res) => {
    try {
        // Assuming auth middleware already sets req.user._id
        const user = await User.findById(req.user._id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updateMyProfile = async (req, res) => {
    try {
        const updates = req.body.profile;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { profile: updates, updatedAt: Date.now() },
            { new: true }
        ).select('-passwordHash');

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllInstructors = async (req, res) => {
    try {
        const instructors = await User.find({ role: 'instructor' }).select('-passwordHash');
        res.json(instructors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const instructor = await User.findOne({
            _id: req.params.id

        }).select('-passwordHash');

        if (!instructor) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.json(instructor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-passwordHash');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { ...updates, updatedAt: Date.now() },
            { new: true }
        ).select('-passwordHash');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        if (req.query.role) {
            // If role query param exists, filter by role
            const users = await User.find({ role: req.query.role }).select('-passwordHash');
            return res.json(users);
        } else {
            // Otherwise, fetch all users
            const users = await User.find().select('-passwordHash');
            return res.json(users);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
