# Effects, Reducers, Context

## 1. Effects (Side Effect)

<img src="./image1.png" width="600px"/>

-   대부분 애플리케이션은 백엔드 서버에 http request를 보내야 한다. 이런 작업들은 화면을 렌더링하는 데 적어도 직접적인 관계는 없다.

<br>

### 1) useEffect() Hook

```javascript
useEffect(() => {...}, [dependencies])
```

-   useEffect의 첫번째 인수는 함수이다. 모든 컴포넌트 평가 후에 지정된 의존성이 변경된 경우 실행되어야 하는 함수이다.
-   두번째 인수는 지정된 의존성이다. 의존성으로 구성된 배열이다.

<img src="image2.png" width="600px">

<br>

### 2) useEffect() with dependencies

```javascript
useEffect(() => {
    setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
}, [enteredEmail, enteredPassword]);
```

-   useEffect()에서 사용하는 모든 것을 종속성으로 추가해야 한다. 하지만 몇 가지 예외가 있다
    -   상태 업데이트 기능(setState)은 추가할 필요가 없다. (ex. setFormIsValid) React는 해당 함수가 절대 변경되지 않도록 보장하므로 종속성으로 추가할 필요가 없다.
    -   브라우저 내장 API 또는 함수(fetch()나 localStorage와 같은)를 추가할 필요가 없다. 이러한 브라우저 API / 전역 기능은 React 구성 요소 렌더링 주기와 관련이 없으며 변경되지 않는다.
    -   component 외부에서 정의한 변수나 함수를 추가할 필요가 없다. 이러한 함수나 변수도 컴포넌트 함수 내부에서 생성되지 않으므로 변경해도 구성 요소에 영향을 주지 않는다.
-   즉, 다시 렌더링 되어 변경될 수 있는 경우, 그렇기 때문에 컴포넌트 함수에 정의된 state나 props 또는 함수는 종속성으로 추가되어야 한다.

<br>

```javascript
import { useEffect, useState } from "react";

let myTimer;

const MyComponent = (props) => {
    const [timerIsActive, setTimerIsActive] = useState(false);

    const { timerDuration } = props; // using destructuring to pull out specific props values

    useEffect(() => {
        if (!timerIsActive) {
            setTimerIsActive(true);
            myTimer = setTimeout(() => {
                setTimerIsActive(false);
            }, timerDuration);
        }
    }, [timerIsActive, timerDuration]);
};
```

<br>

-   위 예에서 :
    -   **timeIsActive**는 dependency에 추가되었다. 왜냐하면 구성 요소가 변경될 때마다 변경될 수 있는 state이기 때문이다.
    -   **timeDuration**은 dependency에 추가되었다. 왜냐하면 prop 값이기 때문에 상위 컴포넌트가 해당 값을 변경하면 변경될 수 있기 때문이다.
    -   **setTimerIsActive**는 dependency에 추가되지 않았다. setState 기능은 React에서 기능 자체가 절대 변경되지 않음을 보장하므로 추가할 필요가 없다.
    -   **myTimer**는 dependency에 추가되지 않았다. 왜냐하면 이것은 컴포넌트의 내부 변수가 아니다(즉, 어떤 state나 prop가 아님). 컴포넌트의 외부에서 정의되고 이를 변경한다. (어디에서든) 컴포넌트가 다시 평가되도록 하지 않는다
    -   **setTimeout**은 dependency에 추가되지 않았다. 왜냐하면 브라우저 내장 API이기 때문이다. 내장 API는 React와 독립적이며 변경되지 않는다.
