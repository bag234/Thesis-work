import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import CarCard from "./CarCard.jsx";

class CarsSellInfo extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            cars: []
        }
    }

    componentDidMount(){
        fetch(this.props.link).then(res => res.json())
            .then(
                (res) => {
                    this.setState({cars: res});
                },  
                (err) => console.error(err)
            );
    }

    render(){
        return(
            <div id="carsmy-controler">
                <h1>
                    {this.props.name}
                </h1>
                <CardColumns>
                    {this.state.cars.map((elm) => <CarCard obj={elm} mode={false}/>)}
                </CardColumns>
            </div>
        );
    }

}

export default CarsSellInfo;