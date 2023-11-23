import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './addExpense.css';
import { DatePicker } from '../DatePicker';

interface AddExpenseProps {
  token: string;
  onClose: () => void;
  onAddSuccess: () => void;
}

export default function AddExpense({ token, onClose, onAddSuccess }: AddExpenseProps) {
  const formik = useFormik({
    initialValues: {
      expenseName: '',
      expensePrice: 0,
      selectedDate: new Date().toISOString().split('T')[0],
    },
    validationSchema: Yup.object({
      expenseName: Yup.string().required('Required'),
      expensePrice: Yup.number().required('Required').positive('Must be a positive number'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(
          'http://localhost:8001/addExpense',
          {
            name: values.expenseName,
            price: values.expensePrice,
            date: values.selectedDate,
          },
          {
            headers: {
              'Authorization': token,
            },
          }
        );

        onAddSuccess(); 
        onClose();
      } catch (error) {
        console.error('Axios Error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="overlay">
        <div className="overlay-content">
          <div className='head'>
            <h2>Add Budget</h2>
            <button className='d-btn' type="button" onClick={onClose}>X</button>
          </div>
          <div>
            <input
              className='Add-input'
              type="text"
              placeholder='Name'
              {...formik.getFieldProps('expenseName')}
            />
            {formik.touched.expenseName && formik.errors.expenseName && (
              <div className="error-message">{formik.errors.expenseName}</div>
            )}
          </div>

          <div>
            <input
              className='Add-input'
              type="number"
              placeholder='Price'
              {...formik.getFieldProps('expensePrice')}
            />
            {formik.touched.expensePrice && formik.errors.expensePrice && (
              <div className="error-message">{formik.errors.expensePrice}</div>
            )}
          </div>
          <div className='date'>
            <p>Select A Date : </p>
            <DatePicker onChange={(date) => formik.setFieldValue('selectedDate', date)} />
          </div>
          <button className='submit-btn' type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}
