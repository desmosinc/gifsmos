import React from 'react';
import PropTypes from 'prop-types';
import { sidebarButtonDefaults } from '../lib/defaultProps';
import { sidebarButtonPropTypes } from '../lib/propTypes';
import classNames from 'classnames';
import SidebarButton from './SidebarButton';

const SidebarButtonWithBadge = ({ showBadge, value, color, ...props }) => (
  <SidebarButton {...props}>
    {showBadge && (
      <div
        className={classNames(
          'SidebarButton-badge',
          `SidebarButton-badge-${color}`
        )}
      >
        {value}
      </div>
    )}
  </SidebarButton>
);

SidebarButtonWithBadge.defaultProps = {
  ...sidebarButtonDefaults,
  expanded: false,
  color: '',
  showBadge: false,
  value: 0
};

SidebarButtonWithBadge.propTypes = {
  ...sidebarButtonPropTypes,
  expanded: PropTypes.bool,
  color: PropTypes.string.isRequired,
  showBadge: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

export default SidebarButtonWithBadge;
