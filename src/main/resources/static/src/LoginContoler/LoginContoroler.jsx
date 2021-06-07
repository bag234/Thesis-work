import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col, Nav, Row } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'

class LoginControler extends React.Component{

    render(){
        return (
            <Form method="POST" action="/login">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="username" name="username" placeholder="Введте логин" />
        
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Папроль" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Войти
                </Button>
            </Form>
        );
    }

}

export default LoginControler;