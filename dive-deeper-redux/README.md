# 리덕스 고급

## 1) 리덕스 복습

-   https://github.com/yoojh9/udemy-course-react/tree/37d466d533f02b5fba669dde6260c7713a13859f/dive-deeper-redux

<br><br>

## 2) Side Effects, Async Tasks & Redux

-   Reducer 함수는 순수한 함수여야 한다. side-effect은 없어야 하고, async가 아닌 synchronous 함수여야 한다.
-   그렇지만 이는 리덕스로 작업할 때 보내야하는 HTTP 요청과 같이 side-effect가 발생하는 일부 작업은 어디에 넣어야 하며, 리덕스로 작업할 때 발생하는 비동기 코드를 어디에 넣어야 하는지 의문이 생긴다.
-   리듀서 함수 안에서는 비동기 코드를 실행하지 않아야 한다.

<br>

<img src="./image.png" width="600px">

<br>

### (1) useEffect 사용하기

```javascript
// App.js

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        fetch(
            "https://react-http-1c05f-default-rtdb.firebaseio.com/cart.json",
            {
                method: "PUT",
                body: JSON.stringify(cart),
            }
        );
    }, [cart]);

    return (
        <Layout>
            {showCart && <Cart />}
            <Products />
        </Layout>
    );
}

export default App;
```

<br>

-   https://github.com/yoojh9/udemy-course-react/commit/6ff16412fa1935fecda87c5a7e1109d4fdde1833

<br>
