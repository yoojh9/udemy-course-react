import classes from "./Header.module.css";
import mealsImages from "../../assets/meals.jpg";

const Header = () => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <button>Cart</button>
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImages} alt="A table full of delicious food!" />
            </div>
        </>
    );
};

export default Header;
