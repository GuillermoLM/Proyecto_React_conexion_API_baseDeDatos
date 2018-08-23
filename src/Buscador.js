import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import {classnames} from "./helpers";
import './Buscador.css';
import api from './apiService.js';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

export default class Buscador extends Component {

    constructor(props) {
        super(props);
        this.state = {
          address: '',
          errorMessage: '',
          sport: '',
          city:'',
          place_id:'',
          dataRecibida:[

          ],
          takeMax: '',
          max_price_per_lead: null,
          min_price_per_lead: null,
          max_monthly_budget: null,
          min_monthly_budget: null,
        };
      }
    
    handleChange = address => {
        this.setState({
          address,
        });
    };
    
    handleSelect = selected => {
        this.setState({
            address: selected,
          });
        
        geocodeByAddress(selected)
          .then(res => this.setState({place_id: res[0].place_id }))
          .catch(error => {
            this.setState({ isGeocoding: false });
            console.log('error', error); 
          });
      };
    
    handleCloseClick = () => {
        this.setState({
          address: '',
          place_id: '',
        });
    };
    
    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); 
        this.setState({ errorMessage: status }, () => {
          clearSuggestions();
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        api.ranking(this.state.sport, this.state.place_id )
        .then(
            res => { 
                let maxPpL = Math.max(...res.data.map(item => item.price_per_lead));
                let minPpL = Math.min(...res.data.map(item => item.price_per_lead));

                let maxMb = Math.max(...res.data.map(item => item.monthly_budget))
                let minMb = Math.min(...res.data.map(item => item.monthly_budget))

                console.log(res);
                this.setState({dataRecibida: res.data, max_price_per_lead: maxPpL, min_price_per_lead: minPpL, max_monthly_budget: maxMb, min_monthly_budget: minMb});
            }
        )
      }

    render(){
        const {
            address,
            errorMessage,
          } = this.state;
        return(
            <div className="Buscador">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-end">
                            <div>
                                <PlacesAutocomplete
                                    onChange={this.handleChange}
                                    value={this.state.address}
                                    onSelect={this.handleSelect}
                                    onError={this.handleError}
                                    shouldFetchSuggestions={address.length > 2}
                                >
                                {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                                return (
                                    <div className="search-bar-container">
                                        <div className="search-input-container">
                                            <input
                                                value={this.state.city} 
                                                onChange={e => this.setState({city: e.target.value})}

                                                {...getInputProps({
                                                placeholder: 'Busca tu ciudad...',
                                                
                                                className: 'search-input',
                                                })}
                                            />
                                            {this.state.address.length > 0 && (
                                            <button
                                                className="clear-button"
                                                onClick={this.handleCloseClick}
                                            >
                                            x
                                            </button>
                                            )}
                                        </div>
                                        {suggestions.length > 0 && (
                                        <div className="autocomplete-container">
                                            {suggestions.map(suggestion => {
                                                const className = classnames('suggestion-item', {
                                                    'suggestion-item--active': suggestion.active,
                                                });
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, { className })}
                                                    >
                                                    <strong>
                                                        {suggestion.formattedSuggestion.mainText}
                                                    </strong>{' '}
                                                    <small>
                                                        {suggestion.formattedSuggestion.secondaryText}
                                                    </small>
                                                </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    </div>
                                );
                                }}
                                </PlacesAutocomplete>
                                    {errorMessage.length > 0 && (
                                        <div className="error-message">{this.state.errorMessage}</div>
                                    )}
                            </div>
                        </div>
                        
                        <div className="col-6 d-flex justify-content-start">
                            <FormGroup controlId="deporte" bsSize="small">
                            <ControlLabel>Deporte</ControlLabel>
                            <FormControl
                                value={this.state.sport} 
                                onChange={e => this.setState({sport: e.target.value})}
                                type="number"
                                placeholder="Introduce un número"
                            />
                            </FormGroup>

                            <Button 
                                bsSize="small"
                                type="submit"
                                id="btnRanking"
                            >
                            Ver Datos
                            </Button>
                        </div>
                    </div>
                </form>
                {this.state.max_price_per_lead && ( 
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <p>El precio por mensaje máximo es de: {this.state.max_price_per_lead}€</p>
                    </div> 
                </div>)}
                {this.state.min_price_per_lead && ( 
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <p>El precio por mensaje mínimo es de: {this.state.min_price_per_lead}€</p>
                    </div> 
                </div>)}    
                {this.state.max_monthly_budget && ( 
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <p>El presupuesto máximo es de: {this.state.max_monthly_budget}€</p>
                    </div> 
                </div>)}
                {this.state.min_monthly_budget && ( 
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <p>El presupuesto mínimo es de: {this.state.min_monthly_budget}€</p>
                    </div> 
                </div>)}
            
                {/* <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <XYPlot
                            width={400}
                            height={400}>
                            <HorizontalGridLines />
                                <LineSeries
                                    data={[
                                        {x: 1, y: 10},
                                        {x: 2, y: 5},
                                        {x: 3, y: 15}
                                    ]}/>
                                <XAxis />
                                <YAxis />
                        </XYPlot>
                    </div>
                </div> */}
            </div>
        );
    }
}



