import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ExpenseEditOverlayProps {
  token: string;
  expenseId: string;
  onClose: () => void;
  onEditSuccess: () => void;
}

const ExpenseEditOverlay: React.FC<ExpenseEditOverlayProps> = ({ token, expenseId, onClose, onEditSuccess }) => {
  const [editedExpense, setEditedExpense] = useState({ name: '', price: '', date: '' });

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/getExpense/${expenseId}`, {
          headers: {
            'Authorization': token,
          },
        });

        const responseData = response.data && response.data.data;
        const expenseDetails = responseData ? responseData.expense : null;

        if (expenseDetails) {
          setEditedExpense({
            name: expenseDetails.name,
            price: expenseDetails.price,
            date: new Date(expenseDetails.date).toLocaleDateString(),
          });
        }
      } catch (error) {
        console.error('Axios Error:', error);
      }
    };

    fetchExpenseDetails();
  }, [token, expenseId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedExpense({ ...editedExpense, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:8001/editExpense/${expenseId}`,
        {
          name: editedExpense.name,
          price: editedExpense.price,
          date: editedExpense.date,
        },
        {
          headers: {
            'Authorization': token,
          },
        }
      );

      onEditSuccess();
      onClose();
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
      <div className='head'>
        <h2>Edit Expense</h2>
        <button className='d-btn' onClick={onClose}>X</button>
        </div>
        <input className='Add-input' type="text" name="name" placeholder='Name' value={editedExpense.name} onChange={handleInputChange} />
        <input className='Add-input' type="text" name="price" placeholder='Price' value={editedExpense.price} onChange={handleInputChange} />
        <input className='Add-input' type="date" name="date" placeholder='Date' value={editedExpense.date} onChange={handleInputChange} />
        <div className="overlay-buttons">
          <button className='submit-btn' onClick={handleSaveEdit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseEditOverlay;
