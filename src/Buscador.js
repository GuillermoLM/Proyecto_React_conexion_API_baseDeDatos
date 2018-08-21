import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Buscador.css';

export default class Buscador extends Component {
    render(){
        return(
            <div className="Buscador">
                <form action="https://dev.entrenar.me/api/v3/oauth/access_token" method="post"onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-end">
                            <FormGroup controlId="ciudad" bsSize="small">
                            <ControlLabel>Ciudad</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                            />
                             </FormGroup>
                        </div>
                        <div className="col-6 d-flex justify-content-start">
                            <FormGroup controlId="deporte" bsSize="small">
                            <ControlLabel>Deporte</ControlLabel>
                            <FormControl
                             type="text"
                            />
                            </FormGroup>

                            <Button 
                                bsSize="small"
                                type="button"
                                id="btnRanking"
                            >
                            Ver Ranking
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

