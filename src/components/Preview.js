import React, { Component } from 'react';
import classNames from 'classnames';
import Frame from './Frame';
import GenerateGifForm from './GenerateGifForm';
import './Preview.css';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.handlePreviewUpdate = this.handlePreviewUpdate.bind(this);
    this.handleGenerateGIF = this.handleGenerateGIF.bind(this);
    this.handleTogglePlaying = this.handleTogglePlaying.bind(this);
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
      fontColor
    } = this.props;
    const images = frameIDs.map(id => frames[id]);
    const multiplier = oversample ? 2 : 1;
    const opts = {
      gifWidth: width * multiplier,
      gifHeight: height * multiplier,
      interval: interval / 1000,
      text: caption,
      fontColor: fontColor
    };
    generateGIF(images, opts);
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

    return (
      <div className={classNames('Preview', { 'Preview-expanded': expanded })}>
        <Frame
          imageSrc={imageSrc}
          playing={playing}
          togglePlaying={this.handleTogglePlaying}
        />
        <div className="Preview-scrubber">
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
        <div className="Preview-scrubber-counter">
          {numFrames ? `${previewIdx + 1} / ${numFrames}` : '0 / 0'}
        </div>
        <div className="Preview-create">
          {!!numFrames && this.props.gifData.length === 0 ? (
            <GenerateGifForm
              handleGenerateGIF={this.handleGenerateGIF}
              defaultColor={this.props.fontColor}
              addText={this.props.addText}
              addTextColor={this.props.addTextColor}
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
      </div>
    );
  }
}

export default Preview;
