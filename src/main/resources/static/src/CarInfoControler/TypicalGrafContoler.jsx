import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col, Row } from "react-bootstrap";


class TypicalGrafControler extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            isLogin: false,
            isGetContact: false,
            contact: ""
        };
    }

    componentDidMount(){
        fetch("/api/User/getLogin").then(res => res.text())
        .then((res) => {
            alert((res != "null"));
            this.setState({isLogin:(res != "null")});
        }, 
        (err) => {
            console.error(err);
        }
        );
    }

    update(){
    }

    componentWillUnmount(){
    }

   
    onClickButton(){
        fetch("/api/TradeCar/" + this.props.id + "/contact").then(res => res.text())
            .then((res) => {
                this.setState({isGetContact: true, contact: res});
                }, 
            (err) => {
                console.error(err);
            }
            );
        this.setState({newBet: 0});
    }

    render(){
        if(!this.state.isLogin)
            return(<div>Пожалуйста авторизутесь</div>);
        return(
            <div id="contact-block">
                { this.state.isGetContact ? this.state.contact :  <Button onClick={this.onClickButton.bind(this)} variant="primary">Primary</Button>}
            </div>
        );
    }

}

export default TypicalGrafControler;