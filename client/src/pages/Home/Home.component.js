import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.jcdecaux.com/vls/v1/stations/18047?contract=Paris&apiKey=59e904bbe66668002da4aa7a2c93819cf98ca568`)
    .then(res => {
      const posts = JSON.stringify(res.data);
      this.setState({ posts });
    });
  }

  render() {
    return (
      <div>
        <p className="intro"/>
        <p>
          {this.state.posts}
        </p>
      </div>
    );
  }
}
