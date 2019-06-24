import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state, ownProps) => {
  const { expandedPane } = state.ui;

  return {
    expandedPane
  };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
