import React, { Component } from 'react';
import logo from './logo.svg';

class Header extends Component{
    render(){
        return(
        <header className="App-header">
          <div className="row">
            <div className="col-md-4 d-flex justify-content-center">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <div className="App-welcome">
                <h1 className="App-title">Bienvenido a Entrenarme</h1>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-end">
              <nav className="navbar navbar-expand-lg">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="registro">Registro</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
        )}
}

export default Header;