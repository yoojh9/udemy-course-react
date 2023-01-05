import UserItem from "./UserItem"

const UserList = (props) => {
  return props.users ? 
    props.users.map((item, index) => <UserItem key={index} name={item.name} age={item.age}/>)
  : <></>
}

export default UserList