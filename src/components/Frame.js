import React from 'react';
import classNames from 'classnames';
import './Frame.css';

const Frame = ({
  imageSrc,
  playing,
  togglePlaying,
  caption,
  fontColor,
  textPosition
}) => (
  <div
    className={classNames('Frame', { 'Frame-empty': !imageSrc })}
    data-testid="Frame-container"
  >
    {imageSrc && (
      <>
        <div className="frame-container">
          <img src={imageSrc} alt="current frame" />
          <p className={textPosition} style={{ color: fontColor }}>
            {caption}
          </p>
        </div>
        <button
          className="Frame-animation-button"
          onClick={togglePlaying}
          aria-label={
            playing ? 'pause preview animation' : 'play preview animation'
          }
        >
          {playing ? '\u275a \u275a' : '\u25b6'}
        </button>
      </>
    )}
  </div>
);

export default Frame;
