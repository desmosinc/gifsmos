import React, { Component } from 'react';
import info from './icons/info.svg';
import './Info.css';

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
      <div className="Info-container">
        <div className="Info-header">
          <h1>{this.props.title}</h1>
          <div className="Text-container">
            <img
              src={info}
              alt="info icon"
              className="Info-icon"
              onClick={this.toggleInfo}
            />
            <div className={displayClass}>
              <p>{this.props.blurb}</p>
              <a href="https://github.com/desmosinc/gifsmos" target="blank">
                <p>More Info</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
