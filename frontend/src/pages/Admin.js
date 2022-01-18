import Container from "react-bootstrap/Container";
import UsersList from "../components/UsersList";
import { fetchUsers } from "../http/userAPI";
import React, {useContext, useEffect} from 'react';
import { Context } from "../index";

const Admin = () => {

    const {users} = useContext(Context);

    useEffect(() => {
        fetchUsers().then(data => {
         users.setUsers(data)
        })

    }, []);

    console.log(users);
    return (
        <Container>
            <UsersList />
        </Container>
    )
}


export default Admin;
