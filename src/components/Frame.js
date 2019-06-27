import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Frame.css';

const Frame = ({ imageSrc, playing, togglePlaying }) => (
  <div
    className={classNames('Frame', { 'Frame-empty': !imageSrc })}
    data-testid="Frame-container"
  >
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

Frame.defaultProps = {
  imageSrc: '',
  playing: false,
  togglePlaying: () => {}
};

Frame.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  togglePlaying: PropTypes.func.isRequired
};

export default Frame;
