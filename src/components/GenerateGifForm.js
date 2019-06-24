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
    switch (evt.target.name) {
      case 'caption':
        this.props.updateText(evt.target.value);
        break;
      case 'fontColor':
        this.props.updateTextColor(evt.target.value);
        break;
      case 'name':
        this.props.updateGIFFileName(evt.target.value);
        break;
      default:
        break;
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
          Download GIF
        </button>
      </form>
    );
  }
}

export default GenerateGifForm;
