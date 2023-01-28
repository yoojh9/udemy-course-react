import classes from "./Checkout.module.css";

const Checkout = (props) => {
    const confirmHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" />
            </div>
            <div className={classes.control}>
                <label htmlFor="name">Street</label>
                <input type="text" id="street" />
            </div>
            <div className={classes.control}>
                <label htmlFor="name">Postal Code</label>
                <input type="text" id="postal" />
            </div>
            <div className={classes.control}>
                <label htmlFor="name">City</label>
                <input type="text" id="city" />
            </div>
            <button type="button" onClick={props.onCancel}>
                Cancel
            </button>
            <button>Confirm</button>
        </form>
    );
};

export default Checkout;
