const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../modles/User');
require('dotenv').config();


async function signup(req, res) {
    const { firstName, lastName, email, password, budgetLimit } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: 'User already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            budgetLimit,
        });

        res.json({
            success: true,
            message: 'User Signup Successful',
            data: newUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({ userId: user._id, email: user.email },process.env.SECRET_KEY, { expiresIn: '1h' });

                res.json({
                    success: true,
                    message: 'Login Successful',
                    token,
                });
            } else {
                res.json({
                    success: false,
                    message: 'Incorrect password',
                });
            }
        } else {
            res.json({
                success: false,
                message: 'User does not exist',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

module.exports = {
    signup,
    login,
};
