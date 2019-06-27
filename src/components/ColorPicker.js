import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
  }

  handleInputUpdate(color) {
    this.props.updateTextColor(color.hex);
  }

  render() {
    return (
      <div>
        <SketchPicker
          className="ColorPicker-SketchPicker"
          onChange={this.handleInputUpdate}
          color={this.props.textColor}
        />
      </div>
    );
  }
}

export default ColorPicker;
