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
    this.props.addText('');
    this.props.addTextColor('');
  }

  handleInputUpdate(evt) {
    if (evt.target.name === 'caption') {
      this.props.addText(evt.target.value);
    }
    if (evt.target.name === 'fontColor') {
      this.props.addTextColor(evt.target.value);
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
        />
        <input
          className="GenerateGifForm-input"
          name="caption"
          onChange={this.handleInputUpdate}
          placeholder="add caption"
        />
        <input
          className="GenerateGifForm-input"
          name="fontColor"
          type="color"
          defaultValue="#E79600"
          onChange={this.handleInputUpdate}
        />
        <button
          className="GenerateGifForm-button"
          aria-label="generate gif"
          type="submit"
        >
          Generate GIF
        </button>
      </form>
    );
  }
}

export default GenerateGifForm;
