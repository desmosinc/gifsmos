import PropTypes from 'prop-types';

export const imageSettingsPropTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  oversample: PropTypes.bool.isRequired
};

export const sidebarButtonPropsTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
