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

<br>

- v6에서는 exact 프로퍼티가 사라지고 Route를 정의해놓으면 정확히 일치하는 항목을 보여준다.

<br><br>

```javascript
// v5
    <NavLink activeClassName={classes.active} to='/welcome'>
        Welcome
    </NavLink>
```

- v6에서는 activeClassName 프로퍼티가 사라짐.

<br>

```javascript
// v6
    <NavLink className={(navData)=>navData.isActive ? classes.active : ''} to='/welcome'>
        Welcome
    </NavLink>
```

