import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Greate Quotes</div>
            <nav classes={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/quotes" activeClassName={classes.active}>
                            All Quotes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/new-quotes"
                            activeClassName={classes.active}
                        >
                            New Quotes
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
