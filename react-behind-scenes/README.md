# 리액트 동작 방식과 최적화 기술

## 1. 리액트가 실제로 작동하는 방식

- 리액트는 사용자 인터페이스 구축을 위한 자바스크립트 라이브러리이다.
- 리액트의 핵심은 컴포넌트이다. 리액트는 컴포넌트를 통해 사용자 인터페이스를 구성하며 이에 대한 업데이트 역시 컴포넌트를 통해 한다.
- 리액트 DOM은 웹에 대한 인터페이스로 리액트는 웹을 모르지만 어떻게 컴포넌트를 다루는지 알고 있다. 실제 화면에 표시해주는 역할은 ReatDOM이 한다.
- 리액트는 컴포넌트를 관리하고 state 객체를 관리하고, 또한 다른 객체의 상태와 컴포넌트가 바뀌어야 하는지를 확인하고 컴포넌트의 변경 전후의 상태를 확인하는 라이브러리일 뿐이다.
- 리액트는 변경된 내용과 어떤 화면이든간에 화면에 표시되어야 할 정보 모두를 현재 사용중인 인터페이스에 전달한다. 예를 들면 ReactDOM과 같은 인터페이스에 전달한다. 리액트 DOM은 브라우저의 일부인 실제 DOM에 대한 작업을 하므로 사용자가 보고 있는 화면에 무언가를 표시하는 역할은 React DOM의 몫이다.
- 리액트는 컴포넌트만 신경 쓴다. 리액트는 props를 관리한다. props는 컴포넌트에 전달하는 데이터로 컴포넌트 구성을 가능하게 해주고 부모-자식 컴포넌트간의 통신을 연결해준다. 그리고 리액트는 컴포넌트 내부의 데이터인 State를 다룬다. 또 컴포넌트 전체의 데이터인 Context도 다룬다.
- props, state 또는 context가 변경 되면 이런 것들을 사용하는 컴포넌트 역시 리액트를 통해 변경되고, 리액트는 이 컴포넌트가 화면에 새로운 것을 표시하는지에 대해 확인을 한다. 이렇게 화면에 뭔가를 그리려고 한다면 리액트는 리액트 DOM에 알려 리액트 DOM이 새로운 화면과 새로운 컴포넌트 그리고 새로운 output을 표시할 수 있게 해준다.

<br>

<img src="./image.png" width="600px">

<br>

- 리액트는 컴포넌트를 다루며 리액트는 가상 DOM 이라는 개념을 사용한다. 이 가상 DOM은 앱이 마지막에 만들어내는 컴포넌트 트리를 결정한다. 각각 하위 트리를 갖고 있는 컴포넌트들은 JSX 코드를 반환하는데 이 가상 DOM은 컴포넌트 트리의 현재 모양과 최종 모양을 정한다.
- 가령, 상태가 업데이트 되면 이 정보는 리액트 DOM으로 전달되어 갱신 전후의 상태 차이를 인식하고 리액트가 컴포넌트 트리를 통해 구성한 가상 스냅샷인 가상 DOM과 일치하도록 실제 DOM을 조작하는 방법을 알 수 있게 한다.

- state, props, context, 컴포넌트에 변경이 발생하면 컴포넌트 함수가 재실행되어 리액트가 이를 재평가하게 된다.

<br><br>

### Re-Evaluating Components !== Re-Rendering the DOM

<img src="./image2.png" width="600px">

<br>

