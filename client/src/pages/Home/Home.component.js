import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setInterval( () => {
        axios.get(`https://api.jcdecaux.com/vls/v1/stations/18047?contract=Paris&apiKey=59e904bbe66668002da4aa7a2c93819cf98ca568`)
        .then(res => {
          const lamarck = JSON.stringify(res.data.available_bikes);
          this.setState({ lamarck });
        });

        axios.get(`https://api.jcdecaux.com/vls/v1/stations/17001?contract=Paris&apiKey=59e904bbe66668002da4aa7a2c93819cf98ca568`)
        .then(res => {
          const guymoquet = JSON.stringify(res.data.available_bikes);
          this.setState({ guymoquet });
        });

        axios.get(`https://api.jcdecaux.com/vls/v1/stations/18018?contract=Paris&apiKey=59e904bbe66668002da4aa7a2c93819cf98ca568`)
        .then(res => {
          const carpeaux = JSON.stringify(res.data.available_bikes);
          this.setState({ carpeaux });
        });
        axios.get(`https://api.apixu.com/v1/forecast.json?key=ba1b04fe8161474cb84173657172609&q=Paris`)
        .then(res => {
          const temp = JSON.stringify(res.data.current.temp_c);
          const humidity = JSON.stringify(res.data.current.humidity);
          const condition = JSON.stringify(res.data.current.condition.text);
          const tmin = JSON.stringify(res.data.forecast.forecastday[0].day.mintemp_c);
          const tmax = JSON.stringify(res.data.forecast.forecastday[0].day.maxtemp_c);
          this.setState({ temp });
          this.setState({ humidity });
          this.setState({ condition });
          this.setState({ tmin });
          this.setState({ tmax });
        });
    }, 1000);
  }

  render() {
    return (
      <div>
        <p className="intro"/>
        <p>
          Vélos dispos [Lamarck]: {this.state.lamarck}
        </p>
        <p>
          Vélos dispos [Guy-Moquet]: {this.state.guymoquet}
        </p>
        <p>
          Vélos dispos [Carpeaux]: {this.state.carpeaux}
        </p>
        <p>
          Température: {this.state.temp}°C [{this.state.tmin}°C - {this.state.tmax}°C]
        </p>
        <p>
          Humidité: {this.state.humidity}%
        </p>
        <p>
          Condition:{this.state.condition}
        </p>
      </div>
    );
  }
}
