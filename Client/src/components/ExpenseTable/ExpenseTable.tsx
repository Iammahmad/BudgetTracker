import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './expenseTable.css';
import { ExpenseDeleteButton } from '../ExpenseDeleteButton';
import { DatePicker } from '../DatePicker';
import { ExpenseEditOverlay } from '../ExpenseEditBtn';
import {AddExpense} from '../AddExpense'; 
import { State, Action, ExpenseTableProps, Expense } from './types';

const initialState: State = {
  filterDate: '',
  rowsPerPage: 5,
  currentPage: 1,
  totalPages: 1,
  expenses: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FILTER_DATE':
      return { ...state, filterDate: action.payload };
    case 'SET_ROWS_PER_PAGE':
      return { ...state, rowsPerPage: action.payload, currentPage: 1 };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({ token, showAddOverlay }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (token) {
      fetchDataFromExpensesApi();
    }
  }, [token, state.filterDate, state.rowsPerPage, state.currentPage]);

  const fetchDataFromExpensesApi = async () => {
    try {
      const response = await axios.get('http://localhost:8001/getExpenses', {
        headers: {
          'Authorization': token,
        },
        params: {
          date: state.filterDate ? new Date(state.filterDate).toISOString() : '',
          limit: state.rowsPerPage,
          page: state.currentPage,
        },
      });
      const responseData = response.data && response.data.data;
      const fetchedExpenses = responseData && responseData.expenses ? responseData.expenses : [];
      const totalExpenses = responseData && responseData.totalExpenses ? responseData.totalExpenses : 0;

      dispatch({ type: 'SET_EXPENSES', payload: fetchedExpenses });
      dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(totalExpenses / state.rowsPerPage) });
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  const handleDateChange = (date: string) => {
    dispatch({ type: 'SET_FILTER_DATE', payload: date });
  };

  const handleRowsPerPageChange = (value: number) => {
    dispatch({ type: 'SET_ROWS_PER_PAGE', payload: value });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const handleDeleteSuccess = () => {
    fetchDataFromExpensesApi();
  };

  const handleEditSuccess = () => {
    fetchDataFromExpensesApi();
    setIsEditing(false);
  };

  const handleEditClick = (expenseId: string) => {
    setEditExpenseId(expenseId);
    setIsEditing(true);
  };

  const handleCloseEditOverlay = () => {
    setEditExpenseId('');
    setIsEditing(false);
  };

  const handleCloseAddOverlay = () => {
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddSuccess =() =>{
    fetchDataFromExpensesApi();
  };

  return (
    <article className='exp-table'>
      <section className='head'>
        <section className='filter'>
          <p>Filter by Date :</p>
          <DatePicker onChange={handleDateChange} />
        </section>
        <button className='add-budget' onClick={handleAddClick}>Add Budget</button>
      </section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.expenses.length > 0 ? (
            state.expenses.map((expense: Expense, index: number) => (
              <tr key={index}>
                <td>{expense.name}</td>
                <td>{expense.price}-/rs</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <ExpenseDeleteButton
                    expenseId={expense._id}
                    token={token}
                    onDelete={handleDeleteSuccess}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </ExpenseDeleteButton>
                  <button className='d-btn' onClick={() => handleEditClick(expense._id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No expenses to display</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='row-page'>
        <div>
          <label>Rows per page:</label>
          <select
            value={state.rowsPerPage}
            onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <label>Page:</label>
        <select
          value={state.currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
        >
          {Array.from({ length: state.totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <span> of {state.totalPages}</span>
      </div>

      {isEditing && (
        <ExpenseEditOverlay
          token={token}
          expenseId={editExpenseId}
          onClose={handleCloseEditOverlay}
          onEditSuccess={handleEditSuccess}
        />
      )}

      {isAdding && (
        <AddExpense
          token={token}
          onClose={handleCloseAddOverlay}
          onAddSuccess={handleAddSuccess}
        />
      )}
    </article>
  );
};

export default ExpenseTable;
