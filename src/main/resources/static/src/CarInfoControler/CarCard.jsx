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
        if(this.props.mode)
        return (
            <Card style={{ width: '18rem', height: '22rem'}}>
                <Card.Img variant="top" style={{ width: '18rem', height: '10rem'}} src={"/api/Image/" + this.props.obj.imagesPath[0]} />
                <Card.Body>
                    <Card.Title>
                        {this.props.obj.brand}, {this.props.obj.model}, {this.props.obj.gen} - {this.props.obj.year} года 
                        <Badge variant={this.stageVarStateDecode(this.props.obj.state)}>{this.rusStateDecode(this.props.obj.state)}</Badge></Card.Title>
                    <Card.Text>
                    {this.props.obj.description == null ? "Описания нет" :
                            this.props.obj.description.length > 40 ? this.props.obj.description.slice(0,39) + "..." :
                                this.props.obj.description
                        }
                    </Card.Text>
                    <Button variant="primary" block href={"/change/" + this.props.obj.id}>
                        Изменить
                    </Button>
                    
                </Card.Body>
            </Card>
        );
        return (
            <Card style={{ width: '18rem', height: '22rem'}}>
                <Card.Img variant="top" style={{ width: '18rem', height: '10rem'}} src={"/api/Image/" + this.props.obj.imagesPath[0]} />
                <Card.Body>
                    <Card.Title>
                        {this.props.obj.brand}, {this.props.obj.model}, {this.props.obj.gen} - {this.props.obj.year} года 
                        <Badge variant={this.stageVarStateDecode(this.props.obj.state)}>{this.rusStateDecode(this.props.obj.state)}</Badge></Card.Title>
                    <Card.Text>
                        {this.props.obj.description == null ? "Описания нет" :
                            this.props.obj.description.length > 40 ? this.props.obj.description.slice(0,39) + "..." :
                                this.props.obj.description
                        }
                        <Button variant="primary" block href={"/car/" + this.props.obj.id}>
                            {this.props.obj.trade.type == "OPEN"?"Торг" :"Подробние"}
                        </Button>
                    </Card.Text>                 
                </Card.Body> 
            </Card>
        );
    }

}

export default CarCard;