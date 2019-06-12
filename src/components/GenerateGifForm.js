import React, { Component } from 'react';
import './GenerateGifForm.css';
import ColorPicker from './ColorPicker';

class GenerateGifForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: false
    };
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderColorPicker = this.renderColorPicker.bind(this);
    this.removeColorPicker = this.removeColorPicker.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.handleGenerateGIF();
    this.props.updateText('');
    this.props.updateTextColor('#e79600');
  }

  handleInputUpdate(evt) {
    if (evt.target.name === 'caption') {
      this.props.updateText(evt.target.value);
    }

    if (evt.target.name === 'name') {
      this.props.updateGIFFileName(evt.target.value);
    }
  }

  renderColorPicker() {
    this.setState(state => ({
      color: !state.color
    }));
  }

  removeColorPicker() {
    this.setState({
      color: false
    });
  }

  render() {
    console.log(this.state.color);
    let colorPicker = (
      <ColorPicker
        updateTextColor={this.props.updateTextColor}
        textColor={this.props.fontColor}
        onMouseUp={this.removeColorPicker}
      />
    );
    let colorPickerBg = { backgroundColor: this.props.fontColor };
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
        <div
          style={colorPickerBg}
          onClick={this.renderColorPicker}
          className="colorPicker"
        >
          <p>pick a title color</p>
        </div>
        {this.state.color ? colorPicker : null}
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
