# Building Custom Hooks

## 1) What are "Custom Hooks"?

- 안에 state를 설정할 수 있는 로직을 표현한 함수이다.
- 커스텀 훅을 만들어서 재사용 가능한 함수에 상태를 설정하는 로직을 제공할 수 있다.
- 일반적인 함수와는 다르게 커스텀 훅은 다른 리액트 훅 또는 다른 커스텀 훅을 사용할 수 있다.
- 따라서 useState나 useReducer를 통해 관리하는 리액트 state를 관리할 수 있다.
- 커스텀 훅을 통해 다른 컴포넌트에서 로직을 사용할 수 있도록 outsourcing 할 수 있다. 이를 통해 다양한 컴포넌트에서 호출이 가능하다.

<br><br>

## 2) 커스텀 리액트 컴포넌트 Re-Evaluation Hook 함수 생성하기

- custom hook 이름은 'use'로 시작해야 한다.
- 커스텀 훅을 사용한다고 해서 컴포넌트 전반에 걸쳐서 state나 effect를 공유하는 것은 아니다. 대신 모든 컴포넌트에서 컴포넌트 훅시 재실행되고 해당하는 모든 컴포넌트 인스턴스가 각자의 state를 받게 된다.
- https://github.com/yoojh9/udemy-course-react/commit/ed23e3e43fa3991be588c6a0b311a1c85698d01b

<br>

```javascript
// use-counter.js
import { useState, useEffect } from "react";

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if(forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return counter;
}

export default useCounter;
```