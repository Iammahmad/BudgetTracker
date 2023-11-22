

const mongoose = require('mongoose');
const UserModel = require('../modles/User');
const ExpenseModel = require('../modles/Expense');

const checkBudget = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch user's budget limit
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const budgetLimit = user.budgetLimit;
  
      // Fetch total expenses for the user
      const expenses = await ExpenseModel.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(userId) }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$price" }
          }
        }
      ]);
  
      const totalExpenses = expenses.length > 0 ? expenses[0].total : 0;
  
      // Compare budget and total expenses
      if (totalExpenses > budgetLimit) {
        // Send an alert or take appropriate action
        res.status(200).json({ alert: "Budget exceeded!" });
      } else {
        res.status(200).json({ alert: "Budget within limit." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  

module.exports = {
  checkBudget,
};

