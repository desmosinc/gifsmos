import React from 'react';
import './ErrorToast.css';

const ErrorToast = ({ message }) => {
  if (!message.length) return null;
  return (
    <div className="ErrorToast" role="alert" aria-errormessage={message}>
      {message}
    </div>
  );
};

ErrorToast.defaultProps = {
  message: ''
};

export default ErrorToast;
