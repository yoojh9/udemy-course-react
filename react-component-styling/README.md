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

- Styled-Components를 사용하면 우리가 만든 className이 아니라 styled-components 패키지에 의해 동적으로 생성된 className을 확인할 수 있다.
- 그러므로 모든 클래스는 유니크한 이름을 갖게 되어 앱에 있는 다른 컴포넌트에 영향을 주지 않는다. 
- 그래서 className이 전역에 선언된다 하더라도 고유한 클래스 이름을 가지므로 앱에 있는 다른 컴포넌트에는 영향을 주지 않는다.


```html
<button type="submit" class="sc-bcXHqe lacuDr">Add Goal</button>
```