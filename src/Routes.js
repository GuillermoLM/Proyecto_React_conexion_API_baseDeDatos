import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";

import App from './App';
import Login from "./Login";
import Registro from "./Registro"

const AppRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/registro" exact component={Registro}/>
        </Switch>
    </BrowserRouter>
)

export default AppRoutes;