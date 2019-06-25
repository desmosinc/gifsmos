import React, { Component } from 'react';
import './GenerateGifForm.css';
import ColorPicker from './ColorPicker';

class GenerateGifForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColor: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.renderColorPicker = this.renderColorPicker.bind(this);
    this.closeColorPicker = this.closeColorPicker.bind(this);
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

      case 'placement':
        const [textBaseline, textAlign] = evt.target.value.split('-');
        this.props.updateTextPosition({ textAlign, textBaseline });
        localStorage.setItem('selectValue', evt.target.value);
        break;

      default:
        break;
    }
  }

  renderColorPicker() {
    this.setState(prevState => ({
      showColor: !prevState.showColor
    }));
  }

  closeColorPicker() {
    this.setState({ showColor: false });
  }

  render() {
    console.log(this.state);
    let currentValue = localStorage.getItem('selectValue') || 'DEFAULT';
    let colorPicker = (
      <ColorPicker
        updateTextColor={this.props.updateTextColor}
        textColor={this.props.fontColor}
        closeColorPicker={this.closeColorPicker}
        showColor={this.state.showColor}
      />
    );

    let colorPickerBg = { backgroundColor: this.props.fontColor };
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="GenerateGifForm-input"
          name="name"
          onChange={this.handleInputUpdate}
          placeholder="Add a File Name"
          value={this.props.gifFileName}
        />
        <input
          className="GenerateGifForm-input"
          name="caption"
          onChange={this.handleInputUpdate}
          placeholder="Add a Caption"
          value={this.props.caption}
        />
        <select
          type="select"
          className="GenerateGifForm-select"
          name="placement"
          id="GenerateGifForm-select"
          onChange={this.handleInputUpdate}
          defaultValue={currentValue}
        >
          <option disabled value="DEFAULT">
            Pick a Text Position
          </option>
          <option value="top-left">Top Left</option>
          <option value="top-center">Top Center</option>
          <option value="top-right"> Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-center">Bottom Center</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
        <div
          style={colorPickerBg}
          onClick={this.renderColorPicker}
          className="colorPicker"
        >
          <p>Pick a Caption Color</p>
        </div>
        {this.state.showColor ? colorPicker : null}
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
