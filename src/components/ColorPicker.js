import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.handleSetTimeout = this.handleSetTimeout.bind(this);
  }

  handleInputUpdate = color => {
    this.props.updateTextColor(color.hex);
  };

  handleSetTimeout() {
    setTimeout(this.props.closeColorPicker, 500);
  }

  render() {
    return (
      <div onMouseLeave={this.handleSetTimeout}>
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
