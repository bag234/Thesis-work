import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'

function ModalName(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-font-fill" viewBox="0 0 16 16">
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.057 4h5.886L11 6h-.5c-.18-1.096-.356-1.192-1.694-1.235l-.298-.01v6.09c0 .47.1.582.903.655v.5H6.59v-.5c.799-.073.898-.184.898-.654V4.755l-.293.01C5.856 4.808 5.68 4.905 5.5 6H5l.057-2z"/>
            </svg>
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="user.name">
                        <Form.Label>{props.name}</Form.Label>
                        <Form.Control 
                            onChange={props.change}
                            value = {props.val}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => {props.update(); handleClose()}}>
                        Изменить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

class UserPageControler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            login: "",
            type: "",
            id: 0
        };
    }

    componentDidMount() {
        this.update();
    }

    update() {
        fetch("/api/User/me").then(res => res.json())
            .then(
                (res) => {
                    this.setState({ id: res.id, name: res.name, login: res.login, email: res.eMail, type: res.type });
                },
                (err) => console.error(err)
            );
    }

    rusTypeDecode(code) {
        if (code == "IDENT")
            return "Проверенна почта"
        if (code == "NOT_IDENT")
            return "Не проверенна почта"
        return code;
    }

    // colerTypeDecode(code){
    //     if(code == "IDENT")
    //         return "Проверенна"
    //     if(code == "NOT_IDENT")
    //         return "Не проверенна"
    //     return code;
    // } возможно потом

    changeName(){
        fetch("/api/User/name", {
            method: "PUT",
            body:this.state.name
        }).then(res => res.text())
        .then(
            (res) => {
                if(res == "false")
                    alert("error change");
                else
                    this.update()
            },
            (err) => {
                console.error(err);
            }
        );
    }

    changeeMail(){
        fetch("/api/User/eMail", {
            method: "PUT",
            body:this.state.email
        }).then(res => res.text())
        .then(
            (res) => {
                if(res == "false")
                    alert("error change");
                else
                    this.update()
            },
        );
    }

    changePassword(){
        fetch("/api/User/password", {
            method: "PUT",
            body:this.state.password
        }).then(res => res.text())
        .then(
            (res) => {
                if(res == "false")
                    alert("error change");
                else
                    this.update()
            },
            (err) => {
                console.error(err);
            }
        );
    }

    checkeMail(){
        fetch("/mail");
    }

    render() {
        return (
            <div>
                <h1>{this.state.id + "@" + this.state.login}</h1>
                <Row className=".mb3">
                    <Col sm={3}>
                        <h3>Вас зовут</h3>
                    </Col>
                    <Col lg="auto" sm={6}>
                        <h3>{this.state.name}</h3>   
                    </Col>
                    <Col sm={3}>
                        <ModalName 
                            val={this.state.name} 
                            name="Новое имя"
                            title="Изменение имени"
                            change={(evnt) => this.setState({name: evnt.target.value})} 
                            update={() => {this.changeName()}}
                        />
                    </Col>
                </Row>
                <Row className=".mb3">
                    <Col sm={3}>
                        <h3>Ваша почта</h3>
                    </Col>
                    <Col lg="auto" sm={6}>
                        <h3>{this.state.email}</h3>
                    </Col>
                    <Col>
                        <ModalName 
                            val={this.state.email} 
                            name="Новая почта"
                            title="Изменение почты"
                            change={(evnt) => this.setState({email: evnt.target.value})} 
                            update={() => {this.changeeMail()}}
                        />
                        {this.state.type == "NOT_IDENT"? 
                        <Button variant="warning" onClick={this.checkeMail.bind(this)}>
                            Проверить почту
                        </Button>
                        : ""}
                    </Col>
                </Row>
                <Row className=".mb3">
                    <Col sm={3}>
                        <h3>Пароль</h3>
                    </Col>
                    <Col lg="auto" sm={6}>
                        <ModalName 
                            val={this.state.password} 
                            name="Новый пароль"
                            title="Изменение пароля"
                            change={(evnt) => this.setState({password: evnt.target.value})} 
                            update={() => {this.changePassword()}}
                        />
                    </Col>
                </Row>
                <Row className=".mb3">
                    <Col sm={3}>
                        <h3>Ваш статус</h3>
                    </Col>
                    <Col lg="auto" sm={6}>
                        {this.rusTypeDecode(this.state.type)}
                    </Col>
                </Row>
                <Button variant="primary" size="lg" block href={"/change"}>
                    Мои лоты
                </Button>
            </div>
        );
    }

}

export default UserPageControler;