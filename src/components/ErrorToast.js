import React from 'react';
import PropTypes from 'prop-types';
import './ErrorToast.css';

const ErrorToast = ({ message }) => {
  if (!message.length) return null;
  return (
    <div className="ErrorToast" role="alert" aria-errormessage={message}>
      {message}
    </div>
  );
};

ErrorToast.propTypes = {
  message: PropTypes.string.isRequired
};

ErrorToast.defaultProps = {
  message: ''
};

export default ErrorToast;
