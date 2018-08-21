import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Registro.css';
import api from './apiService.js'
export default class Registro extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          firstname: "",
          lastname:""
        };
      }

      validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.firstname.length > 0 && this.state.lastname.length > 0;
      }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
      handleSubmit = event => {
        event.preventDefault();
        api.register(this.state).then(this.props.history.push("/login")).catch(console.error)
      }
    
    render(){
        return(
            <div className="Registro">
            <h4>Introduce tus datos para el registro</h4>
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    </FormGroup>

                    <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                    </FormGroup>

                    <FormGroup controlId="firstname" bsSize="large">
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                      
                        value={this.state.firstname}
                        onChange={this.handleChange}
                    />
                    </FormGroup>

                    <FormGroup controlId="lastname" bsSize="large">
                    <ControlLabel>Apellido</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.lastname}
                        onChange={this.handleChange}
                    />
                    </FormGroup>

                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                    Registro
                    </Button>
                </form>
            </div>
        )}
}