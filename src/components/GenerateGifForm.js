import React, { Component } from 'react';
import './GenerateGifForm.css';

class GenerateGifForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', caption: '' };
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addText(this.state.caption);
    this.props.handleGenerateGIF();
    this.setState({ name: '', caption: '' });
  }

  handleInputUpdate(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="GenerateGifForm-input"
          name="name"
          value={this.state.name}
          onChange={this.handleInputUpdate}
          placeholder="pick a name for your GIF"
        />
        <input
          className="GenerateGifForm-input"
          name="caption"
          value={this.state.caption}
          onChange={this.handleInputUpdate}
          placeholder="add caption"
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
