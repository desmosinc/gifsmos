import React, { Component } from 'react';
import './GenerateGifForm.css';

class GenerateGifForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.handleGenerateGIF();
  }

  handleInputUpdate(evt) {
    if (evt.target.name === 'caption') {
      this.props.updateText(evt.target.value);
    }
    if (evt.target.name === 'fontColor') {
      this.props.updateTextColor(evt.target.value);
    }
    if (evt.target.name === 'name') {
      this.props.updateGIFFileName(evt.target.value);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="GenerateGifForm-input"
          name="name"
          onChange={this.handleInputUpdate}
          placeholder="pick a name for your GIF"
          value={this.props.gifFileName}
        />
        <input
          className="GenerateGifForm-input"
          name="caption"
          onChange={this.handleInputUpdate}
          placeholder="add caption"
          value={this.props.caption}
        />
        <input
          className="GenerateGifForm-input"
          name="fontColor"
          type="color"
          onChange={this.handleInputUpdate}
          value={this.props.fontColor}
        />
        <button
          className="GenerateGifForm-button"
          aria-label="generate gif"
          type="submit"
        >
          Generate!
        </button>
      </form>
    );
  }
}

export default GenerateGifForm;
