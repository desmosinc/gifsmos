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
        let values = evt.target.value.split('-');
        let positionObj = {
          textAlign: values[1],
          textBaseline: values[0]
        };
        this.props.updateTextPosition(positionObj);
        let selectValue = document.getElementById('GenerateGifForm-select');
        selectValue = selectValue.options[selectValue.selectedIndex].value;
        localStorage.setItem('selectValue', selectValue);
        this.props.updateTextPosition(positionObj);

        break;
      default:
        break;
    }
  }

  renderColorPicker() {
    this.setState(state => ({
      showColor: !state.showColor
    }));
  }

  closeColorPicker() {
    this.setState({ showColor: false });
  }

  render() {
    let currentValue = localStorage.getItem('selectValue') || 'DEFAULT';
    let colorPicker = (
      <ColorPicker
        updateTextColor={this.props.updateTextColor}
        textColor={this.props.fontColor}
        closeColorPicker={this.closeColorPicker}
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
        <select
          type="select"
          className="GenerateGifForm-select"
          name="placement"
          id="GenerateGifForm-select"
          onChange={this.handleInputUpdate}
          defaultValue={currentValue}
        >
          <option disabled value="DEFAULT">
            pick a text position
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
          <p>pick a caption color</p>
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
