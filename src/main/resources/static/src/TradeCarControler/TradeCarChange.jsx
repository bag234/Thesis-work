import React from "react";
import TradeCarAdd from "./TradeCarAdd.jsx";

class TradeCarChange extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoding : false,
            car : {}
        }
    }


    componentDidMount(){
        fetch("/api/TradeCar/" + this.props.match.params.id).then(res => res.json())
            .then(
                (res) => {
                   this.setState({car: res, isLoding: true});
                },
                (err) => console.log(err)
            );
    }

    render(){
        if (!this.state.isLoding)
            return (
                <h3> Loding </h3>
            );
        else
            return(
                <TradeCarAdd car={this.state.car} mode={true}/>
            );
    }

}

export default TradeCarChange;