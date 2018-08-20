import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";

import App from './App';
import Login from "./Login";
import Registro from "./Registro";
import Buscador from "./Buscador";

const AppRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/registro" exact component={Registro}/>
            <Route path="/buscador" exact component={Buscador}/>
        </Switch>
    </BrowserRouter>
)

export default AppRoutes;