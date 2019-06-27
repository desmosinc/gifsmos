import React from 'react';
import PropTypes from 'prop-types';
import { sidebarButtonDefaults } from '../lib/defaultProps';
import { sidebarButtonPropTypes } from '../lib/propTypes';
import classNames from 'classnames';
import camera from './icons/camera.svg';
import preview from './icons/preview.svg';
import burst from './icons/burst.svg';
import saved from './icons/saved.svg';
import settings from './icons/settings.svg';
import reset from './icons/reset.svg';
import './SidebarButton.css';

const iconMap = {
  camera,
  preview,
  reset,
  burst,
  settings,
  saved
};

const ariaMap = {
  camera: 'capture frame',
  preview: 'preview panel',
  reset: 'reset images',
  burst: 'multi-capture panel',
  settings: 'settings panel',
  saved: 'saved-graphs panel'
};

const SidebarButton = ({ children, icon, onClick, expanded }) => (
  <div className="SidebarButton-tooltip">
    <span className="SidebarButton-tooltiptext">
      {icon[0].toUpperCase() + icon.slice(1)}
    </span>
    <button
      className={classNames('SidebarButton', {
        'SidebarButton-expanded': expanded
      })}
      onClick={onClick}
      aria-label={ariaMap[icon]}
      aria-expanded={expanded}
      data-testid={`SidebarButton-${icon}-button`}
    >
      <img src={iconMap[icon]} alt={`${icon} icon`} />
      {children}
    </button>
  </div>
);

SidebarButton.defaultProps = {
  ...sidebarButtonDefaults,
  expanded: false
};

SidebarButton.propTypes = {
  ...sidebarButtonPropTypes,
  expanded: PropTypes.bool
};

export default SidebarButton;
