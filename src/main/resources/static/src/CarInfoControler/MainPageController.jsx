import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import CarCard from "./CarCard.jsx";

class MainPageController extends React.Component{

    constructor(){
        super();
        this.state ={
            isLoding: false,
            newCar: [],
            endCar: []    
        }  
    }

    componentDidMount(){
        fetch("/api/TradeCar/end").then(res => res.json())
            .then((resp) => {
                console.log(resp);
                this.setState({ endCar: resp });
            },
                (error) => {
                    console.error(error);
                }
            );
        fetch("/api/TradeCar/new").then(res => res.json())
            .then((resp) => {
                console.log(resp);
                this.setState({ newCar: resp, isLoding: true });
            },
                (error) => {
                    console.error(error);
                }
            );
        this.setState({ isLoding: true });
    }

    render(){
        if(this.state.isLoding){
           return(<div>
                
               <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                   <div class="col-md-6 px-0">
                       <h1 class="display-4 fst-italic">Аукцион подержаных автомобилей</h1>
                       <p class="lead my-3"></p>
                       <p class="lead mb-0"><a href="/car" class="text-white fw-bold">Смотреть предложения</a></p>
                   </div>
               </div>
                <h3>Новинки на нашем сайт:</h3>
                <CardColumns>
                    {
                        this.state.newCar.slice(0,5).map(elm => <CarCard obj={elm} mode={false}/>)
                    }
                </CardColumns>
                <h3>Успей:</h3>
                <CardColumns className="">
                    {
                        this.state.newCar.slice(0,5).map(elm => <CarCard obj={elm} mode={false}/>)
                    }
                </CardColumns>
                
                </div>)
        }
        return("LOding");
        
    }

}

export default MainPageController;