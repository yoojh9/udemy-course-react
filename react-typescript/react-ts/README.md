# React TypeScript

-   이제 개발 서버는 우리가 작성한 타입스크립트 코드를 자바스크립트로 컴파일하여 최적화하는 작업을 수행한다. 또한 npm run build 시에도 자동으로 컴파일 작업이 이루어진다.

<br>

```json
"@types/jest": "^27.5.2",
"@types/node": "^16.18.12",
"@types/react": "^18.0.28",
"@types/react-dom": "^18.0.11",
```

<br>

-   위 '@types' 패키지는 바닐라 자바스크립트 라이브러리와 타입스크립트 프로젝트 사이에서 번역기 역할을 한다. 어떤 라이브러리에는 type annotaion 기능이 내장되어 있어 dependency로 추가하지 않아도 된다.

<br><br>

## 1) Props 및 TypeScript 정의하기

-   React.FC는 리액트 패키지에 정의된 타입으로 정확히는 '@types/react' 패키지에 정의되어 있다. React.FC 타입으로 정의함으로써 이 함수가 함수형 컴포넌트로 동작한다는 것을 명확히 한다. (FC = Functional Component)

<br>

```typescript
const Todos: React.FC<{ items: string[] }> = (props) => {
    return (
        <ul>
            {props.items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
};

export default Todos;
```

<br>

-   리액트와 타입스크립트로 함수형 컴포넌트를 만드려면 React.FC 타입을 함수형 컴포넌트의 상수 옆에 사용한다. 그리고 <> 붙인 다음 그 괄호 사이에 필요한 형태의
    props를 정의한다.

<br><br>

## 2) 데이터 모델 추가하기

-   \/models/todo.ts

```typescript
class Todo {
    id: string;
    text: string;

    constructor(todoText: string) {
        this.id = new Date().toISOString();
        this.text = todoText;
    }
}

export default Todo;
```

<br>

-   \/components/Todos.tsx

```typescript
import Todo from "../models/todo";

const Todos: React.FC<{ items: Todo[] }> = (props) => {
    return (
        <ul>
            {props.items.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    );
};

export default Todos;
```

<br><br>

## 3) TypeScript Form Submit

```typescript
const NewTodo: React.FC = () => {
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="text">Todo Text</label>
            <input type="text" id="text" />
            <button>Add Todo</button>
        </form>
    );
};

export default NewTodo;
```

<br><br>

## 4) Refs uesRef 작업하기

```typescript
import { useRef } from "react";

const NewTodo: React.FC = () => {
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = todoTextInputRef.current?.value; // ref에 값이 할당되어 있지 않을 수도 있으므로 ? 붙음
    };

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="text">Todo Text</label>
            <input type="text" id="text" ref={todoTextInputRef} />
            <button>Add Todo</button>
        </form>
    );
};

export default NewTodo;
```

<br>

-   위에서 ref에 값이 할당되어 있지 않을 수도 있으므로 ?를 IDE에서 자동으로 붙였다.
-   만약 이 시점에 값이 null이 아니라는 것을 확신한다면, 즉 레퍼런스와 요소가 연결되었다는 걸 알고 있다면 ? 대신 !를 사용할 수 있다.
-   ! 기호는 타입스크립트에게 이 값이 null이 될 수 있다는 건 알지만 이 시점에는 절대 null이 아니라고 알려준다. 그래서 이 값이 null이 아니라고 100% 확신하는 경우에만 !를 사용해야 한다. 위 예제에서는 확실히 연결이 완료된 경우이므로 !를 쓴다.
-   submitHandler는 ref가 처리되어 연결이 완료되기 전에는 호출될 수 없기 때문에 '!'를 사용한다.

<br><br>

## 5) Todo 제거하기

-   https://github.com/yoojh9/udemy-course-react/commit/b8f0c1e0c3fe4a0126c55784268ab091e612256d

<br><br>

## 6) Context API 및 TypeScript

-   https://github.com/yoojh9/udemy-course-react/commit/bfe384013ed9ecd12ecf1171768639c497552610

<br><br>

## 7) tsconfig 탐색

-   target: 작성할 코드를 어떤 자바스크립트 버전으로 변환할지 결정
-   lib: 타입스크립트 라이브러리. 예를 들면 NewTodo.tsx의 ref 타입인 HTMLInputElement을 사용할 수 있는건 이 dom 라이브러리를 추가했기 때문이다.
-   allowJs: .js 파일 포함 여부를 결정
-   strict: strict을 true로 두면 이 프로젝트에서 가장 엄격한 설정이 적용된다. 예를 들어, 이 모드에서는 묵시적인 any 타입을 사용할 수 없다.
-   jsx: 이 옵션으로 JSX 코드를 지원할건지 결과물로 어떤 코드를 생성할 건지 결정한다.
    <br>

```json
// tsconfig.json
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noFallthroughCasesInSwitch": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx"
    },
    "include": ["src"]
}
```
