import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";

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

    render(){
        console.log("sss");
        return (
            <div id="reg-controler">
                <h1>HELLO</h1>
                {this.state.isRiderct ? <Redirect to="/" /> : ""}
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">User name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        value= {this.state.name}
                        onChange = {this.onChangeName.bind(this)}
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                {this.state.loginState != "FREE" ? <Alert key='1' variant="danger"> Login is busy </Alert> : ""}
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Login</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        value= {this.state.login}
                        onChange = {this.onChangeLogin.bind(this)}
                        placeholder="login"
                        aria-label="Login"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">EMail</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        value= {this.state.eMail}
                        onChange = {this.onChangeeMail.bind(this)}
                        placeholder="example@mail.com"
                        aria-label="Login"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        value= {this.state.password}
                        onChange = {this.onChangePassword.bind(this)}
                        placeholder="HIDE"
                        aria-label="Login"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Button variant="primary" onClick={this.onClickButtonReg.bind(this)} block>
                    Registartion
                </Button>
            </div>
        );
    }

}

export default RegistrationControler;