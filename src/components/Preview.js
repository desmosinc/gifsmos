import React, { Component } from 'react';
import classNames from 'classnames';
import Frame from './Frame';
import InfoIcon from './InfoIcon';
import GenerateGifFormContainer from '../containers/GenerateGifFormContainer';
import './Preview.css';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorPicker: false
    };

    this.handleGenerateGIF = this.handleGenerateGIF.bind(this);
    this.handlePreviewUpdate = this.handlePreviewUpdate.bind(this);
    this.handleTogglePlaying = this.handleTogglePlaying.bind(this);
    this.handleClickContainer = this.handleClickContainer.bind(this);
    this.updateColorPicker = this.updateColorPicker.bind(this);
  }

  handlePreviewUpdate(evt) {
    const { updatePreviewIdx, stopAnimation } = this.props;
    const idx = parseInt(evt.target.value, 10);
    stopAnimation();
    updatePreviewIdx(idx);
  }

  handleGenerateGIF() {
    const {
      frames,
      frameIDs,
      width,
      height,
      oversample,
      interval,
      generateGIF,
      caption,
      fontColor,
      textAlign,
      textBaseline
    } = this.props;

    const images = frameIDs.map(id => frames[id]);
    const multiplier = oversample ? 2 : 1;
    const opts = {
      gifWidth: width * multiplier,
      gifHeight: height * multiplier,
      interval: interval / 1000,
      text: caption,
      fontColor: fontColor,
      textAlign: textAlign,
      textBaseline: textBaseline
    };
    generateGIF(images, opts);
  }

  updateColorPicker(status) {
    this.setState({ showColorPicker: status });
  }

  handleClickContainer(evt) {
    if (evt.target.className === 'Preview Preview-expanded') {
      this.setState({
        showColorPicker: false
      });
    }
  }

  handleTogglePlaying() {
    const { playing, startAnimation, stopAnimation } = this.props;
    if (playing) {
      stopAnimation();
    } else {
      startAnimation();
    }
  }

  render() {
    const {
      expanded,
      previewIdx,
      frames,
      frameIDs,
      gifProgress,
      playing
    } = this.props;
    const numFrames = frameIDs.length;
    const imageSrc = frames[frameIDs[previewIdx]];

    if (!expanded) return <div className="Preview" />;

    const previewText = `Preview allows you to preview your future GIF by 
                         scrubbing through snapshots with the slider or 
                         previewing your GIF with the play/pause button.`;

    return (
      <div
        className={classNames('Preview', { 'Preview-expanded': expanded })}
        data-testid="Preview-container"
        onClick={this.handleClickContainer}
      >
        <div className="Preview-header">
          <h2>Preview</h2>
          <InfoIcon infoText={previewText} />
        </div>
        <div className={classNames({ 'Preview-muted': !numFrames })}>
          <Frame
            imageSrc={imageSrc}
            playing={playing}
            togglePlaying={this.handleTogglePlaying}
          />
          <div className="Preview-scrubber" data-testid="Preview-scrubber">
            <input
              type="range"
              min="0"
              max={numFrames - 1}
              value={previewIdx}
              onChange={this.handlePreviewUpdate}
              disabled={!numFrames}
              aria-label="preview frame index"
            />
          </div>
          <div
            className="Preview-scrubber-counter"
            data-testid="Preview-scrubber-counter"
          >
            {numFrames ? `${previewIdx + 1} / ${numFrames}` : '0 / 0'}
          </div>
        </div>
        <div
          className="Preview-create"
          data-testid="Preview-create-form-container"
        >
          {!!numFrames && this.props.gifData.length === 0 ? (
            <GenerateGifFormContainer
              handleGenerateGIF={this.handleGenerateGIF}
              showColorPicker={this.state.showColorPicker}
              updateColorPicker={this.updateColorPicker}
            />
          ) : null}
        </div>
        <div className="Preview-progress-outer">
          <div
            className="Preview-progress-inner"
            style={{
              width: `${100 * gifProgress}%`,
              background: gifProgress === 1 ? '#2ecc40' : '#e79600'
            }}
          />
        </div>
        {gifProgress === 1 ? (
          <div className="Preview-progress-success">Download Successful</div>
        ) : null}
        {!numFrames ? (
          <div className="Preview-no-frames">
            No frames have been captured. Use the camera or burst tools to add
            some!
          </div>
        ) : null}
      </div>
    );
  }
}

Preview.defaultProps = {
  previewIdx: 0,
  frames: {},
  frameIDs: [],
  gifData: ''
};

export default Preview;
