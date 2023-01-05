## 1. Styling Module Content

- Conditional & Dynamic Styles
- Styled Components
- CSS Modules

<br><br>

## 2. 동적 인라인 스타일 설정하기

- 현재 CSS 방식은 CourseGoalList.css를 CourseGoalList.js에서만 import 했다 하더라도 .goal-list가 있는 전체 페이지의 모든 요소에 영향을 미친다.
- 인라인 방식이 100% 만족스럽지 않은 이유는 인라인 스타일 방식은 최우선 순위를 차지하기 때문이다. 개인적으로 inline 스타일은 선호하지 않는다.
- https://github.com/yoojh9/udemy-course-react/commit/08df7793cc294363b5fed37c086dac7d3dc48ce3

```javascript
<label style={{ color: !isValid ? "red" : "#ccc" }}>Course Goal</label>
```

<br><br>

## 3. 동적으로 CSS 클래스 설정하기

- https://github.com/yoojh9/udemy-course-react/commit/712c4685d317db234b51203163d0967da07c7231

```javascript
// js
<div className={`form-control${!isValid ? "invalid" : ""}`}>
```

<br><br>

```css
// css
.form-control.invalid input {
  border-color: red;
  background: #ffd7d7;
}

.form-control.invalid label {
  color: red;
}
```

<br><br>

## 4. Styled Components

- 현재 CSS 방식은 해당 컴포넌트에만 국한시키지 않는다.
- 하지만 대규모로 작업하다보면 클래스 이름이 중복 되기도 하고 의도치 않은 스타일이 먹힐 수 있다.
- Styled Components는 특정 스타일이 첨부된 컴포넌트를 구축할 수 있도록 도와주는 패키지인데 이 스타일이 첨부되는 컴포넌트에만 영향을 미치고 다른 컴포넌트에는 영향을 미치지 않는다.
- https://styled-components.com/

```
# with npm
$ npm install --save styled-components 
```

<br>

```javascript
import styled from 'styled-components';
import './Button.css';

// button은 styled 객체의 메소드이다. ()를 붙여 호출하는 대신 백틱``을 붙여 호출한다.
const Button = styled.button`
font: inherit;
padding: 0.5rem 1.5rem;
border: 1px solid #8b005d;
color: white;
background: #8b005d;
box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
cursor: pointer;

&:focus {
  outline: none;
}

&:hover,
&:active {
  background: #ac0e77;
  border-color: #ac0e77;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
}`;
export default Button;
```

- 기존에 같은 요소를 가리키던 클래스는 &로 변경한다.
- Styled-Components를 사용하면 우리가 만든 className이 아니라 styled-components 패키지에 의해 동적으로 생성된 className을 확인할 수 있다.
- 그러므로 모든 클래스는 유니크한 이름을 갖게 되어 앱에 있는 다른 컴포넌트에 영향을 주지 않는다. 
- 그래서 className이 전역에 선언된다 하더라도 고유한 클래스 이름을 가지므로 앱에 있는 다른 컴포넌트에는 영향을 주지 않는다.


```html
<button type="submit" class="sc-bcXHqe lacuDr">Add Goal</button>
```

<br>

### (1) 동적 Props

- https://github.com/yoojh9/udemy-course-react/commit/67d6830e471fb2a905dbc67459e4b1d9299f4659

```javascript
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../UI/Button/Button";

const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    color: ${props => props.invalid ? 'red' : 'black'}
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid ${props => props.invalid ? 'red' : '#ccc'};
    background: ${props => props.invalid ? '#ffd7d7' : 'transparent'};
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }
`

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  return (
    <form onSubmit={formSubmitHandler}>
      <FormControl invalid={!isValid}>
        <label>Course Goal</label>
        <input
          type="text"
          onChange={goalInputChangeHandler}
        />
      </FormControl>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;

```

<br>

### (2) 미디어 쿼리



<br><br>

## 5. CSS 모듈 사용하기
- https://github.com/yoojh9/udemy-course-react/commit/52f9043f305e517e3310248ea2cdac014d7a1670
- 강사는 css는 css 파일로 사용하는 것을 선호한다. css 파일과 자바스크립트를 분리하여 깔끔한 자바스크립트 파일과 기본 css 파일을 선호함.
- 전역 css를 사용하여 클래스명이 겹치지 않게 신경써서 사용할 수도 있지만 css 모듈이라는 기능을 사용해서 css를 다음 단계로 발전시킬 수도 있다.
- Adding a CSS Modules Stylesheet (https://create-react-app.dev/docs/adding-a-css-modules-stylesheet)

- CSS 모듈을 사용하려면 먼저 css 파일명에 module을 추가한다. (Button.css -> Button.module.css)
- CSS 모듈을 사용하려면 아래와 같이 import 해야 함


```javascript
// pure css (css 모듈 적용 전)
import './Button.css';

const Button = props => {
  return (
    <button type={props.type} className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button
```

<br>

```javascript
// css module 적용 후
import styles from './Button.module.css';

const Button = props => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
```

<br>

- 위 코드처럼 css module을 적용하면 내부적으로 아래처럼 클래스명이 변경되어 전역 css가 아닌 고유한 css 클래스를 만듦.
- 고유한 버전의 스타일과 클래스를 생성한다. 
- css module은 css 범위가 그 css를 import한 컴포넌트에 한정된다는 것을 확실하게 해준다.

```html
<head>
  <style>
    .Button_button__2lgkF {
      font: inherit;
      padding: 0.5rem 1.5rem;
      border: 1px solid #8b005d;
      color: white;
      background: #8b005d;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
      cursor: pointer;
    }

    .Button_button__2lgkF:focus {
      outline: none;
    }

    .Button_button__2lgkF:hover,
    .Button_button__2lgkF:active {
      background: #ac0e77;
      border-color: #ac0e77;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
    }
  </style>
</head>
<body>
  <button type="submit" class="Button_button__2lgkF">Add Goal</button>
</body>
```

<br>

### 1) CSS 모듈을 사용한 동적 스타일
- https://github.com/yoojh9/udemy-course-react/commit/761f6fc562937212721cfdf50073b71573bf493d

