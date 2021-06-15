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
            isIgnoreAutoRun: true,
            isLoding: false
        }
    }

    rusMultimedia(meta){
        // ["AUX","BLUETHON","CD","USB","MON","GPS"]
        if (meta == "AUX")
            return "Aux";
        if (meta == "CD")
            return "CD";
        if (meta == "BLUETHON")
            return "Bluethon";
        if (meta == "USB")
            return "usb";
        if (meta == "MON")
            return "Монитор";
        return meta;
    }

    rusHedaLight(meta){
        if (meta == "LED")
            return "Светодиодные";
        if (meta == "FROG")
            return "Противотуманные";
        if (meta == "XSEON")
            return "Ксеон";
        return meta;
    }
    
    rusMotor(meta){
        //["PETROL","PETROLPB","PETROLM","PETROLG","DISEL","DISELG","ELECTRO"]
        if (meta == "PETROL")
            return "Бензин";
        if (meta == "PETROLPB")
            return "Бензин Пропан-бутан";
        if (meta == "PETROLG")
            return "Бензин Гибрид";
        if (meta == "PETROLM")
            return "Бензин Метан";
        if (meta == "DISEL")
            return "Дизель";
        if (meta == "DISELG")
            return "Дизель гебрид";
        if (meta == "ELECTRO")
            return "Электро";
        return meta;
    }

    rusDriveUnit(meta){
        //["BEFORE","AFTER","SWITCH","FULL"]
        if (meta == "BEFORE")
            return "Передний";
        if (meta == "AFTER")
            return "Задний";
        if (meta == "SWITCH")
            return "Переключаемый";
        if (meta == "FULL")
            return "Полный";
        return meta;
    }

    rusBodyCar(meta){
        // ["SUV3","SUV5","CABRIOLETE","COMP","LIMUSINE"]
        if (meta == "SUV3")
            return "Внедорожник 3 дв.";
        if (meta == "SUV5")
            return "Внедорожник 5 дв.";
        if (meta == "CABRIOLETE")
            return "Кабриолет";
        if (meta == "COMP")
            return "Купе";
        if (meta == "LIMUSINE")
            return "Лимузин";
        return meta;
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
        this.setState({isLoding: true});
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
        if(!this.state.isLoding)
            return(<h1>loding....  wait</h1>)
        return(
            <div id="cars-controler">
                <div id="cars-filter" className="mb-4">
                    <h3>Фильтры:</h3>
                    <div id="types-car-filter">
                        <Row md={4} className="ml-1">
                            <Form.Label>Какой Кузов:</Form.Label>
                                {
                                    this.state.TypeBodyCar.map((elm) => {
                                        return (<Col md="auto"><Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeBody." + elm}
                                            className="mb-2"
                                            label={this.rusBodyCar(elm)}
                                            onClick={(e) => this.checkedControlBodyCar(e, elm)}
                                        /></Col>);
                                    })
                                }
                        </Row>
                        <Row md={4} className="ml-1">
                            <Form.Label>Привод:</Form.Label>
                                {
                                    this.state.TypeDriveUnitCar.map((elm) => {
                                        return (<Col md="auto"><Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeDriveUnit." + elm}
                                            className="mb-2"
                                            label={this.rusDriveUnit(elm)}
                                            onClick={(e) => this.checkedControlDriveUnitCar(e, elm)}
                                        /></Col>);
                                    })
                                }
                        </Row>
                        <Row md={4} className="ml-1">
                            <Form.Label>Устоноленые фары:</Form.Label>
                                {
                                    this.state.TypeHeadLightCar.map((elm) => {
                                        return (<Col md="auto"><Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeHeadLight." + elm}
                                            className="mb-2"
                                            label={this.rusHedaLight(elm)}
                                            onClick={(e) => this.checkedControlHeadLightCar(e, elm)}
                                        /></Col>);
                                    })
                                }
                        </Row>
                        <Row md={4} className="ml-1">
                            <Form.Label>Медиосистемы:</Form.Label>
                                {
                                    this.state.TypeMediaCar.map((elm) => {
                                        return (<Col md="auto"><Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeMedia." + elm}
                                            className="mb-2"
                                            label={this.rusMultimedia(elm)}
                                            onClick={(e) => this.checkedControlMediaCar(e, elm)}
                                        /></Col>);
                                    })
                                }
                        </Row>
                        <Row md={4} className="ml-1">
                            <Form.Label>Mотор:</Form.Label>
                                {
                                    this.state.TypeMotorCar.map((elm) => {
                                        return (<Col md="auto"><Form.Check
                                            inline
                                            type="checkbox"
                                            id={"Cars.TypeMotor." + elm}
                                            className="mb-2"
                                            label={this.rusMotor(elm)}
                                            onClick={(e) => this.checkedControlMotorCar(e, elm)}
                                        /></Col>);
                                    })
                                }
                        </Row>
                    </div>
                    <Row md={4} className="ml-1">
                        <Form.Label>Оценка состояния</Form.Label>
                        <Col md="auto">
                        <Form.Check
                            inline
                            checked = {this.state.state == "NONE"}
                            label="Не важно"
                            type="radio"
                            name="Star"
                            onClick={(e) => this.setState({ state: "NONE" })}
                        />
                        </Col>
                        <Col md="auto">
                        <Form.Check
                            inline
                            label="Плохое"
                            type="radio"
                            name="Star"
                            onClick={(e) => this.setState({ state: "BAD" })}
                        />
                        </Col>
                        <Col md="auto">
                        <Form.Check
                            inline
                            label="Нормальное"
                            type="radio"
                            onClick={(e) => this.setState({ state: "NORMAL" })}
                            name="Star"
                        />
                        </Col>
                        <Col md="auto">
                        <Form.Check
                            inline
                            label="Хорошое"
                            type="radio"
                            onClick={(e) => this.setState({ state: "GOOD" })}
                            name="Star"
                        />
                        </Col>                      
                        
                    </Row>
                    <Row md={4} className="ml-1">
                        <Form.Label>Автозапуск двигателя:</Form.Label>
                        <Col md="auto">
                        <Form.Check
                            inline
                            checked = {this.state.isIgnoreAutoRun}
                            label="Не важно"
                            type="radio"
                            name="Motor"
                            onClick={(e) => this.setState({ isIgnoreAutoRun:true })}

                        />
                        </Col>
                        <Col md="auto">
                        <Form.Check
                            inline
                            label="Да"
                            type="radio"
                            name="Motor"
                            onClick={(e) => this.setState({ isAutoRunMotor: true, isIgnoreAutoRun:false  })}

                        />
                        </Col>
                        <Col md="auto">
                        <Form.Check
                            inline
                            label="Нет"
                            type="radio"
                            onClick={(e) => this.setState({ isAutoRunMotor: false, isIgnoreAutoRun: false })}
                            name="Motor"
                        />
                        </Col>

                    </Row>
                    <Button onClick={(elm) => this.sort()} >Применить Фильтры</Button>
                    <Button onClick={(elm) => this.setState({isSort: false})} >Снять Фильтры</Button>
                </div>
                <CardColumns className="mb-2">
                    {!this.state.isSort ? 
                        this.state.carsRen.map((elm) => <CarCard obj={elm} mode={false}/>) :
                        this.state.carsSort.map((elm) => <CarCard obj={elm} mode={false}/>) }
                </CardColumns>
            </div>
        );
    }

}

export default CarsControler;
