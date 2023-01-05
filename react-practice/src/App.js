import { useState } from 'react';
import './App.css';
import AddUser from './components/Users/AddUser';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([{name: 'Jeonghyun', age: 34}, {name: 'Yong', age: 36}]);

  const addUser = (name, age) => {
    setUsers(prev => [...prev, {name, age}]);
  }

  return (
    <div >
      <AddUser addUser={addUser}/>
      <UserList users={users} />
    </div>
  );
}

export default App;
