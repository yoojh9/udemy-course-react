import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Mainheader from "./components/Mainheader";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
    return (
        <div>
            <Mainheader />
            <main>
                <Switch>
                    <Route path="/welcome">
                        <Welcome />
                    </Route>
                    <Route path="/products" exact>
                        <Products />
                    </Route>
                    <Route path="/products/:productId">
                        <ProductDetail />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;
