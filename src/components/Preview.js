import React, { Component } from 'react';
import classNames from 'classnames';
import Frame from './Frame';
import './Preview.css';
import Info from './Info';
import previewBlurb from './infoBlurbs/previewBlurb';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    };
    this.handlePreviewUpdate = this.handlePreviewUpdate.bind(this);
    this.handleGenerateGIF = this.handleGenerateGIF.bind(this);
    this.handleTogglePlaying = this.handleTogglePlaying.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
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
      generateGIF
    } = this.props;
    const images = frameIDs.map(id => frames[id]);
    const multiplier = oversample ? 2 : 1;
    const opts = {
      gifWidth: width * multiplier,
      gifHeight: height * multiplier,
      interval: interval / 1000
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

  toggleInfo() {
    this.setState({
      showInfo: !this.state.showInfo
    });
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
    let displayClass = this.state.showInfo ? 'show' : 'hide';

    if (!expanded) return <div className="Preview" />;

    return (
      <div className={classNames('Preview', { 'Preview-expanded': expanded })}>
        <div className="previewHeader">
          <h1>Preview</h1>
        </div>
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
          <div className="previewInfoContainer">
            <Info
              infoButtonClass={'previewInfoButton'}
              className={'previewInformation'}
              toggleInfo={this.toggleInfo}
              displayClass={displayClass}
              blurb={previewBlurb}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Preview;
