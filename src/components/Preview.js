import React, { Component } from 'react';
import classNames from 'classnames';
import Frame from './Frame';
import './Preview.css';
import left from './icons/left.svg';
import right from './icons/right.svg';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.handlePreviewUpdate = this.handlePreviewUpdate.bind(this);
    this.handleGenerateGIF = this.handleGenerateGIF.bind(this);
    this.handleTogglePlaying = this.handleTogglePlaying.bind(this);
    this.handleDeleteFrame = this.handleDeleteFrame.bind(this);
    this.handleIncrementPreviewIdx = this.handleIncrementPreviewIdx.bind(this);
    this.handleRedoFrame = this.handleRedoFrame.bind(this);
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

  handleDeleteFrame(curPrevIdx) {
    const { frameIDs, updatePreviewIdx, deleteFrameAtIdx } = this.props;

    const newIdx = curPrevIdx - 1 < 0 ? 0 : curPrevIdx - 1;
    deleteFrameAtIdx(frameIDs[curPrevIdx]);
    updatePreviewIdx(newIdx);
  }

  handleIncrementPreviewIdx(incrementUp) {
    const { previewIdx, frameIDs, updatePreviewIdx } = this.props;

    if (!!incrementUp) {
      const newIdx =
        previewIdx + 1 > frameIDs.length - 1 ? previewIdx : previewIdx + 1;
      updatePreviewIdx(newIdx);
    } else {
      const newIdx = previewIdx - 1 < 0 ? 0 : previewIdx - 1;
      updatePreviewIdx(newIdx);
    }
  }

  handleRedoFrame() {
    const { redoFrames, redoLastFrame } = this.props;

    const lastFrame = redoFrames[redoFrames.length - 1];
    const id = lastFrame.id;
    const frameData = lastFrame.frameData;

    redoLastFrame({ id, frameData });
  }

  render() {
    const {
      expanded,
      previewIdx,
      frames,
      frameIDs,
      gifProgress,
      playing,
      redoFrames
    } = this.props;

    const numFrames = frameIDs.length;
    const imageSrc = frames[frameIDs[previewIdx]];

    if (!expanded) return <div className="Preview" />;

    return (
      <div className={classNames('Preview', { 'Preview-expanded': expanded })}>
        <div className="Frame-section-container">
          <img
            className="directional-icon"
            src={left}
            onClick={() => this.handleIncrementPreviewIdx(false)}
            alt=""
          />
          <Frame
            imageSrc={imageSrc}
            playing={playing}
            togglePlaying={this.handleTogglePlaying}
          />
          <img
            className="directional-icon"
            src={right}
            onClick={() => this.handleIncrementPreviewIdx(true)}
            alt=""
          />
        </div>

        <div className="Frame-delete">
          {!!numFrames ? (
            <button
              className="Frame-delete-redo-button"
              aria-label="delete this frame"
              onClick={() => this.handleDeleteFrame(previewIdx)}
            >
              Delete this Frame
            </button>
          ) : null}
          {!!redoFrames.length ? (
            <button
              className="Frame-delete-redo-button"
              aria-label="redo last frame"
              onClick={this.handleRedoFrame}
            >
              Redo Last Delete
            </button>
          ) : null}
        </div>
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

        <div className="Preview-scrubber-counter">
          {numFrames ? `${previewIdx + 1} / ${numFrames}` : '0 / 0'}
        </div>

        <div className="Frame-timeline">
          {frameIDs.map((frameID, i) => (
            <img
              className="Frame-scroll"
              src={frames[frameID]}
              onClick={() => this.handleDeleteFrame(i)}
              alt=""
            />
          ))}
        </div>

        <div className="Preview-create">
          {!!numFrames && (
            <button
              className="Preview-create-button"
              onClick={this.handleGenerateGIF}
              aria-label="generate gif"
            >
              Generate GIF
            </button>
          )}
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
          <div className="Preview-progress-success">Download Successful </div>
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
