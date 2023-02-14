# React Router v6로 업그레이드 하기

## 1) react router v6 설치

<br>

```
$ npm install react-router-dom@6
$ npm install react-router-dom@latest
```

<br>

## 2) Router v6 사용법

- \<Switch\> 대신에 \<Routes\> 를 사용한다.
- \<Route\>에 element로 컴포넌트를 넘긴다.
- v6에서는 exact 프로퍼티가 사라지고 Route를 정의해놓으면 정확히 일치하는 항목을 보여준다.

<br>

```javascript
// v5
    <Switch>
        <Route path='/welcome'>
            <Welcome />
        </Route>
        <Route path='/products' exact>
            <Products />
        </Route>
        <Route path='/products/:productId'>
            <ProductDetail />
        </Route>
    </Switch>
```

<br>

```javascript
// v6
    <Routes>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:productId' element={<ProductDetail/>}/>
    </Routes>
```



<br><br>

- v6에서는 activeClassName 프로퍼티가 사라짐.

<br>

```javascript
// v5
    <NavLink activeClassName={classes.active} to='/welcome'>
        Welcome
    </NavLink>
```


<br>

```javascript
// v6
    <NavLink className={(navData)=>navData.isActive ? classes.active : ''} to='/welcome'>
        Welcome
    </NavLink>
```

<br><br>

- Redirect 컴포넌트가 더이상 존재하지 않음 -> Navigate로 변경됨

<br>

```javascript
// v5
    <Switch>
        <Route path="/" exact>
            <Redirect to="/welcome"/>
        </Route>
        <Route path='/welcome'>
            <Welcome />
        </Route>
        <Route path='/products' exact>
            <Products />
        </Route>
        <Route path='/products/:productId'>
            <ProductDetail />
        </Route>
    </Switch>
```

<br>

```javascript
// v6
    <Routes>
        <Route path="/" element={<Navigate replace to="/welcome"/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:productId' element={<ProductDetail/>}/>
    </Routes>
```

<br><br>

- Nested Route일 경우에도 <Routes>로 wrapping 해야 함

```javascript
// v5
const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Route path="/welcome/new-user">
        <p>Welcome, new user!</p>
      </Route>
    </section>
  )
};
```

<br>

```javascript
// v6
const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Routes>
        <Route path="/new-user" element={<p>Welcome, new user!</p>}/>          
      </Routes>
    </section>
  )
};

export default Welcome;
```

<br><br>


### (1) Nested Route 사용하기

- App.js에서 중첩 라우트를 사용할 경로에 \/*를 추가한다.

<br>

```javascript
function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/welcome"/>}/>
          <Route path='/welcome/*' element={<Welcome/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/:productId' element={<ProductDetail/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;

```

<br>

- 중첩된 라우트의 경로는 부모 라우트의 경로에 상대적이므로 \/welcome\/new-user 대신 \/new-user 경로만 작성한다.

```javascript
import { Route, Routes } from "react-router";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Link to="new-user">New User</Link>
      <Routes>
        <Route path="new-user" element={<p>Welcome, new user!</p>}/>          
      </Routes>
    </section>
  )
};


export default Welcome;
```

<br>

- \<Link\> 컴포넌트 경로도 상대 경로로 작성한다.

<br>

```javascript
    <Link to="new-user">New User</Link>
```

<br><br>

### (2) Nested Route 다르게 사용하기

- 메인 라우트에서 중첩 라우트까지 같이 적용할 수 있다.
- \<Outlet\> 컴포넌트를 사용하여 중첩 라우트 콘텐츠가 삽입될 위치를 지정할 수 있다.

<br>

```javascript
function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/welcome"/>}/>
          <Route path='/welcome/*' element={<Welcome/>}>
            <Route path="new-user" element={<p>Welcome, new user!</p>}/>          
          </Route>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/:productId' element={<ProductDetail/>}/>
        </Routes>
      </main>
    </div>
  );
}
```

<br>

```javascript
import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Link to="new-user">New User</Link>
      <Outlet/>
    </section>
  )
};
```

<br><br>

### (3) useHistory() -> useNavigate()

```javascript
const navigate = useNavigate();
navigate('/welcome');   // push

naviate('/welcome', {replace: true}) // redirect

navigate(-1); // history.goBack();
navigate(-2); // prev prev page
navigate(1); // next page
```

<br><br>

### (4) Prompt
- v6에는 당장 포함되어 있지 않아서 자체적으로 구현해야 함