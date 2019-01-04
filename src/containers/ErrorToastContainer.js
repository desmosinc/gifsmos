import { connect } from 'react-redux';
import ErrorToast from '../components/ErrorToast';

const mapStateToProps = (state, ownProps) => ({
  message: state.ui.error
});

const ErrorToastContainer = connect(mapStateToProps)(ErrorToast);

export default ErrorToastContainer;
