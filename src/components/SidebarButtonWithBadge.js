import React from 'react';
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

export default SidebarButtonWithBadge;
