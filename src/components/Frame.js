import React from 'react';
import classNames from 'classnames';
import './Frame.css';

const Frame = ({ imageSrc, playing, togglePlaying }) => (
  <div className={classNames('Frame', { 'Frame-empty': !imageSrc })}>
    {imageSrc && (
      <>
        <img src={imageSrc} alt="current frame" />
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
