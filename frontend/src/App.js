import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div class="container">
          <h1>Calculator</h1>
          <p>
            Put your mathematical example here (allowed characters are +, -, *, / and brackets):
          </p>
          <div class="row">
            <div class="col-md-8">
              <input class="form-control"
                     onChange={this.handleChange}
                     value={this.state.text}
              />
            </div>
            <div class="col-md-4">
              <button onClick={this.handleSubmit} class="btn btn-primary">
                Calculate
              </button>
            </div>
          </div>
        </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit() {

    const url = 'http://localhost:3004/';
    fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      body: JSON.stringify({
        example: this.state.text
      })
    })
    .then ((response) => {
      response.json().then(data => {
        this.setState({text: (data.result || 'Not available').toString()});
        });
    })
    .catch ((error) => {console.log(error);});
  }
}

export default App;
