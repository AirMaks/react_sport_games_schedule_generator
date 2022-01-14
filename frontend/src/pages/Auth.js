import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constants';

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 40}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className='m-auto'>{isLogin ? "Authorization" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" plaecholder="Enter login"/>
                    <Form.Control className="mt-3" plaecholder="Enter password"/>
                    <Row className="mt-3">
                        {isLogin ? 
                            <div>Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink></div>
                            :
                            <div>Have an account? <NavLink to={LOGIN_ROUTE}>Enter!</NavLink></div>
                        }
                        <Button className="mt-3 align-self-end">{isLogin ? "Go!" : "Registration"}</Button>
                    </Row>
                    
                </Form>

            </Card>
        </Container>
    );
}


export default Auth;