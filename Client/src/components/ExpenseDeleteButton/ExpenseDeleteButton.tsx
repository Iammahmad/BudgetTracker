import React, { ReactNode } from 'react';
import axios from 'axios';

import "./dbtn.css"

interface ExpenseDeleteButtonProps {
  expenseId: string;
  token: string;
  onDelete: () => void;
  children: ReactNode;
}

const ExpenseDeleteButton: React.FC<ExpenseDeleteButtonProps> = ({ expenseId, token, onDelete, children }) => {
  const handleDeleteExpense = async () => {
    try {
      await axios.post('http://localhost:8001/deleteExpense', { expenseId }, {
        headers: {
          'Authorization': token,
        },
      });

      onDelete();
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  return (
    <button className='d-btn' onClick={handleDeleteExpense}>
      {children}
    </button>
  );
};

export default ExpenseDeleteButton;
