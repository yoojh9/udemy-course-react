import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';

const ExpensesList = (props) => {

   if(props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no expenses.</h2>  // JSX 전체가 바뀐다면 여기서 바로 리턴할 수도 있음.
   }

    return (
      <ul className="expenses-list">
        {
          props.items.map((expense) => (
            <ExpenseItem
                  key={expense.id}
                  title={expense.title}
                  amount={expense.amount}
                  date={expense.date}
              />
          ))
        }
      </ul>
   )
};

export default ExpensesList;