- Re-Evaluate가 DOM을 다시 랜더링하는 것을 의미하지는 않는다. 리액트에 의해 컴포넌트 함수가 재실행된다고 해서 실제 DOM의 각 부분들이 다시 랜더링된다거나 재평가되는 것은 아니다.
- 컴포넌트 부분과 리액트 부분, 그리고 실제 DOM을 구분할 줄 알아야 한다.
- 컴포넌트는 state, props, context가 변경될 때 재평가된다. 이러면 리액트는 컴포넌트 함수를 다시 실행한다.
- 한편, 이에 반해 실제 DOM은 리액트가 구성한 컴포넌트의 이전 상태와 트리, 그리고 현재 상태간의 차이점을 기반으로 변경이 필요할 때만 업데이트 된다.
- 즉, 실제 DOM은 필요한 경우에만 변경된다. 이전과 현재 상태를 가상으로 비교한다는 것은 간편하고 자원도 적게 든다. 이 작업은 메모리 안에서만 발생하기 때문이다.
- 이렇게 리액트는 가상 DOM과의 비교를 통해 최종 스냅샷과 현재의 스냅샷을 실제 DOM에 전달하는 구조를 갖는다. 가상 DOM을 통해 2개의 스냅샷 간의 차이점을 알아낸다.

<br>

<img src="./image3.png" width="600px">

- 이렇듯 리액트는 전체 DOM을 다시 렌더링하지 않는다.

<br><br>

## 2. 컴포넌트 업데이트

- state, props, context 변화는 컴포넌트 함수를 다시 실행시킨다. 하지만 실제 DOM은 가상 스냅샷 간의 차이점만 반영된다.
- 부모 컴포넌트 함수가 업데이트 되면 자식 컴포넌트 함수도 재실행된다.
- 부모 컴포넌트가 변경되면 자식 컴포넌트들이 재실행, 재평가된다.
  <br><br>

## 3. React.memo()로 불필요한 재평가 방지하기

- 큰 애플리케이션이라면 최적화가 필요할 것이다. 개발자는 특정한 상황에서만 컴포넌트를 재실행하도록 리액트에 지시할 수 있다. 예를 들어 컴포넌트가 받은 props가 변경되었다던가 하는 경우이다.
- 이를 위해 React.memo()를 사용하는데 React.memo()는 함수형 컴포넌트에만 사용 가능하다. 클래스 기반의 컴포넌트의 경우 작동하지 않는다.
- React.memo()는 함수형 컴포넌트를 최적화할 수 있다. React.memo()는 인자로 들어간 컴포넌트에 어떤 props가 입력되는지 확인하고 입력되는 모든 props의 신규 값을 확인한 뒤 이를 기존의 props 값과 비교하도록 리액트에게 전달한다. 그리고 props의 값이 바뀐 경우에만 컴포넌트를 재실행 및 재평가 하게 된다.
- 그리고 부모 컴포넌트가 변경되었지만 그 컴포넌트의 props 값이 바뀌지 않았다면 컴포넌트 실행은 건너뛴다. 그리고 그 컴포넌트가 재실행되지 않았다면 당연히 그 자식 역시 재실행되지 않는다. 이렇게 불필요한 재렌더링을 피하기 위해 최적화가 이루어지고 있다.
- 이렇게 최적화가 가능하다면 왜 모든 컴포넌트에 적용하지 않는 것일까? 왜냐하면 최적화에는 비용이 따른다. React.memo() 메서드는 변경이 발생할 때마다 기존 props 값과 새로운 값을 비교한다. 그러면 리액트는 먼저 기존의 props 값을 저장할 공간이 필요하고 비교하는 작업도 필요하다. 이 각각의 작업은 개별적인 성능 비용이 필요하다. - 이 성능 효율은 어느 컴포넌트를 최적화하느냐에 따라 달라진다. 왜냐하면 컴포넌트를 재평가하는 데에 필요한 성능 비용과 props를 비교하는 성능 비용을 서로 맞바꾸는 것이다. 그리고 이는 props의 개수와 컴포넌트의 복잡도 그리고 자식 컴포넌트의 숫자에 따라 달라진다.
- 만약 자식 컴포넌트가 많아서 컴포넌트 트리가 매우 크다면 React.memo()는 유용하게 사용할 수 있다. 그리고 컴포넌트 트리의 상위에 위치해있다면 전체 컴포넌트 트리에 대한 쓸데없는 재렌더링을 막을 수 있다.
- 이와는 반대로 부모 컴포넌트를 매번 재평가할 때마다 컴포넌트의 변화가 있거나 props의 값이 변화할 수 있는 경우라면 이 React.memo는 크게 의미를 갖지 못한다. 왜냐하면 컴포넌트의 재렌더링이 어떻게든 필요하기 때문이다.
- 또한 앱의 크기에 따라서도 달라진다. 매우 작은 앱, 매우 작은 컴포넌트 트리의 경우에는 이런 과정을 추가하는 것이 필요하지 않다.
- 모든 컴포넌트를 React.memo()로 래핑할 필요는 없다.

