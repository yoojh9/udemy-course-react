import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
    return (
        <>
            <MainNavigation />
            <main className={classes.mian}>{props.children}</main>
        </>
    );
};

export default Layout;
