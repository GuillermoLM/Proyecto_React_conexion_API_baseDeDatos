import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import {classnames} from "./helpers";
import './Buscador.css';
import api from './apiService.js';
import {XYPlot,XAxis,YAxis,VerticalGridLines,HorizontalGridLines,VerticalBarSeries} from 'react-vis';

export default class Buscador extends Component {

    constructor(props) {
        super(props);
        this.state = {
          address: '',
          errorMessage: '',
          sport: '',
          city:'',
          place_id:'',
          dataRecibida:[],
          max_price_per_lead: null,
          min_price_per_lead: null,
          media_price_per_lead: null,
          max_monthly_budget: null,
          min_monthly_budget: null,
          media_monthly_budget: null,
          max_ppl:null,
          max_mb: null,
          dataInicial:[],
          graphicPPL:[],
        };
      }

    componentDidMount(){
        api.datosIniciales("","")
        .then(
            all => {
                let maxStartPpl = Math.max(...all.data.map(item => item.price_per_lead));
                let maxStartMb = Math.max(...all.data.map(item => item.monthly_budget))

                let data = {
                    dataInicial: all.data,
                    max_ppl: maxStartPpl,
                    max_mb: maxStartMb,

                }

                console.log(data);
                this.setState(data);
                console.log(this.ordenarPpl(all.data));
            }
        )
    }

    ordenarPpl(arreglo){     
        let stateArray = arreglo.map(item =>
            {
                let city = item.city;
                let price_per_lead = item.price_per_lead;
                let sport_id= item.sport_id;
            return {city , price_per_lead, sport_id};
            });

        let resultOrder = stateArray.sort(function(a,b){
            return b.price_per_lead-a.price_per_lead
        })
        let salida=false;
        let i= 0;
        let arrayFinal = [];
        arrayFinal.push(resultOrder[i]);   
            
        do{
            i++;
            let valueFinal = arrayFinal[i-1].sport_id;
            let resultFinal = resultOrder[i].sport_id;
            if( valueFinal != resultFinal){
                arrayFinal.push(resultOrder[i]);
            }
            if(arrayFinal.length==5){
                salida = true
            };
        }
        while(salida==false){
            return arrayFinal 
        }
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
        api.datos(this.state.sport, this.state.place_id )
        .then(
            res => { 
                let maxPpL = Math.max(...res.data.map(item => item.price_per_lead));
                let minPpL = Math.min(...res.data.map(item => item.price_per_lead));
                let valuesPpl = res.data.map(item => item.price_per_lead);
                let sumPpl = valuesPpl.reduce((previous, current) => current += previous);
                let avgPpl = (sumPpl / valuesPpl.length).toFixed(2);
                
                let maxMb = Math.max(...res.data.map(item => item.monthly_budget))
                let minMb = Math.min(...res.data.map(item => item.monthly_budget))
                let valuesMb = res.data.map(item => item.monthly_budget);
                let sumMb = valuesMb.reduce((previous, current) => current += previous);
                let avgMb = (sumMb / valuesMb.length).toFixed(2);

                let s = {
                    dataRecibida: res.data,
                    max_price_per_lead: maxPpL,
                    min_price_per_lead: minPpL,
                    max_monthly_budget: maxMb,
                    min_monthly_budget: minMb,
                    media_price_per_lead: avgPpl,
                    media_monthly_budget: avgMb
                }
                console.log(s);
                this.setState(s);
            }
        )
      }

      submitGenerar = event =>{
        event.preventDefault();
        api.generarRanking();
      }

      submitVisualizar = event => {
        event.preventDefault();
        api.visualizarRanking()
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
                {this.state.media_price_per_lead && ( 
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <p>El precio por mensaje medio es de: {this.state.media_price_per_lead}€</p>
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
                {this.state.media_monthly_budget && ( 
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <p>El presupuesto medio es de: {this.state.media_monthly_budget}€</p>
                    </div> 
                </div>)}
                
                {this.state.max_price_per_lead && this.state.min_price_per_lead && this.state.media_price_per_lead && this.state.max_monthly_budget && this.state.min_monthly_budget && this.state.media_monthly_budget && (
                <div>
                <div className="row">
                    <div className="col-2"/>
                    <div className="col-4 d-flex justify-content-center">
                        <XYPlot
                            margin={{bottom: 70}}
                            xType="ordinal"
                            width={300}
                            height={300}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis tickLabelAngle={-45} />
                            <YAxis />
                            <VerticalBarSeries
                                data={this.state.historicalPpl}/>
                        </XYPlot>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <XYPlot
                            margin={{bottom: 70}}
                            xType="ordinal"
                            width={300}
                            height={300}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis tickLabelAngle={-45} />
                            <YAxis />
                            <VerticalBarSeries
                                data={this.state.historicalMb}/>
                        </XYPlot>
                    </div>
                    <div className="col-2"/>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <form onSubmit={this.submitGenerar.bind(this)}>
                            <Button 
                                bsSize="small"
                                type="submit"
                                id="btnRanking"
                                >
                                Generar Ranking
                            </Button>
                        </form>
                        <form onSubmit={this.submitVisualizar.bind(this)}>
                            <Button 
                                bsSize="small"
                                type="submit"
                                id="btnRanking"
                                >
                                Ver Ranking
                            </Button>
                        </form>
                    </div>
                </div>
                </div>
                )}
            </div>
        );
    }
}



