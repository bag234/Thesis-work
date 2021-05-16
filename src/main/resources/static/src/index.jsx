import React from "react";
import reactDom from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationControler from "./RegistrationControler/RegistrationControler.jsx";
import MailSendCheck from "./MailCheckControler/MailSendCheck.jsx";
import TradeCarAdd from "./TradeCarControler/TradeCarAdd.jsx";
import CarsControler from "./CarInfoControler/CarsControler.jsx";
import CarControler from "./CarInfoControler/CarControler.jsx";
import UserPageControler from "./UserPersonalControler/UserPageControler.jsx";
import NavBarControler from "./NavBarControler/NavBarControler.jsx";
import LoginControler from "./LoginContoler/LoginContoroler.jsx";



reactDom.render(
    <div>
        <NavBarControler />
    <div class="container mb-4">
    <Router>
        <Switch>
            <Route path="/registration" exact component={RegistrationControler}></Route>
            <Route path="/mail" exact component={MailSendCheck}></Route>
            <Route path="/user" exact component={UserPageControler}></Route>
            <Route path="/login" exact component={LoginControler}></Route>
            <Route path="/" exact component={MailSendCheck}></Route>
            <Route path="/addCar" exact component={TradeCarAdd}></Route>
            <Route path="/car" exact component={CarsControler}></Route>
            <Route path="/car/:id" exact component={CarControler}></Route>
        </Switch>
    </Router>
    </div>
    </div>,
    document.getElementById("root")
);
