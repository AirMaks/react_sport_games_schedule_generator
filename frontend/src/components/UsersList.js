import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../index";
import UserItem from "./UserItem";



const UsersList = observer(() => {
    const {users} = useContext(Context);
    return (
        <Container>
            <h1 className="mt-5">Список пользователей</h1>
            <ul className="mt-5 tournaments-list">
                { users.users.map((user, index) => (
                    <UserItem key={user.id} user={user} index={index}/>
                ))}
            </ul>
        </Container>
    )
})

export default UsersList;