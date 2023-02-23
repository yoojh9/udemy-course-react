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
