import styles from "./UserList.module.css";
import Card from "./UI/Card";

const UserList = (props) => {
    return (
        <Card className={styles.users}>
            <ul>
                {props.users?.map((user, index) => (
                    <li key={index}>
                        {user.name} ({user.age} Years old)
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default UserList;
