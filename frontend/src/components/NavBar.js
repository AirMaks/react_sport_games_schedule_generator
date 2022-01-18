import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/constants';

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();


    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={"/"} className="brand">NavBar</NavLink>
                    {
                        user.isAuth ? 
                        <Nav className="ml-auto d-flex align-items-center">
                            <NavLink to={"/tournaments"} className="brand">Мои турниры</NavLink>
                            <NavLink to={ADMIN_ROUTE} className="brand ms-3">Админ</NavLink>
                            <Button className="brand ms-3" onClick={() => logOut()}>Выйти</Button>
                            
                        </Nav>
                        :
                        <Nav className="ml-auto">
                            
                            <NavLink to={"/login"} className="brand ms-3">Авторизация</NavLink>
                        </Nav>
                    }
                    
                
                
            </Container>
        </Navbar>
    );
})


export default NavBar;
