# 리덕스 고급

## 1) Side Effects, Async Tasks & Redux

-   Reducer 함수는 순수한 함수여야 한다. side-effect은 없어야 하고, async가 아닌 synchronous 함수여야 한다.
-   그렇지만 이는 리덕스로 작업할 때 보내야하는 HTTP 요청과 같이 side-effect가 발생하는 일부 작업은 어디에 넣어야 하며, 리덕스로 작업할 때 발생하는 비동기 코드를 어디에 넣어야 하는지 의문이 생긴다.

<br>

<img src="./image.png" width="600px">

<br>
