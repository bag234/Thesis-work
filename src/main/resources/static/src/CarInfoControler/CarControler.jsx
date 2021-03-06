import React, {useState} from "react";
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
import BetGrafComp from "./BetGrafComp.jsx";
import TypicalGrafControler from "./TypicalGrafContoler.jsx";
import Modal from 'react-bootstrap/Modal'

function Warning(props) {
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
    
    if(props.mode != "CURRENT")
    
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Лот не актуален</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             {
                 props.mode == "OUTDATE" ? "На даный лот время использования вышоло": "Данный лот был удолен пользователем"
             }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Понятно
            </Button>
            <Button variant="primary" href="/">На главную</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

class CarControler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            carObj: {},
            isContact: false,
            conntact: "",
            isLoginErro: false,
            isLoding: false,
            autoUpdate: false
        }
    }

    componentDidMount() {
        fetch("/api/TradeCar/" + this.props.match.params.id).then(res => res.json())
            .then(
                (response) => {
                    this.setState({ isLoding: true, carObj: response });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    rusStateDecode(state) {
        if (state == "BAD")
            return "Плохое";
        if (state == "NORMAL")
            return "Нормальное";
        if (state == "GOOD")
            return "Хорошое";
        return "error";
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


    render() {
        if (this.state.isLoding)
            return (
                <div id="content-car">
                    <Warning mode={this.state.carObj.trade.state}></Warning>
                    <Row id="name-car">
                        <h1>
                            {this.state.carObj.brand}, {this.state.carObj.model}, {this.state.carObj.gen} - {this.state.carObj.year} года
                    <Badge variant={this.stageVarStateDecode(this.state.carObj.state)}>{this.rusStateDecode(this.state.carObj.state)}</Badge>
                        </h1>
                    </Row>
                    <Row id="">
                        <Col xs={8}>
                            <Carousel>
                                {
                                    this.state.carObj.imagesPath.map((elm) => {
                                        return (<Carousel.Item>
                                            <img
                                                className="w-100"
                                                src={"/api/Image/" + elm} />
                                        </Carousel.Item>);
                                    })
                                }
                            </Carousel>
                        </Col>
                        <Col>
                            <Row>

                                <Card.Body>
                                    {this.state.carObj.trade.type == "OPEN" ? <BetGrafComp id={this.state.carObj.id} /> : ""}
                                    {this.state.carObj.trade.type == "TYPICAL" ? <TypicalGrafControler id={this.state.carObj.id} /> : ""}
                                </Card.Body>
                            </Row>
                            <Row>
                                Пробег: {this.state.carObj.milage}; {" "}
                                Объем двигателя: {this.state.carObj.volume}; {" "}
                                {this.state.carObj.autoRunMotor ? "Автозапуск двигателя;" : ""} {" "}
                                {this.state.carObj.transmisionType ? "Автомат" : "Механика"} {"; "}
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <h3>Описание:</h3>
                            <br></br>
                            {this.state.carObj.description}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>Кузов:</h3>
                            {this.state.carObj.typeBodyCar.map(elm => {
                                return (this.rusBodyCar(elm) + "; ");
                            })}
                        </Col>
                        <Col>
                            <h3>Привод:</h3>
                            {this.state.carObj.typeDriveUnitCar.map(elm => {
                                return (this.rusDriveUnit(elm) + "; ");
                            })}
                        </Col>
                        <Col>
                            <h3>Двигатель:</h3>
                            {this.state.carObj.typeMotorCar.map(elm => {
                                return (this.rusMotor(elm) + "; ");
                            })}
                        </Col>
                        <Col>
                            <h3>Фары:</h3>
                            {this.state.carObj.typeHeadLightCar.map(elm => {
                                return (this.rusHedaLight(elm) + "; ");
                            })}
                        </Col>
                        <Col>
                            <h3>Мультимедиа:</h3>
                            {this.state.carObj.typeMediaCar.map(elm => {
                                return (this.rusMultimedia(elm) + ";\n");
                            })}
                        </Col>

                    </Row>
                </div>);
        return <h2>LODING</h2>
    }

}

export default CarControler;