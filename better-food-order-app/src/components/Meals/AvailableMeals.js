import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const fetchData = async () => {
        const response = await fetch(
            "https://react-http-1c05f-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        const mealList = [];

        for (const key in responseData) {
            mealList.push({ ...responseData[key] });
        }

        setMeals(mealList);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData()
            .then()
            .catch((error) => {
                setIsLoading(false);
                setHttpError(error.message);
            });
    }, []);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
