import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col, Row } from "react-bootstrap";
import NavBarLogin from "./NavBarLogin.jsx";
import NavBarUnLogin from "./NavBarUnLogin.jsx";

class NavBarControler extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLogin: false,
            login: "null"
        }
    }
    
    componentDidMount(){
        fetch("/api/User/getLogin").then(res => res.text())
        .then(
            (res) => {
                this.setState({isLogin: (res != "null"), login: res})
            },
            (err) => console.error(err)
        );
    }

    render(){
        return this.state.isLogin ? 
            <NavBarLogin login={this.state.login} /> : <NavBarUnLogin />;
    }

}

export default NavBarControler;