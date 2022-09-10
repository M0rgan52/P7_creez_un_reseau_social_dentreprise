import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";


const index = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profil} />
                <Redirect to="/" />

            </Switch>
        </Router>
    );
};

export default index;