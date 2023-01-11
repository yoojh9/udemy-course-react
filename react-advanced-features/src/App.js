import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    // 앱이 실행되고 한번만 실행 됨
    useEffect(() => {
        const storeUserLoggedInInformation = localStorage.getItem("isLoggedIn");
        if (storeUserLoggedInInformation === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <React.Fragment>
            {/* AuthContext.Provider는 컴포넌트로 AuthContext 컨텍스트가 필요한 컴포넌트들을 감쌀 수 있다. 
                모든 컴포넌트들은 AuthContext를 Wrapper로 사용하므로 AuthContext 컨텍스트에 접근할 수 있다       
            */}
            <AuthContext.Provider value={{isLoggedIn}}>
                <MainHeader onLogout={logoutHandler} />
                <main>
                    {!isLoggedIn && <Login onLogin={loginHandler} />}
                    {isLoggedIn && <Home onLogout={logoutHandler} />}
                </main>
            </AuthContext.Provider>
        </React.Fragment>
    );
}

export default App;
