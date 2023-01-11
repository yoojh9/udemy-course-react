import React from 'react';

// context 객체 생성
const AuthContext = React.createContext({
  isLoggedIn: false
}); 

export default AuthContext;