<br>

```javascript
import React, { useState } from "react";
import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraphHandler = () => {
    setShowParagraph((prev) => !prev);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={toggleParagraphHandler}>Show Paragraph</Button>
    </div>
  );
}

export default App;
```

<br>

- 위의 예제에서 Button 컴포넌트는 다시 변경될 일이 없으므로 Button에 대해 매번 재평가하는 것은 가치가 없다. 그러므로 Button에 React.memo() 래핑을 이용한다.

<br>

```javascript
import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  console.log("Button RUNNING");

  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
```

<br>

- 하지만 위 예제는 버튼이 눌릴 때마다 console에 'Button RUNNING'이라는 로그를 볼 수 있다. 이는 Button 컴포넌트가 재평가 됨을 의미하는데, 이것은 리액트에서 흔하게 발생하는 오류 중 하나이다.
- App 컴포넌트는 어쨌든 함수이기 때문에 마치 일반적인 자바스크립트 함수처럼 재실행된다. 이 말은 Button 컴포넌트에 전달하는 toggleParagraphHandler() 함수 역시 재생성 됨을 의미한다. 이는 App 함수의 모든 렌더링, 모든 실행 사이클에서 완전히 새로운 함수이다.
- props가 원시값이라면 previous props와 값이 달라지지 않았을 때 컴포넌트가 재실행되지 않았곘지만 배열이나 객체, 함수를 비교한다면 말이 달라진다.
- 자바스크립트에서는 배열이나, 객체, 함수는 참조값을 사용하므로 props.onClick === props.previous.onClick을 비교하게 되고 이 둘은 같은 값일 수 없으므로 React.memo는 값이 변경되었다고 인식한다.
- 즉, React.memo는 props를 통한 객체나 배열, 함수를 가져오는 컴포넌트에는 사용할 수 없을까?

<br><br>

## 4. useCallback

### 1) useCallback()으로 함수 재생성 방지하기

- React.memo를 객체 prop 값에도 작동하게끔 설정할 수 있다. 객체를 생성하고 저장하는 방식만 조금 변경해주면 된다. 이 작업은 useCallback() 훅을 사용하여 작업하면 된다.
- useCallback() 훅은 기본적으로 컴포넌트 실행 전반에 걸쳐 함수를 저장할 수 있게 하는 훅으로 리액트에 우리는 이 함수를 저장할 것이고 매번 실행할 때마다 이 함수를 재생성할 필요가 없다는 걸 알릴 수 있다.
- 이렇게 되면 동일한 함수 객체가 메모리의 동일한 위치에 저장되므로 이를 통해 비교 작업을 할 수 있다.
- useCallback()은 우리가 선택한 함수를 리액트의 내부 저장 공간에 저장해서 함수 객체가 실행될 때마다 이를 재사용할 수 있게 한다.

<br>

- 아래 코드 useCallback의 dependency 배열은 리액트에 toggleParagraphHandler에 저장하려고 하는 이 콜백 함수는 절대 변경되지 않을 것이라고 리액트에 알려주는 배열이다. 따라서 App 컴포넌트가 다시 재평가 되더라도 항상 같은 함수 객체가 사용되게끔 한다.

<br>

