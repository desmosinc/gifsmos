import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {
  handleInputUpdate = color => {
    this.props.updateTextColor(color.hex);
  };

  render() {
    return (
      <div>
        <SketchPicker
          className="sketchPicker"
          onChange={this.handleInputUpdate}
          color={this.props.textColor}
        />
      </div>
    );
  }
}

export default ColorPicker;
