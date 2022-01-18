import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation, useNavigate} from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constants';
import { login, registration } from '../http/userAPI';
import {observer} from 'mobx-react-lite';
import { Context } from '../index';


const Auth = observer(() => {

    const {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const navigate = useNavigate();
    const [user_login, setUserLogin] = useState(''); 
    const [password, setPassword] = useState(''); 

    const click = async () => {

        try {
            let data;

            if (isLogin) {
                data = await login(user_login, password);
            } else {
                data = await registration(user_login, password);
            }

            user.setUser(user);
            user.setIsAuth(true);
            navigate('/')
        } catch (e) {
            alert(e.response.data.message);
        }
        
    }


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 40}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className='m-auto'>{isLogin ? "Authorization" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Enter login" value={user_login} onChange={e => setUserLogin(e.target.value) }/>
                    <Form.Control className="mt-3" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value) }/>
                    <Row className="mt-3">
                        {isLogin ? 
                            <div>Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink></div>
                            :
                            <div>Have an account? <NavLink to={LOGIN_ROUTE}>Enter!</NavLink></div>
                        }
                        <Button className="mt-3 align-self-end" onClick={click}>{isLogin ? "Go!" : "Registration"}</Button>
                    </Row>
                    
                </Form>

            </Card>
        </Container>
    );
})


export default Auth;