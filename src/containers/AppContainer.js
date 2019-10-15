import { connect } from 'react-redux';
import App from '../components/App';
import { getBurstSliders } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { expandedPane, burstSliders } = state.ui;

  return {
    pane: expandedPane.toLowerCase(),
    burstSliders: burstSliders
  };
};

const AppContainer = connect(
  mapStateToProps,
  { getBurstSliders }
)(App);

export default AppContainer;
