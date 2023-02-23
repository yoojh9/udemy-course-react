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

-   리액트와 타입스크립트로 함수형 컴포넌트를 만드려면 React.FC 타입을 함수형 컴포넌트의 상수 옆에 사용한다. 그리고 <{}> 붙인 다음 그 괄호 사이에 필요한 형태의
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
