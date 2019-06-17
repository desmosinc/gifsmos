import React from 'react';
import classNames from 'classnames';
import camera from './icons/camera.svg';
import preview from './icons/preview.svg';
import reset from './icons/reset.svg';
import download from './icons/download.svg';
import burst from './icons/burst.svg';
import settings from './icons/settings.svg';
import './SidebarButton.css';

const iconMap = {
  camera,
  preview,
  reset,
  download,
  burst,
  settings
};

const ariaMap = {
  camera: 'capture frame',
  preview: 'preview panel',
  reset: 'reset images',
  download: 'download gif',
  burst: 'multi-capture panel',
  settings: 'settings panel'
};

const SidebarButton = ({ children, icon, onClick, expanded }) => (
  <button
    className={classNames('SidebarButton', {
      'SidebarButton-expanded': expanded
    })}
    onClick={onClick}
    aria-label={ariaMap[icon]}
    aria-expanded={expanded}
  >
    <img src={iconMap[icon]} alt={`${icon} icon`} />
    {children}
  </button>
);

export default SidebarButton;
