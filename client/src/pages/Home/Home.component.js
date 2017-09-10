import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lamarck: [],
      guymoquet: [],
      carpeaux: []
    };
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

    axios.get(`https://api.jcdecaux.com/vls/v1/stations/18018?contract=Paris&apiKey=59e904bbe66668002da4aa7a2c93819cf98ca568`)
    .then(res => {
      const carpeaux = JSON.stringify(res.data.available_bikes);
      this.setState({ carpeaux });
    });
  }

  render() {
    return (
      <div>
        <p className="intro"/>
        <p>
          Vélos dispos [Lamarck]:
          {this.state.lamarck}
        </p>
        <p>
          Vélos dispos [Guy-Moquet]:
          {this.state.guymoquet}
        </p>
        <p>
          Vélos dispos [Carpeaux]:
          {this.state.carpeaux}
        </p>
      </div>
    );
  }
}
