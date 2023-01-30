import { Fragment } from "react";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Counter from "./components/Counter";
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";

function App() {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    return (
        <Fragment>
            <Header />
            {isAuth ? <UserProfile /> : <Auth />}
            <Counter />
        </Fragment>
    );
}

export default App;
