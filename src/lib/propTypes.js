import PropTypes from 'prop-types';

export const imageSettingPropTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  oversample: PropTypes.bool.isRequired
};

export const sidebarButtonPropTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
