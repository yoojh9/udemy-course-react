import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuotes = React.lazy(() => import('./pages/NewQuotes'));
const QuotesDetail = React.lazy(()=> import ("./pages/QuotesDetail"));
const NotFound = React.lazy(()=> import("./pages/NotFound"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));

function App() {
    return (
        <Layout>
            <Suspense fallback={
                <div className='centered'>
                    <LoadingSpinner/>
                </div>
            }>
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
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    );
}

export default App;