```javascript
const toggleParagraphHandler = useCallback(() => {
  setShowParagraph((prev) => !prev);
}, []);
```

<br>

- 이제 Button 컴포넌트는 다시 재평가되지 않는다.

<br>

```javascript
import React, { useCallback, useState } from "react";
import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prev) => !prev);
  }, []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={toggleParagraphHandler}>Show Paragraph</Button>
    </div>
  );
}

export default App;
```

<br><br>

### 2) useCallback() 및 해당 종속성

- useCallback을 사용하면 함수를 저장하고 이를 재사용할 수 있다.
- useCallback에 의존성을 따로 주지 않으면 처음에 컴포넌트 생성 시에만 실행되고 다시 실행되지 않는다.
- 이렇게 종속성에 추가해야 새로운 값이 들어오면 함수를 재생성한다. 

<br>

```javascript
  const toggleParagraphHandler = useCallback(() => {
    if(allowToggle){
      setShowParagraph(prev => !prev);
    }
  },[allowToggle])
```

<br><br>

## 5. State 스케줄링 및 일괄 처리 이해하기
- setState()를 실행했다고 해서 state 값이 바로 바뀌지는 않는다. 대신 변경할 데이터로 state 업데이트를 하게끔 예약 한다. 이것이 상태 갱신 예약이다.
- 리액트는 state 변경을 즉시 처리하지 않는다. 대부분의 경우에 state 변경이 발생하면 state 갱신에 대한 스케줄 작업은 매우 빠르게 발생한다.
- 결국 상태 변화가 처리되면 리액트가 컴포넌트를 재평가하고 컴포넌트 함수를 재실행한다.
- 스케줄링 때문에 다수의 예약 state 변화가 동시에 있을 수 있다. 즉 동시에 여러 번의 갱신이 스케줄 될 수 있으므로 setState를 사용할 때는 함수 형식으로 사용하는 것을 권장한다. 
- 이론 상으로 이 스케줄링 작업은 지연될 수 있으므로 이는 상태 변경이 순서대로 처리되고 이전 상태를 기반으로 가장 최신의 state를 얻을 수 있는 가장 안전한 방법이다.

<br>

```javascript
setState(prev => !prev)
```

<br>

- 이전 상태의 스냅샷을 기반으로 상태를 갱신하기 위해 함수 형식을 사용하는 것과 비슷하게 useEffect 또한 상태 또는 종속된 값이 변경될 때마다 의존성 메커니즘을 통해 내부에서 선언한 effect가 재실행 되도록 한다.

<br>

```javascript
const [emailIsValid, setEmailIsValid] = useState(false);
const [passwordIsValid, setPasswordIsValid] = useState(false);
const [formIsvalid, setFormIsValid] = useState(false);

useEffect(()=>{
  setFormIsValid(emailIsValid && passwordIsValid);
},[emailIsValid, passwordIsValid])
```

<br>

- 즉 아래 코드는 state가 바로 변경이 되는게 아니라 갱신 예약이 된 뒤 컴포넌트가 다시 실행되고 컴포넌트가 다시 실행되고 나서야 사용 가능한 최신 상태가 된다
- 아래 코드처럼 두 개의 상태 갱신이 같은 코드 조각에 존재한다면 즉 같은 함수가 서로 다른 프로미스에 있지 않고 같은 곳에 존재한다면 이 둘 사이에 시간 지연과 같은 현상은 발생하지 않는다. 리액트는 이들에 대한 상태 갱신을 하나의 동기화 프로세스에서 같이 실행한다. 예를 들어 하나의 함수가 어떠한 콜백이나 프로미스 없이 실행된다면 리액트는 이 함수로부터 발생하는 모든 상태 갱신을 하나의 상태 갱신 작업으로 처리한다.

<br>

```javascript
const navigateHandler = (navPath) => {
  setCurrentNavPath(navPath);
  // State was NOT updated here!
  setDrwerIsOpen(false);
}
```