const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authController = require('./controllers/authController');
const expenseController = require('./controllers/expenseController');
require('dotenv').config();

const port = 8001;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/user');

app.post('/signup', authController.signup);
app.post('/login', authController.login);
app.get('/getExpenses', authenticateToken, expenseController.getExpenses);
app.post('/addExpense', authenticateToken, expenseController.addExpense);
app.post('/deleteExpense', authenticateToken, expenseController.deleteExpense)
app.put('/editExpense/:id', authenticateToken, expenseController.editExpense);
app.get('/getChartData', authenticateToken, expenseController.getChartData )


function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token === undefined) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});