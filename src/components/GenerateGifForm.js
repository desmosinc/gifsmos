import React, { Component } from 'react';
import './GenerateGifForm.css';

class GenerateGifForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', titleText: '' };
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.handleGenerateGIF();
    this.props.updateGifFileName(this.state.name);
    // set title
    this.setState({ name: '', titleText: '' });
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
          name="titleText"
          value={this.state.titleText}
          onChange={this.handleInputUpdate}
          placeholder="add title text"
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
