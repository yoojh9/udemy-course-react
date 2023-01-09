# React Advanced

## 1. JSX 제한사항 및 해결방법

### 1) JSX Limitation

-   1개 이상의 root JSX 요소는 리턴할 수 없다.

-   JSX 코드는 React.createElement 코드로 변환된다. 아래 코드처럼 자바스크립트에서는 둘 이상을 반환할 수 없다. 즉 단 하나의 React.createElement 코드만 반환되어야 한다.

<br>

```javascript
return (
    React.createElement('h2', {}, 'Hi there!');
    React.createElement('p', {}, 'This does not work :-(');
)
```

<br>

### 2) Solution (△)

-   Always Wrap Adjacent Elements

```jsx
return (
    <div>
        <h2>Hi there!</h2>
        <p>This deos not work :-(</p>
    </div>
);
```

<br>

-   하지만 <div>로 감싸게 되면 **\\"<div> Soup\\"**라는 새로운 문제가 발생하게 된다. 이러한 불필요한 <div>들이 실제 DOM으로 렌더링된다. 너무 많은 HTML 요소를 렌더링하면 궁극적으로 애플리케이션은 느려질 것이다.

```javascript
<div>
    <div>
        <div>
            <div>
                <h2>Some content - yeah, this can really happen</h2>
            </div>
        </div>
    </div>
</div>
```

-   In bigger apps, you can easily end up with **tons of unnecessary <div>s** which add **no semantic meaning or structure to the page but are only there because of React's/JSX'requirement**

<br>

### 3) Solution (△)

-   children을 반환하는 root 역할만 하는 Wrapper 컴포넌트를 만든다.

```javascript
const Wrapper = (props) => {
    return props.children;
};

export default Wrapper;
```

-   위처럼 Wrapper 컴포넌트는 우리가 직접 만들 필요는 없고 리액트에서 Fragment 컴포넌트를 제공한다. 보통은 자체적으로 Wrapper 컴포넌트를 만들지 않는다.

<br><br>

## 2. Fragment 컴포넌트

### 1) Introducing Fragments

<img src="./images.png" width="600px"/>

-   왼쪽 구문은 항상 작동하고 오른쪽 구문(short cut)은 빌드 워크플로가 지원해야 사용할 수 있음
-   앞에서 직접 만든 Wrapper 컴포넌트와 동일하다. 이 두 구문은 빈 Wrapper를 렌더링한다. 실제 HTML 요소를 DOM에 렌더링하지 않는다.
