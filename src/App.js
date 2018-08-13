import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="row">
            <div class="col-4">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div class="col-4">
              <div className="App-welcome">
                <h1 className="App-title">Bienvenido a Entrenarme</h1>
              </div>
            </div>
            <div class="col-4 d-flex justify-content-end">
              <nav class="navbar navbar-expand-lg">
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="#">Login</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Registro</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <div class="container-fluid">
          <img src="Logo.jpg"/>
        </div>
      </div>
    );
  }
}

export default App;
