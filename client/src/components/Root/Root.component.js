
import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import axios from 'axios';
import fr from 'react-intl/locale-data/fr';
import frMessages from '../../translations/fr.json';
import { flattenMessages } from '../../utils/i18n/intl';
import map from './map.png';
import bike from './bike.png';
import './style.css';

const locales = {
  fr: flattenMessages(frMessages),
};

addLocaleData([...fr]);

export default class Root extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
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

        axios.get(`https://api.jcdecaux.com/vls/v1/stations/18046?contract=Paris&apiKey=59e904bbe66668002da4aa7a2c93819cf98ca568`)
        .then(res => {
          const lafourche = JSON.stringify(res.data.available_bikes);
          this.setState({ lafourche });
        });
        axios.get(`https://api.apixu.com/v1/forecast.json?key=05918f81db8d4f9d87b194259172310&q=Paris`)
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
  }

  render() {
    return (
      <IntlProvider locale="fr" messages={locales.fr} >
        <div className="App">
          <h2 className="App-title">Hello Pluton.</h2>
          <div className="App-gradient">
            <img src={bike} className="App-bike-1"/>
            <img src={bike} className="App-bike-2"/>
            <img src={bike} className="App-bike-3"/>
            <img src={map} className="App-logo"/>
          </div>
          <div>
            <p>
              Vélos dispos [Lamarck]: {this.state.lamarck}
            </p>
            <p>
              Vélos dispos [Guy-Moquet]: {this.state.guymoquet}
            </p>
            <p>
              Vélos dispos [La Fourche]: {this.state.lafourche}
            </p>
            <p>
              Température: {this.state.temp}°C [{this.state.tmin}°C - {this.state.tmax}°C]
            </p>
            <p>
              Humidité: {this.state.humidity}%
            </p>
            <p>
              Condition: {this.state.condition}
            </p>
          </div>
        </div>
      </IntlProvider>
    );
  }
}
