import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Carousel from 'react-bootstrap/Carousel'
import Badge from 'react-bootstrap/Badge'

class BetGrafComp extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            trade: {},
            newBet: 0,
            isonButton: true,
            isLogin: false
        };
    }

    componentDidMount(){
        this.intervalup = setInterval(() => this.update(), 5000);
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
        fetch("/api/TradeCar/" + this.props.id + "/trade" ).then(res => res.json())
        .then((res) => {
            this.setState({trade: res});
        }, 
        (err) => {
            console.error(err);
        }
        );
    }

    componentWillUnmount(){
        clearInterval(this.intervalup);
    }

    onChangeBetCount(event){ 
        this.setState({newBet: event.target.text});
    }

    onClickButton(){
        let foda = new FormData();
        alert(this.state.newBet);
        foda.append("newBet", this.state.newBet);
        fetch("/api/TradeCar/" + this.props.id + "/bet",{
            method:"POST",
            body: foda
        } ).then(res => res.text())
        .then((res) => {
            if(res == "false")
                alert(res);
        }, 
        (err) => {
            console.error(err);
        }
        );
        this.setState({newBet: 0});
    }

    render(){
        // if(!this.state.isLogin)
        //     return(<div>Пожалуйста авторизутесь</div>);
        return(
            <div id="bet-block">
                <Col>
                    <Form.Group controlId="TradeCar.Barnd">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control onChange={this.onChangeBetCount.bind(this)} value={this.state.newBet}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Button disabled={!this.state.isonButton} onClick={this.onClickButton.bind(this)} variant="primary">Primary</Button>{' '}
                </Col>
            </div>
        );
    }

}

export default BetGrafComp;