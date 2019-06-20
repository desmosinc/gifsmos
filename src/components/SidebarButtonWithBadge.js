import React from 'react';
import PropTypes from 'prop-types';
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
  icon: '',
  onClick: () => {},
  expanded: false,
  color: '',
  showBadge: false,
  value: ''
};

SidebarButtonWithBadge.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
  color: PropTypes.string.isRequired,
  showBadge: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

export default SidebarButtonWithBadge;
