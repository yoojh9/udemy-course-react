import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css'

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    }
    props.onAddExpense(expenseData);
    setIsEditing(false);
  }

  const changeIsEditing = () => {
    setIsEditing(prev => !prev);
  }

  return <div className='new-expense'>
    {
      isEditing && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onClickBtn={changeIsEditing}/>
    }
    {
      !isEditing && <button onClick={changeIsEditing}>New Add Expense</button>
    }
  </div>
}

export default NewExpense;