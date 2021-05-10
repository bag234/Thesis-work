import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

class TradeCarAdd extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            TypeBodyCar:[],
            typesBodyCar:[],
            TypeDriveUnitCar:[],
            TypeHeadLightCar:[],
            TypeMediaCar:[],
            TypeMotorCar:[],
            typesDriveUnitCar:[],
            typesHeadLightCar:[],
            typesMediaCar:[],
            typesMotorCar:[],
            isLoad: false,
            transmisionType: false,
            autoRunMotor: false,
            state: "NORMAL",
            brand: "",
            model: "",
            gen: "",
            year: 2002,
            volume: 60,
            milage: 0,
            tradeType: "TYPICAL",
            price: 0.0,
            step: 0.0,
            photo: [],
            isRiderct: false
        }
        // this.componentMoment();
    }

    componentDidMount(){
        fetch("/api/get/TypeBody").then(res => res.json())
            .then((resp) =>{
                console.log(resp);
                this.setState({TypeBodyCar: resp});
            },
            (error) => {
                console.error(error);
            }
        );
        fetch("/api/get/TypeDriveUnit").then(res => res.json())
            .then((resp) =>{
                console.log(resp);
                this.setState({TypeDriveUnitCar: resp});
            },
            (error) => {
                console.error(error);
            }
        );
        fetch("/api/get/TypeHeadLight").then(res => res.json())
            .then((resp) =>{
                console.log(resp);
                this.setState({TypeHeadLightCar: resp});
            },
            (error) => {
                console.error(error);
            }
        );
        fetch("/api/get/TypeMedia").then(res => res.json())
            .then((resp) =>{
                console.log(resp);
                this.setState({TypeMediaCar: resp});
            },
            (error) => {
                console.error(error);
            }
        );
        fetch("/api/get/TypeMotor").then(res => res.json())
            .then((resp) =>{
                console.log(resp);
                this.setState({TypeMotorCar: resp});
            },
            (error) => {
                console.error(error);
            }
        );
        this.setState({isLoad: true});
    } // all group

    buttonTestHandler(str){
        alert(str);
    }

    checkedControlBodyCar(event, type){
        let arr = this.state.typesBodyCar;
        if (event.target.checked){
            arr.push(type);
        }
        else{
            arr.splice(arr.indexOf(type),arr.indexOf(type));
        }
        console.log(arr);
        this.setState({typesBodyCar: arr});
    }

    checkedControlDriveUnitCar(event, type){
        let arr = this.state.typesDriveUnitCar;
        if (event.target.checked){
            arr.push(type);
        }
        else{
            arr.splice(arr.indexOf(type),arr.indexOf(type));
        }
        console.log(arr);
        this.setState({typesDriveUnitCar: arr});
    }

    checkedControlHeadLightCar(event, type){
        let arr = this.state.typesHeadLightCar;
        if (event.target.checked){
            arr.push(type);
        }
        else{
            arr.splice(arr.indexOf(type),arr.indexOf(type));
        }
        console.log(arr);
        this.setState({typesHeadLightCar: arr});
    }

    checkedControlMediaCar(event, type){
        let arr = this.state.typesMediaCar;
        if (event.target.checked){
            arr.push(type);
        }
        else{
            arr.splice(arr.indexOf(type),arr.indexOf(type));
        }
        console.log(arr);
        this.setState({typesMediaCar: arr});
    }

    checkedControlMotorCar(event, type){
        let arr = this.state.typesMotorCar;
        if (event.target.checked){
            arr.push(type);
        }
        else{
            arr.splice(arr.indexOf(type),arr.indexOf(type));
        }
        console.log(arr);
        this.setState({typesMotorCar: arr});
    }

    changeImage(event){
        let dafo = new FormData();
        let arr = this.state.photo;
        dafo.append("file", event.target.files[0]);
        fetch("/api/Image",{
            method: "POST",
            body: dafo
        }).then(res => res.text()).then(
            (response) =>{
                arr.push(response);
            },
            (error) => {
                console.error(error);
            }
        );
        this.setState({photo: arr});
    }

    dropImage(event, type){
        
        let arr = this.state.photo;
        arr.splice(arr.indexOf(type),arr.indexOf(type));
        this.setState({photo: arr});
    }

    buttonOkHandler(){
        let jsp = {
            typeBodyCar: this.state.typesBodyCar,
            typeDriveUnitCar:this.state.typesDriveUnitCar,
            typeMotorCar:this.state.typesMotorCar,
            transmisionType:this.state.transmisionType,
            brand:this.state.brand,
            model:this.state.model,
            gen:this.state.gen,
            year:this.state.year,
            volume:this.state.volume,
            trade:{
                price:this.state.price,
                step:this.state.step,
                type:this.state.tradeType
            },
            milage:this.state.milage,
            state: this.state.state,
            typeHeadLightCar:this.state.typesHeadLightCar,
            typeMediaCar:this.state.typesMediaCar,
            imagesPath: this.state.photo,
            autoRunMotor:this.state.autoRunMotor
        }
        console.log(jsp)
        fetch("/api/TradeCar",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsp)
        });
        this.setState({isRiderct: true});
    }

    render(){
        return(
            <div id="tradecar-controler">
                {this.state.isRiderct ? <Redirect to="/" /> : ""}
                <div>
                <Form>
                <Form.Group controlId="TradeCar.Barnd">
                    <Form.Label>Марка</Form.Label>
                    <Form.Control placeholder="Reno, Opel, BMW" 
                    onChange={(elm) =>{this.setState({brand: elm.target.value})}} 
                    value={this.state.brand}/>
                </Form.Group>
                <Form.Group controlId="TradeCar.Model">
                    <Form.Label>Модель</Form.Label>
                    <Form.Control placeholder="Model" 
                    onChange={(elm) =>{this.setState({model: elm.target.value})}} 
                    value={this.state.model}/>
                </Form.Group>
                <Form.Group controlId="TradeCar.Gen">
                    <Form.Label>Покаление</Form.Label>
                    <Form.Control placeholder="М7" 
                    onChange={(elm) =>{this.setState({gen: elm.target.value})}} 
                    value={this.state.gen}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Год выпуска</Form.Label>
                    <Form.Control placeholder="20хх" 
                    onChange={(elm) =>{this.setState({year: elm.target.value})}} 
                    value={this.state.year}/>
                </Form.Group>
                <hr/>
                <div id="all-enums">
                    <Col>
                    <Form.Label>Тип салона:</Form.Label>
                    {
                        this.state.TypeBodyCar.map((elm) =>{
                            return(<Form.Check
                                inline
                                type="checkbox"
                                id={"TradeCar.TypeBody."+ elm}
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
                        this.state.TypeDriveUnitCar.map((elm) =>{
                            return(<Form.Check
                                inline
                                type="checkbox"
                                id={"TradeCar.TypeDriveUnit."+ elm}
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
                        this.state.TypeHeadLightCar.map((elm) =>{
                            return(<Form.Check
                                inline
                                type="checkbox"
                                id={"TradeCar.TypeHeadLight."+ elm}
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
                        this.state.TypeMediaCar.map((elm) =>{
                            return(<Form.Check
                                inline
                                type="checkbox"
                                id={"TradeCar.TypeMedia."+ elm}
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
                    this.state.TypeMotorCar.map((elm) =>{
                        return(<Form.Check
                            inline
                            type="checkbox"
                            id={"TradeCar.TypeMedia."+ elm}
                            className="mb-2"
                            label={elm}
                            onClick={(e) => this.checkedControlMotorCar(e, elm)}
                        />);
                    })
                }
                </Col>
                </div>
                <hr/>
                <Form.Label>Коробка передач:</Form.Label>
                    <Form.Check
                    inline
                    label="Механика"
                    type="radio"
                    name="Drive"
                    onClick={(e) => this.setState({transmisionType: false})}
                    />
                    <Form.Check
                    inline
                    label="Автомат"
                    type="radio"
                    onClick={(e) => this.setState({transmisionType: true})}
                    name="Drive"
                    />
                <Form.Label>Автозапуск двигателя:</Form.Label>
                    <Form.Check
                    inline
                    label="Да"
                    type="radio"
                    name="Motor"
                    onClick={(e) => this.setState({autoRunMotor: true})}
                    
                    />
                    <Form.Check
                    inline
                    label="Нет"
                    type="radio"
                    onClick={(e) => this.setState({autoRunMotor: false})}
                    name="Motor"
                    />
                <Form.Label>Оценка состояния</Form.Label>
                    <Form.Check
                    inline
                    label="Плохое"
                    type="radio"
                    name="Star"
                    onClick={(e) => this.setState({state: "BAD"})}
                    />
                    <Form.Check
                    inline
                    label="Нормальное"
                    type="radio"
                    onClick={(e) => this.setState({state: "NORMAL"})}
                    name="Star"
                    />
                    <Form.Check
                    inline
                    label="Хорошое"
                    type="radio"
                    onClick={(e) => this.setState({state: "GOOD"})}
                    name="Star"
                    />
                <Form.Group controlId="TradeCar.Volume">
                    <Form.Label>Объем двигателя</Form.Label>
                    <Form.Control placeholder="50"
                    onChange={(elm) =>{this.setState({volume: elm.target.value})}} 
                    value={this.state.volume}/>
                </Form.Group>
                <Form.Group controlId="TradeCar.Milage">
                    <Form.Label>Пробег</Form.Label>
                    <Form.Control placeholder="50" 
                    onChange={(elm) =>{this.setState({milage: elm.target.value})}} 
                    value={this.state.milage}/>
                </Form.Group>
                </Form>   
                <hr />
                <div id="Trade-contoler">
                <Form.Label>Автозапуск двигателя:</Form.Label>
                    <Form.Check
                    inline
                    label="Да"
                    type="radio"
                    name="TradeType"
                    onClick={(e) => this.setState({tradeType: "TYPICAL"})}
                    />
                    <Form.Check
                    inline
                    label="Нет"
                    type="radio"
                    onClick={(e) => this.setState({tradeType: "OPEN"})}
                    name="TradeType"
                    />
                    {this.state.tradeType == "TYPICAL"? <div> 
                    <Form.Group controlId="TradeCar.Barnd">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control placeholder="Price" 
                        onChange={(elm) =>{this.setState({price: elm.target.value})}} 
                        value={this.state.price}/>
                    </Form.Group>
                    </div> : ""}
                    {this.state.tradeType == "OPEN"? <div> 
                    <Form.Group controlId="TradeCar.Barnd">
                        <Form.Label>Cтартовая Цена</Form.Label>
                        <Form.Control placeholder="Price" 
                        onChange={(elm) =>{this.setState({price: elm.target.value})}} 
                        value={this.state.price}/>
                    </Form.Group>
                    <Form.Group controlId="TradeCar.Barnd">
                        <Form.Label>Step</Form.Label>
                        <Form.Control placeholder="Price" 
                        onChange={(elm) =>{this.setState({step: elm.target.value})}} 
                        value={this.state.step}/>
                    </Form.Group>
                    </div> : ""}
                </div>
                </div>
                <div id="photo-controler">
                <CardColumns>
                    {this.state.photo.map(elm =>{
                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={"/api/Image/" + elm} />
                                <Card.Body>
                                    <Card.Link variant="left" onClick={(e) => this.dropImage(e, elm)}>Открепить</Card.Link>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
                <Form.File id="formcheck-api-regular" >
                    <Form.File.Label>Выбор фотографий</Form.File.Label>
                    <Form.File.Input onChange={this.changeImage.bind(this)} />
                </Form.File>
                </div>
                
                <Button onClick={this.buttonOkHandler.bind(this)}>OK CAR</Button>
            </div>
        );
    }
}

export default TradeCarAdd;