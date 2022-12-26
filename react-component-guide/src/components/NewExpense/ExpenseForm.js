import { useState } from 'react';
import './ExpenseForm.css'

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '',
  //   enteredDate: ''
  // })

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);

    // O 이전 state에 의존하는 state 변경은 이렇게 하기
    // setUserInput((prev) => {
    //   return {...prev, enteredTitle: event.tager.value} 
    // })

    // X
    //setUserInput({...userInput, enteredTitle: event.tager.value})
  }

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    // setUserInput({...userInput, enteredAmount: event.tager.value})
  }

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    // setUserInput({...userInput, enteredDate: event.tager.value})
  }

  const submitHandler = (event) => {
    // 브라우저의 기본 동작으로 폼이 submit 될 때마다 페이지가 다시 로드 된다.
    // 이 기본적인 동작을 event.preventDefault()로 막을 수 있다.
    event.preventDefault();
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate)
    }

    props.onSaveExpenseData(expenseData);

    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };


  return <form onSubmit={submitHandler}>
    <div className='new-expense__controls'>
      <div className='new-expense__control'>
        <label>Title</label>
        <input type='text' value={enteredTitle} onChange={titleChangeHandler}></input>
      </div>
      <div className='new-expense__control'>
        <label>Amount</label>
        <input type='number' value={enteredAmount} min="0.01" step="0.01" onChange={amountChangeHandler}></input>
      </div>
      <div className='new-expense__control'>
        <label>Date</label>
        <input type='date' value={enteredDate} min="2020-01-01" step="2022-12-31" onChange={dateChangeHandler}></input>
      </div>
    </div>
    <div className='new-expense__actions'>
      <button type="button" onClick={props.onClickBtn}>Cancel</button>
      <button type="submit">Add Expense</button>
    </div>
  </form>
}

export default ExpenseForm;