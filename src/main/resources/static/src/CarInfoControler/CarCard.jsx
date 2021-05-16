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

class CarCard extends React.Component {

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

    render() { //props.obj <-car object
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={"/api/Image/" + this.props.obj.imagesPath[0]} />
                <Card.Body>
                    <Card.Title>
                        {this.props.obj.brand}, {this.props.obj.model}, {this.props.obj.gen} - {this.props.obj.year} года 
                        <Badge variant={this.stageVarStateDecode(this.props.obj.state)}>{this.rusStateDecode(this.props.obj.state)}</Badge></Card.Title>
                    <Card.Text>
                        Тут возможно будет описание(нет)
                    </Card.Text>
                    <Button variant="primary" href={"/car/" + this.props.obj.id}>
                        {this.props.obj.trade.type == "OPEN"?"Торг" :"Подробние"}
                    </Button>
                    
                </Card.Body>
            </Card>
        );
    }

}

export default CarCard;