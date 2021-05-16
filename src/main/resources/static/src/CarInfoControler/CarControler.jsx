import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Carousel from 'react-bootstrap/Carousel'
import Badge from 'react-bootstrap/Badge'
import BetGrafComp from "./BetGrafComp.jsx";
import TypicalGrafControler from "./TypicalGrafContoler.jsx";

class CarControler extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            carObj: {},
            isContact: false,
            conntact: "",
            isLoginErro: false,
            isLoding: false,
            autoUpdate: false
        }
    }

    componentDidMount(){
        fetch("/api/TradeCar/" + this.props.match.params.id).then(res => res.json())
            .then(
                (response) => {
                    this.setState({isLoding: true, carObj: response});
                },
                (error) =>{
                    console.log(error);
                }
             );
    }

    rusStateDecode(state){
        if(state == "BAD")
            return "Плохое";
        if(state == "NORMAL")
            return "Нормальное";
        if(state == "GOOD")
            return "Хорошое";
        return "error";
    }

    stageVarStateDecode(state){
        if(state == "BAD")
            return "danger";
        if(state == "NORMAL")
            return "primary";
        if(state == "GOOD")
            return "success";
        return "warning";
    }

    render(){
        if(this.state.isLoding)
        return(
        <div>
            <h1>
                {this.state.carObj.brand}, {this.state.carObj.model}, {this.state.carObj.gen} - {this.state.carObj.year} года 
                <Badge variant={this.stageVarStateDecode(this.state.carObj.state)}>{this.rusStateDecode(this.state.carObj.state)}</Badge>
            </h1>
            <Carousel>
                {
                    this.state.carObj.imagesPath.map((elm) => {
                        return(<Carousel.Item>
                            <img src = {"/api/Image/" + elm}/>
                        </Carousel.Item>);
                    })
                }
            </Carousel>
            <Card.Body>
                {this.state.carObj.trade.type == "OPEN" ? <BetGrafComp id={this.state.carObj.id} /> : ""}
                {this.state.carObj.trade.type == "TYPICAL" ? <TypicalGrafControler id={this.state.carObj.id} /> : ""}
            </Card.Body>
        </div>);
        return <h2>LODING</h2>
    }

}

export default CarControler;