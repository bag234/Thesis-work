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

class CarsControler extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            TypeBodyCar: [],
            TypeDriveUnitCar: [],
            TypeHeadLightCar: [],
            TypeMediaCar: [],
            TypeMotorCar: [],
            typeBodyCar: [],
            typeDriveUnitCar: [],
            typeHeadLightCar: [],
            typeMediaCar: [],
            typeMotorCar: [],
            carsRen: [],
            carsSort: [],
            isSort: false,
            isAutoRunMotor: false,
            state: "NONE",  // NORMAL, BAD, GOOD, NONE
            isIgnoreAutoRun: true
        }
    }

    componentDidMount(){
        fetch("/api/get/TypeBody").then(res => res.json())
            .then((resp) => {
                console.log(resp);
                this.setState({ TypeBodyCar: resp });
            },
                (error) => {
                    console.error(error);
                }
            );
        fetch("/api/get/TypeDriveUnit").then(res => res.json())
            .then((resp) => {
                console.log(resp);
                this.setState({ TypeDriveUnitCar: resp });
            },
                (error) => {
                    console.error(error);
                }
            );
        fetch("/api/get/TypeHeadLight").then(res => res.json())
            .then((resp) => {
                console.log(resp);
                this.setState({ TypeHeadLightCar: resp });
            },
                (error) => {
                    console.error(error);
                }
            );
        fetch("/api/get/TypeMedia").then(res => res.json())
            .then((resp) => {
                console.log(resp);
                this.setState({ TypeMediaCar: resp });
            },
                (error) => {
                    console.error(error);
                }
            );
        fetch("/api/get/TypeMotor").then(res => res.json())
            .then((resp) => {
                console.log(resp);
                this.setState({ TypeMotorCar: resp });
            },
                (error) => {
                    console.error(error);
                }
            );
        fetch("/api/TradeCar").then(res => res.json())
            .then(
                (res) => {
                    this.setState({carsRen: res});
                },  
                (err) => console.error(err)
            );
    }
    
    checkedControlBodyCar(event, type) {
        let arr = this.state.typeBodyCar;
        if (event.target.checked) {
            arr.push(type);
            console.log("Chechked");
        }
        else {
            if(arr.indexOf(type) == 0){
                arr.shift();
            } 
            arr.splice(arr.indexOf(type), arr.indexOf(type));
            console.log("UnChechked");
        }
        console.log(arr);
        this.setState({typeBodyCar: arr});
    }

    checkedControlDriveUnitCar(event, type) {
        let arr = this.state.typeDriveUnitCar;
        if (event.target.checked) {
            arr.push(type);
        }
        else {
            if(arr.indexOf(type) == 0){
                arr.shift();
            } 
            arr.splice(arr.indexOf(type), arr.indexOf(type));
        }
        console.log(arr);
        this.setState({typeDriveUnitCar: arr });
    }

    checkedControlHeadLightCar(event, type) {
        let arr = this.state.typeHeadLightCar;
        if (event.target.checked) {
            arr.push(type);
        }
        else {
            if(arr.indexOf(type) == 0){
                arr.shift();
            } 
            arr.splice(arr.indexOf(type), arr.indexOf(type));
        }
        console.log(arr);
        this.setState({typeHeadLightCar: arr });
    }

    checkedControlMediaCar(event, type) {
        console.log("Media");
        let arr = this.state.typeMediaCar;
        if (event.target.checked) {
            arr.push(type);
        }
        else {
            if(arr.indexOf(type) == 0){
                arr.shift();
            } 
            arr.splice(arr.indexOf(type), arr.indexOf(type));
        }
        console.log(arr);
        this.setState({typeMediaCar: arr });
    }

    checkedControlMotorCar(event, type) {
        console.log("Motr");
        let arr = this.state.typeMotorCar;
        if (event.target.checked) {
            arr.push(type);
        }
        else {
            if(arr.indexOf(type) == 0){
                arr.shift();
            } 
            arr.splice(arr.indexOf(type) , arr.indexOf(type));
        }

        this.setState({typeMotorCar: arr });
    }

    sort(){
        let carsSort = [];
        for (let elm of this.state.carsRen){
            console.log("End1")
            if(!this.isContain(this.state.typeBodyCar, elm.typeBodyCar))
                continue;
            console.log("End2")
            if(!this.isContain(this.state.typeDriveUnitCar, elm.typeDriveUnitCar))
                continue;
            console.log("End3")
            if(!this.isContain(this.state.typeHeadLightCar, elm.typeHeadLightCar))
                continue;
            console.log("End4")
            if(!this.isContain(this.state.typeMotorCar, elm.typeMotorCar))
                continue;
            console.log("End5")
            if(!this.isContain(this.state.typeMediaCar, elm.typeMediaCar))
                continue;
            if (!this.state.isIgnoreAutoRun)
                if(this.state.isAutoRunMotor != elm.autoRunMotor)
                    continue;
            console.log("End")
            if(this.state.state != "NONE")
                if(this.state.state != elm.state)
                    continue;
            console.log("start")
            carsSort.push(elm);
        }
        console.log("carsSort");
        console.log(carsSort);
        this.setState({carsSort: carsSort, isSort: true});
    }

    isContain(arr1, arr2){
        let answ = true;
        if(arr1.length == 0) 
            return true;
        if(arr2.length < arr1.length)
            return false;
        arr2.forEach(elm => {
            if (arr1.indexOf(elm) == -1)
               answ = false;
        });
        return answ;
    }

    render(){
        return(
            <div id="cars-controler">
                <div id="cars-filter">
                    <h3>Фильтры:</h3>
                    <div id="types-car-filter">
                        <Col>{this.state.state == "NONE"}
                            <Form.Label>Тип салона:</Form.Label>
                                {
                                    this.state.TypeBodyCar.map((elm) => {
                                        return (<Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeBody." + elm}
                                            className="mb-2"
                                            label={elm}
                                            onClick={(e) => this.checkedControlBodyCar(e, elm)}
                                        />);
                                    })
                                }
                        </Col>
                        <Col>
                            <Form.Label>Тип рулевой:</Form.Label>
                                {
                                    this.state.TypeDriveUnitCar.map((elm) => {
                                        return (<Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeDriveUnit." + elm}
                                            className="mb-2"
                                            label={elm}
                                            onClick={(e) => this.checkedControlDriveUnitCar(e, elm)}
                                        />);
                                    })
                                }
                        </Col>
                        <Col>
                            <Form.Label>Тип фар:</Form.Label>
                                {
                                    this.state.TypeHeadLightCar.map((elm) => {
                                        return (<Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeHeadLight." + elm}
                                            className="mb-2"
                                            label={elm}
                                            onClick={(e) => this.checkedControlHeadLightCar(e, elm)}
                                        />);
                                    })
                                }
                        </Col>
                        <Col>
                            <Form.Label>Тип Медио системы:</Form.Label>
                                {
                                    this.state.TypeMediaCar.map((elm) => {
                                        return (<Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeMedia." + elm}
                                            className="mb-2"
                                            label={elm}
                                            onClick={(e) => this.checkedControlMediaCar(e, elm)}
                                        />);
                                    })
                                }
                        </Col>
                        <Col>
                            <Form.Label>Тип мотора:</Form.Label>
                                {
                                    this.state.TypeMotorCar.map((elm) => {<Form.Check
                                        inline
                                        checked = {this.state.state == "BAD"}
                                        label="Плохое"
                                        type="radio"
                                        name="Star"
                                        onClick={(e) => this.setState({ state: "BAD" })}
                                    />
                                        return (<Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeMotor." + elm}
                                            className="mb-2"
                                            label={elm}
                                            onClick={(e) => this.checkedControlMotorCar(e, elm)}
                                        />);
                                    })
                                }
                        </Col>
                    </div>
                    <div id="state-car-filter">
                        <Form.Label>Оценка состояния</Form.Label>
                        <Form.Check
                            inline
                            checked = {this.state.state == "NONE"}
                            label="Не важно"
                            type="radio"
                            name="Star"
                            onClick={(e) => this.setState({ state: "NONE" })}
                        />
                        <Form.Check
                            inline
                            label="Плохое"
                            type="radio"
                            name="Star"
                            onClick={(e) => this.setState({ state: "BAD" })}
                        />
                        <Form.Check
                            inline
                            label="Нормальное"
                            type="radio"
                            onClick={(e) => this.setState({ state: "NORMAL" })}
                            name="Star"
                        />
                        <Form.Check
                            inline
                            label="Хорошое"
                            type="radio"
                            onClick={(e) => this.setState({ state: "GOOD" })}
                            name="Star"
                        />
                    </div>
                    <div id="autoRun-car-filter">
                    <Form.Label>Авто запуск:</Form.Label>
                        <Form.Check
                            inline
                            checked = {this.state.isIgnoreAutoRun}
                            label="Не важно"
                            type="radio"
                            name="Motor"
                            onClick={(e) => this.setState({ isIgnoreAutoRun:true })}

                        />
                        <Form.Check
                            inline
                            label="Да"
                            type="radio"
                            name="Motor"
                            onClick={(e) => this.setState({ isAutoRunMotor: true, isIgnoreAutoRun:false  })}

                        />
                        <Form.Check
                            inline
                            label="Нет"
                            type="radio"
                            onClick={(e) => this.setState({ isAutoRunMotor: false, isIgnoreAutoRun: false })}
                            name="Motor"
                        />
                    </div>
                    <Button onClick={(elm) => this.sort()} >Применить Фильтры</Button>
                    <Button onClick={(elm) => this.setState({isSort: false})} >Снять Фильтры</Button>
                </div>
                <CardColumns>
                    {!this.state.isSort ? 
                        this.state.carsRen.map((elm) => <CarCard obj={elm} mode={false}/>) :
                        this.state.carsSort.map((elm) => <CarCard obj={elm} mode={false}/>) }
                </CardColumns>
            </div>
        );
    }

}

export default CarsControler;
