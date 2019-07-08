import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state, ownProps) => {
  const { expandedPane } = state.ui;

  return {
    pane: expandedPane.toLowerCase()
  };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
