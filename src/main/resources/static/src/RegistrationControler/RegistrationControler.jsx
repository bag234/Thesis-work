import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Row, Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Carousel from 'react-bootstrap/Carousel'
import Badge from 'react-bootstrap/Badge'
import { Redirect } from "react-router";

class RegistrationControler extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            login: "",
            eMail: "",
            password: "",
            loginState: "SHORT",
            isRiderct: false
        }
        
    }

    onChangeName(event){
        this.setState({name: event.target.value});
    }

    onChangeLogin(event){
        this.setState({login: event.target.value});
        if(event.target.value.length > 5){
            fetch("registration/check",{
                method: "POST",
                headers:{
                    'Content-Type': 'text/html'
                },
                body: event.target.value
            }).then(res => res.text()).then(
                (response) => {
                    console.log(response);
                    this.setState({loginState: response});
                },
                (error) => {
                    console.error(error);
                }
            );
        }
        else
            this.setState({loginState: "SHORT"});
    }

    onChangeeMail(event){
        this.setState({eMail: event.target.value});
    }

    onChangePassword(event){
        this.setState({password: event.target.value});
    }

    onClickButtonReg(){
        let jsCom = {
            login: this.state.login,
            name: this.state.name,
            eMail: this.state.eMail,
            password: this.state.password
        }
        console.log(jsCom)
        fetch("/registration" ,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsCom)
        });
        this.setState({isRiderct: true});
    }

    decodeText(code){
        //SHORT, BUSY, FREE
        console.log(code);
        if(code == "SHORT")
            return "Логин слишком короткий";
        if(code == "BUSY")
            return "Логин занят другим пользователем";
        if(code == "FREE")
            return "Логин свободен";
        return "пытаюсь разобрать?"
    }

    render(){
        console.log("sss");
        return (
            <div id="reg-controler" class="">
                 {this.state.isRiderct ? <Redirect to="/" /> : ""}
                <Row>
                    <Col>
                    <Form.Group controlId="reg.name">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control 
                            placeholder="Как к вам будут обращаться?" 
                            onChange={this.onChangeName.bind(this)}
                            value = {this.state.name}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="reg.login">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="login" placeholder="Введите логин" 
                                onChange={this.onChangeLogin.bind(this)}
                                value = {this.state.login}
                            />
                            <Form.Text className="text-muted" >
                                {this.decodeText(this.state.loginState)}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="reg.email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="example@mail.com" 
                        onChange = {this.onChangeeMail.bind(this)}
                        value = {this.state.eMail}
                    />
                    <Form.Text className="text-muted" >
                        Почта для уведомлений
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="reg.password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                        onChange = {this.onChangePassword.bind(this)}
                        value = {this.state.password}
                    />
                    <Form.Text className="text-muted" >
                        от 6 символов
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={this.onClickButtonReg.bind(this)} block>
                    Зарегистрироваться 
                </Button>
            </div>
        );
    }

}

export default RegistrationControler;