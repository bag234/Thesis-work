import React from "react"; 
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form"
import { Col, Row } from "react-bootstrap";


class BetGrafComp extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            trade: {},
            newBet: 10,
            isonButton: false,
            isLogin: false,
            winBet: {},
            isMyLastBet: false,
            stateBet: "none" // small, ideal, many, none
        };
    }

    componentDidMount(){
        this.intervalup = setInterval(() => this.update(), 5000);
        fetch("/api/User/getLogin").then(res => res.text())
        .then((res) => {
            this.setState({isLogin:(res != "null")});
        }, 
        (err) => {
            console.error(err);
        }
        );
   
    }

    update(){
        if(this.state.isLogin){
            fetch("/api/TradeCar/" + this.props.id + "/trade" ).then(res => res.json())
            .then((res) => {
                this.setState({trade: res});
            }, 
            (err) => {
                console.error(err);
            }
            );
            fetch("/api/TradeCar/" + this.props.id + "/bet" ).then(res => res.json())
            .then((res) => {
                this.setState({winBet: res});
            }, 
            (err) => {
                console.error(err);
            }
            );
            fetch("/api/TradeCar/" + this.props.id + "/myBet" ).then(res => res.text())
            .then((res) => {
                this.setState({isMyLastBet: res == "true"});
            }, 
            (err) => {
                console.error(err);
            }
            );
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalup);
    }

    onChangeBetCount(event){ 
        let state = "none";
        let isButt = false;
        if ((this.state.winBet.count_Bet + this.state.trade.step) >= event.target.value)
            state = "small";
        if ((this.state.winBet.count_Bet + this.state.trade.step) < event.target.value){
            state = "ideal";
            isButt = true;
        }
        if ((this.state.winBet.count_Bet*1.5 + this.state.trade.step)  < event.target.value){
            state = "many";
            isButt = true;
        }

        this.setState({newBet: event.target.value, stateBet: state, isonButton: isButt});
    }

    onClickButton(){
        let foda = new FormData();
       
        foda.append("newBet", this.state.newBet);
        fetch("/api/TradeCar/" + this.props.id + "/bet",{
            method:"POST",
            body: foda
        } ).then(res => res.text())
        .then((res) => {
            if(res == "false")
                alert(res);
        }, 
        (err) => {
            console.error(err);
        }
        );
        this.setState({newBet: 0});
    }

    getDescText(){
        if(this.state.isMyLastBet) {
            return ("Ваша ставка последния на данный момент");
        }
        if(this.state.stateBet == "none") {
            return ("");
        }
        if(this.state.stateBet == "small") {
            return ("Слишком мало");
        }
        if(this.state.stateBet == "ideal") {
            return ("Сумма подходит для ставки");
        }
        if(this.state.stateBet == "many") {
            return ("Слишком велико (Дайте другим шанс)");
        }
    }

    getDescColor(){
        
    }

    render(){
        if(!this.state.isLogin)
            return(<div>Пожалуйста авторизутесь</div>);
        return(
            <div id="bet-block">
                <Row>
                    <Col>
                        <Form.Group controlId="Car.Bet">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control onChange={this.onChangeBetCount.bind(this)} value={this.state.newBet}/>
                            <Form.Text className="text-muted">
                                 {this.getDescText()}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button disabled={!this.state.isonButton} onClick={this.onClickButton.bind(this)} variant="primary">
                            Ставить?
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default BetGrafComp;