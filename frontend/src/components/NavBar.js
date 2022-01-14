import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import {observer} from 'mobx-react-lite';


const NavBar = observer(() => {
    const {user} = useContext(Context);
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={"/"} className="brand">NavBar</NavLink>
             
                    <Nav className="ml-auto">
                        <NavLink to={"/"} className="brand">Admin</NavLink>
                        <NavLink to={"/"} className="brand">Exit</NavLink>
                    </Nav>
                    
                    <Nav className="ml-auto">
                        <NavLink to={"/tournaments"} className="brand">My tournaments</NavLink>
                        <NavLink to={"/login"} className="brand ms-3">Authorization</NavLink>
                    </Nav>
                
                
            </Container>
        </Navbar>
    );
})


export default NavBar;
