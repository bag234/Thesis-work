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

class CarsMyControler extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            cars: []
        }
    }

    componentDidMount(){
        fetch("/api/TradeCar/my").then(res => res.json())
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
                <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                    <h2>Мои лоты</h2>
                    <p>Здесь вы можете посмотреть, изменить или удолть свои лоты.</p>
                    
                </div>
                <CardColumns>
                    {this.state.cars.map((elm) => <CarCard obj={elm} mode={true}/>)}
                </CardColumns>
            </div>
        );
    }

}

export default CarsMyControler;