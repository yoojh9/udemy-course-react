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

<br>

## 3. 동적으로 CSS 클래스 설정하기

```javascript
// js
<div className={`form-control${!isValid ? "invalid" : ""}`}>
```

<br>

```css
// css
.form-control.invalid input {
  border-color: red;
  background: #ffd7d7
}

.form-control.invalid label {
  color: red
}
```