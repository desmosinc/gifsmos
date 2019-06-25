import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColor: this.props.showColor
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleInputUpdate = color => {
    this.props.updateTextColor(color.hex);
  };

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.closeColorPicker();
    }
  }

  render() {
    let styles;
    if (this.state.showColor) {
      styles = null;
    } else {
      styles = {
        display: 'none'
      };
    }
    return (
      <div ref={this.setWrapperRef} style={styles}>
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
