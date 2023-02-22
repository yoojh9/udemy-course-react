# React + TypeScript

## 1) What & Why
-   TypeScript is a 'superset' to JavaScript
-   TypeScript adds static typing to JavaScript. JavaScript on its own is dynamically typed. 

<br><br>

## 2) TypeScript 설치 및 사용하기

<br>

```
$ npm install typescript --save-dev
```

<br>

-   타입스크립트는 브라우저에서 실행되지 않으므로 타입스크립트를 자바스크립트 형태로 컴파일해야 한다.

<br>

-   아래와 같은 명령어로 타입스크립트 파일을 컴파일 할 수 있다.

```
$ npx tsc with-typescript.ts
```

<br><br>

## 3) 기본 자료형(Type) 알아보기

-   any 타입은 어떤 값이든 저장할 수 있고, fallback 타입이므로 웬만하면 사용하지 않는 것이 좋다. 타입스크립트를 사용하는 주요 목적과 반대되기 때문이다. 
-   any 타입은 일반적인 자바스크립트와 다를 게 없다. 

<br>

```typescript
// Primitives
let age : number = 1;
age = 12;
// age = '12';  // error

let userName: string;
userName = 'Jeonghyun';

let isInstructor: boolean;
isInstructor = true;
```

<br><br>

## 4) 배열 및 객체 타입 작업하기

```javascript
// More Complex Type
let hobbies: string[];
hobbies = ['Sports', 'Cooking'];

let person: {
  name: string, 
  age: number
};
person = {
  name: 'Jeonghyun',
  age: 32
}
// person = {
//   isEmployee: true,   // error
// }

let people: {
  name: string, 
  age: number
}[];

```