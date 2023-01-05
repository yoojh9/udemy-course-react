import React from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './AddUser.module.css'

const AddUser = props => {
  const addUserHandler = (event) => {
    event.preventDefault();
  }

  return (
    // Card라는 사용자가 직접 만든 component에 className을 사용하면 jsx의 className 프로퍼티를 사용하는게 아니라 props로 인식이 된다.
    <Card className={styles.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor='username'>Username</label>
        <input id="username" type="text"></input>
        <label htmlFor='age'>Age (Years)</label>
        <input id="age" type="number"></input>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  )
};

export default AddUser