import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import {classnames} from "./helpers";
import './Buscador.css';

export default class Buscador extends Component {

    constructor(props) {
        super(props);
        this.state = {
          address: '',
          errorMessage: '',
          latitude: null,
          longitude: null,
          isGeocoding: false,
        };
      }
    
    handleChange = address => {
        this.setState({
          address,
          latitude: null,
          longitude: null,
          errorMessage: '',
        });
    };
    
    handleSelect = selected => {
        this.setState({ isGeocoding: true, address: selected });
        geocodeByAddress(selected)
          .then(res => getLatLng(res[0]))
          .then(({ lat, lng }) => {
            this.setState({
              latitude: lat,
              longitude: lng,
              isGeocoding: false,
            });
            })
          .catch(error => {
            this.setState({ isGeocoding: false });
            console.log('error', error); // eslint-disable-line no-console
          });
      };
    
    handleCloseClick = () => {
        this.setState({
          address: '',
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

    render(){
        const {
            address,
            errorMessage,
            latitude,
            longitude,
            isGeocoding,
          } = this.state;
        return(
            <div className="Buscador">
                <form>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-end">
                            <div>
                                <PlacesAutocomplete
                                    onChange={this.handleChange}
                                    value={address}
                                    onSelect={this.handleSelect}
                                    onError={this.handleError}
                                    shouldFetchSuggestions={address.length > 2}
                                >
                                {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                                return (
                                    <div className="search-bar-container">
                                        <div className="search-input-container">
                                            <input
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
                                                /* eslint-disable react/jsx-key */
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
                                                /* eslint-enable react/jsx-key */
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



