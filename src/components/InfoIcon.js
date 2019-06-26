import React, { Component } from 'react';
import info from './icons/info.svg';
import './InfoIcon.css';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggleInfo() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    const displayClass = this.state.show ? 'Show' : 'Hide';
    return (
      <div className="InfoIcon-text-container">
        <div className="Text-container">
          <img
            src={info}
            alt="info icon"
            className="InfoIcon-icon"
            onClick={this.toggleInfo}
          />
          <div className={`InfoIcon-text ${displayClass}`}>
            <p>{this.props.infoText}</p>
            <a href="https://github.com/desmosinc/gifsmos" target="blank">
              <p>More Info</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
