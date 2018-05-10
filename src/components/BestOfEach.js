import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BestOfEach.css';

class BestOfEach extends Component {
  findBest = key => {
    const keys = this.props.selectedCars.map(car => car[key]);
    const maxValue = Math.max(...keys);
    const car = this.props.selectedCars.find(car => car[key] === maxValue);
    return car.name;
  };
  render() {
    if (this.props.selectedCars.length) {
      return (
        <div className="best-card">
          <h3>Best of each category</h3>
          <p>
            <span role="img" aria-label="Checkmark">
              ✅
            </span>{' '}
            Doug Score: <span style={{ fontWeight: 600 }}>{this.findBest('score')}</span>
          </p>
          <p>
            <span role="img" aria-label="Beach umbrella">
              🏖️
            </span>{' '}
            Weekend Score: <span style={{ fontWeight: 600 }}>{this.findBest('wTotal')}</span>
          </p>
          <p>
            <span role="img" aria-label="Nail Polish">
              💅🏼
            </span>{' '}
            Styling: <span style={{ fontWeight: 600 }}>{this.findBest('wStyling')}</span>
          </p>
          <p>
            <span role="img" aria-label="Race Car">
              🏎️
            </span>{' '}
            Acceleration: <span style={{ fontWeight: 600 }}>{this.findBest('wAccel')}</span>
          </p>
          <p>
            <span role="img" aria-label="Turning Sign">
              ↪️
            </span>{' '}
            Handling: <span style={{ fontWeight: 600 }}>{this.findBest('wHandling')}</span>
          </p>
          <p>
            <span role="img" aria-label="Joy Emoji">
              😂
            </span>{' '}
            Fun Factor: <span style={{ fontWeight: 600 }}>{this.findBest('wFun')}</span>
          </p>
          <p>
            <span role="img" aria-label="Cool Emoji">
              🆒
            </span>{' '}
            Cool Factor: <span style={{ fontWeight: 600 }}>{this.findBest('wCool')}</span>
          </p>
          <p>
            <span role="img" aria-label="Office">
              🏢
            </span>{' '}
            Daily Score: <span style={{ fontWeight: 600 }}>{this.findBest('dTotal')}</span>
          </p>
          <p>
            <span role="img" aria-label="Game controller">
              🎮
            </span>{' '}
            Features: <span style={{ fontWeight: 600 }}>{this.findBest('dFeatures')}</span>
          </p>
          <p>
            <span role="img" aria-label="Couch with lamp">
              🛋️
            </span>{' '}
            Comfort: <span style={{ fontWeight: 600 }}>{this.findBest('dComfort')}</span>
          </p>
          <p>
            <span role="img" aria-label="Scientist">
              👩🏼‍🔬
            </span>{' '}
            Quality: <span style={{ fontWeight: 600 }}>{this.findBest('dQuality')}</span>
          </p>
          <p>
            <span role="img" aria-label="Luggage Claim">
              🛄
            </span>{' '}
            Practicality <span style={{ fontWeight: 600 }}>{this.findBest('dPracticality')}</span>
          </p>
          <p>
            <span role="img" aria-label="Money Bag">
              💰
            </span>{' '}
            Value: <span style={{ fontWeight: 600 }}>{this.findBest('dValue')}</span>
          </p>
        </div>
      );
    }
  }
}

BestOfEach.propTypes = {
  selectedCars: PropTypes.array.isRequired,
};

export default BestOfEach;
