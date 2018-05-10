import React, { Component } from 'react';
import logo from './doug-crop.png';
import react from './logo.svg';
import './App.css';
import CarList from './CarList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the DougScore</h1>
          <p>
            I love watching{' '}
            <a
              href="https://www.youtube.com/channel/UCsqjHFMB_JYTaEnf_vmTNqg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Doug Demuro's Youtube channel
            </a>{' '}
            and as you probably know, Doug the type of guy to rank cars and keep{' '}
            <a
              href="https://docs.google.com/spreadsheets/d/1KTArYwDWrn52fnc7B12KvjRb6nmcEaU6gXYehWfsZSo/edit#gid=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              a spreadsheet
            </a>{' '}
            with the scores. I decided to take it a bit further and have a way to filter, search and sort the cars.
          </p>
        </header>
        <CarList />
        <footer className="App-footer">
          <p>
            Made with{' '}
            <span role="img" aria-labelledby="Love">
              ❤️
            </span>{' '}
            &amp; <img src={react} className="App-logo-small" alt="React Logo" /> by{' '}
            <a href="https://twitter.com/416serg">416serg</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
