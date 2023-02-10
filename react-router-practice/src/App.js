import { Redirect, Route, Switch } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import NewQuotes from "./pages/NewQuotes";
import QuotesDetail from "./pages/QuotesDetail";

function App() {
    return (
        <Switch>
            <Route path="/" exact>
                <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
                <AllQuotes />
            </Route>
            <Route path="/quotes/:quoteId">
                <QuotesDetail />
            </Route>
            <Route path="/new-quotes">
                <NewQuotes />
            </Route>
        </Switch>
    );
}

export default App;
