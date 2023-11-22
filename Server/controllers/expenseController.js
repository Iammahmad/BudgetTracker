const ExpenseModel = require('../modles/Expense');

async function getExpenses(req, res) {
    const userId = req.user.userId;
    const filterDate = req.query.date;
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;

    try {
        let query = { userId };

        if (filterDate) {
            query.date = filterDate;
        }

        // Query for paginated results
        const totalExpenses = await ExpenseModel.countDocuments(query);
        const expenses = await ExpenseModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        // Query for total price for all data
        const totalPriceQuery = await ExpenseModel.aggregate([
            { $match: query },
            { $group: { _id: null, totalPrice: { $sum: "$price" } } }
        ]);

        const totalPrice = (totalPriceQuery.length > 0) ? totalPriceQuery[0].totalPrice : 0;

        res.json({
            success: true,
            message: 'Expenses retrieved successfully',
            data: {
                expenses,
                totalExpenses,
                totalPrice,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

async function addExpense(req, res) {
    const userId = req.user.userId;

    try {
        const newExpense = await ExpenseModel.create({
            userId,
            name: req.body.name,
            price: req.body.price,
            date: req.body.date,
        });

        res.json({
            success: true,
            message: 'Expense added successfully',
            data: newExpense,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

async function deleteExpense(req, res) {
    const userId = req.user.userId;
    const expenseId = req.body.expenseId; 

    try {
  
        const expense = await ExpenseModel.findOne({ _id: expenseId, userId });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found or unauthorized',
            });
        }


        await ExpenseModel.deleteOne({ _id: expenseId });

        res.json({
            success: true,
            message: 'Expense deleted successfully',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

async function editExpense(req, res) {
    const userId = req.user.userId;
    const expenseId = req.params.id;

    try {

        const expense = await ExpenseModel.findOne({ _id: expenseId, userId });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found or unauthorized',
            });
        }


        expense.name = req.body.name || expense.name;
        expense.price = req.body.price || expense.price;
        expense.date = req.body.date || expense.date;


        await expense.save();

        res.json({
            success: true,
            message: 'Expense updated successfully',
            data: expense,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

module.exports = {
    getExpenses,
    addExpense,
    deleteExpense,
    editExpense,
};
