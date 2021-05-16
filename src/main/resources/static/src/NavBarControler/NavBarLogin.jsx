import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col, Nav, Row } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'

class NavBarLogin extends React.Component {

    render(){
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">АПА</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/car">Католог</Nav.Link>
                        <Nav.Link href="/addCar">Добавить</Nav.Link>
                        <Nav.Link href="/car">Аукцион</Nav.Link>
                    </Nav>
                    <Nav.Link href="/user">{this.props.login}</Nav.Link>/
                    <Nav.Link href="/logout">Выход</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

export default NavBarLogin;