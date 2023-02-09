import { Route } from "react-router-dom/cjs/react-router-dom";

const Welcome = () => {
    return (
        <section>
            <h1>The Welocome Page</h1>
            <Route path="/welcome/new-user">
                <p>Welcome, new User!</p>
            </Route>
        </section>
    );
};

export default Welcome;
