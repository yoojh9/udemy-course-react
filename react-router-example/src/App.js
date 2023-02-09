import React from "react";
import { Route } from "react-router-dom";
import Mainheader from "./components/Mainheader";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
    return (
        <div>
            <Mainheader />
            <main>
                <Route path="/welcome">
                    <Welcome />
                </Route>
                <Route path="/products">
                    <Products />
                </Route>
                <Route path="/product-detail/:productId">
                    <ProductDetail />
                </Route>
            </main>
        </div>
    );
}

export default App;
