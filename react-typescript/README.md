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
let age: number = 1;
age = 12;
// age = '12';  // error

let userName: string;
userName = "Jeonghyun";

let isInstructor: boolean;
isInstructor = true;
```

<br><br>

## 4) 배열 및 객체 타입 작업하기

```typescript
// More Complex Type
let hobbies: string[];
hobbies = ["Sports", "Cooking"];

let person: {
    name: string;
    age: number;
};
person = {
    name: "Jeonghyun",
    age: 32,
};
// person = {
//   isEmployee: true,   // error
// }

let people: {
    name: string;
    age: number;
}[];
```

<br><br>

## 5) 타입 추론 (Type Inference)

```typescript
/**
 * Type Inference
 */
let course = "React - The Complete Guide";
// course = 12341;   // error
```

<br><br>

## 6) Union 타입 사용하기

-   지금까지는 한 개의 변수에 한 가지 자료형만 저장할 수 있었다.
-   하지만 다양한 타입을 여러 개 저장하는 경우도 있다.

<br>

```typescript
let course2: string | number | boolean = "React - The Complete Guide";
course2 = 12341;
```

<br><br>

## 7) Type Aliases의 이해

<br>

```typescript
type Person = {
    name: string;
    age: number;
};

let person: Person;
person = {
    name: "Jeonghyun",
    age: 32,
};

let people: Person[];
```

<br><br>

## 8) 함수 및 함수 유형

```typescript
function add(a: number, b: number): number {
    return a + b;
}

function printOutput(value: any): void {
    console.log(value);
}
```

<br><br>

## 9) Generic

-   제네릭 타입을 사용해 타입스크립트에게 any 타입이 아니라고 알려줬고, array와 value가 같은 타입을 가져야 한다는 것을 알려줬기 떄문에 타입스크립트는 demoArray의 타입을 number 배열로 추론이 가능하다. 또한 value 역시 number 타입으로 추론할 수 있다.
-   제네릭 타입은 함수 타입 안정성과 유연성을 줬다.

<br>

```typescript
function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

// updatedArray[0].split(""); // error
```
