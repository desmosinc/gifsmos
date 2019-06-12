import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {
  handleInputUpdate = color => {
    console.log(color);
    this.props.updateTextColor(color.hex);
  };

  render() {
    return (
      <div>
        <SketchPicker
          className="GenerateGifForm-input"
          onChange={this.handleInputUpdate}
          color={this.props.textColor}
        />
      </div>
    );
  }
}

export default ColorPicker;
