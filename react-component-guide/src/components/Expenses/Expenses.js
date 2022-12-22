import { useState } from "react";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState("2022");
    const filterChangeHandler = (selectedYear) => {
        console.log(selectedYear);
        setFilteredYear(selectedYear);
    };

    const filteredExpenses = props.items.filter((expense) => {
        return expense.date.getFullYear().toString() === filteredYear;
    });

    // JSX 코드 내에 삼항연산자 대신 좀 더 가독성 있게 보여줌.
    let expenseContent = <p>No expenses found.</p>;
    if (filteredExpenses.length > 0) {
        expenseContent = filteredExpenses.map((expense) => (
            <ExpenseItem
                key={expense.id}
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
            />
        ));
    }

    return (
        <Card className="expenses">
            <ExpensesFilter
                selected={filteredYear}
                onChangeFilter={filterChangeHandler}
            />
            {expenseContent}
            {/* {filteredExpenses.length === 0 && <p>No expenses found</p>}
            {filteredExpenses.length > 0 &&
                filteredExpenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        title={expense.title}
                        amount={expense.amount}
                        date={expense.date}
                    />
                ))} */}
        </Card>
    );
};

export default Expenses;
