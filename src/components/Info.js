import React, { Component } from 'react';
import info from './icons/info.svg';

export default class Info extends Component {
  render() {
    return (
      <div>
        <div>
          <img
            onClick={this.props.toggleInfo}
            title="Info"
            className={this.props.infoButtonClass}
            src={info}
            alt="info"
          />
        </div>
        <div className={`${this.props.className} ${this.props.displayClass}`}>
          {this.props.blurb}
        </div>
      </div>
    );
  }
}
