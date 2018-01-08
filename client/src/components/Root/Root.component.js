import React, { Component } from 'react';
import axios from 'axios';
import map from './map.png';
import bike from './bike.png';
import metro from './metro.png';
import './style.css';

export default class Root extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    setInterval(() => {
      axios.get(`https://api.apixu.com/v1/forecast.json?key=05918f81db8d4f9d87b194259172310&q=Paris`)
      .then(res => {
        const temp = JSON.stringify(res.data.current.temp_c);
        const humidity = JSON.stringify(res.data.current.humidity);
        const condition = JSON.stringify(res.data.current.condition.text);
        const tmin = JSON.stringify(Math.round(res.data.forecast.forecastday[0].day.mintemp_c));
        const tmax = JSON.stringify(Math.round(res.data.forecast.forecastday[0].day.maxtemp_c));
        this.setState({ temp });
        this.setState({ humidity });
        this.setState({ condition });
        this.setState({ tmin });
        this.setState({ tmax });
      });

      axios.get(`https://api-ratp.pierre-grimaud.fr/v3/schedules/metros/13/guy+moquet/R?_format=json`)
      .then(res => {
        const nextSubway = JSON.stringify(res.data.result.schedules[0].message).replace(/"/g, "");
        const secondSubway = JSON.stringify(res.data.result.schedules[1].message).replace(/"/g, "");
        this.setState({ nextSubway });
        this.setState({ secondSubway });
      });
    }, 5000);
  }

  render() {
    return (
      <div className="App">
        <h2 className="App-title">Hello there.</h2>
        <p className="App-text">
          Il fait actuellement {this.state.temp}°C.
        </p>
        <p className="App-text">
          L'humidité ambiante est de {this.state.humidity}%.
        </p>
        <p className="App-text">
          Aujourd'hui, les températures s'élèveront de {this.state.tmin}°C à {this.state.tmax}°C.
        </p>
        <div>
          <img src={metro} className="App-metro-icon"/>
          <p className="App-metro-text">
            Direction Chatillon-Montrouge: {this.state.nextSubway}, {this.state.secondSubway}
          </p>
        </div>
        <p className="App-conclusion">
          Bonne journée :)
        </p>
        <div className="App-gradient">
          <img src={bike} className="App-bike-1"/>
          <img src={bike} className="App-bike-2"/>
          <img src={bike} className="App-bike-3"/>
          <img src={map} className="App-logo"/>
        </div>
      </div>
    );
  }
}
