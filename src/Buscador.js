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
        //   .then(({ lat, lng }) => {
        //     this.setState({
        //     });
        //     })
          .catch(error => {
            this.setState({ isGeocoding: false });
            console.log('error', error); // eslint-disable-line no-console
          });
      };
    
    handleCloseClick = () => {
        this.setState({
          address: '',
          place_id: '',
          latitude: null,
          longitude: null,
        });
    };
    
    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); // eslint-disable-line no-console
        this.setState({ errorMessage: status }, () => {
          clearSuggestions();
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        api.ranking(this.state.sport, this.state.place_id ).then(console.log)
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
                            Ver Ranking
                            </Button>
                        </div>
                    </div>
                </form>
                <div className="row">
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
                </div>
            </div>
        );
    }
}



