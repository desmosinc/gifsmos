import React, { Component } from 'react';
import info from './icons/info.svg';
import './InfoIcon.css';

export default class InfoIcon extends Component {
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
    const displayClass = this.state.show ? 'show' : 'hide';
    return (
      <div className="InfoIcon-text-container">
        <img
          src={info}
          alt="info icon"
          className="InfoIcon-icon"
          onClick={this.toggleInfo}
          tabindex="0"
          role="button"
          aria-pressed={this.state.show}
          onKeyDown={this.toggleInfo}
        />
        <div className={`InfoIcon-text ${displayClass}`}>
          <p>{this.props.infoText}</p>
          <a href="https://github.com/desmosinc/gifsmos" target="blank">
            More Info
          </a>
        </div>
      </div>
    );
  }
}
