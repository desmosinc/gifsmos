import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SidebarContainer from '../containers/SidebarContainer';
import PreviewContainer from '../containers/PreviewContainer';
import BurstContainer from '../containers/BurstContainer';
import SettingsContainer from '../containers/SettingsContainer';
import ErrorToastContainer from '../containers/ErrorToastContainer';
import CALCULATOR_OPTIONS from '../constants/calculator-options';
import './App.css';

// The Desmos API is loaded in index.html
const Desmos = window.Desmos;
const calcContainer = React.createRef();
export let calculator;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown({ key }) {
    const { onEscape } = this.props;
    if (key === 'Escape') onEscape();
  }

  componentDidMount() {
    calculator = Desmos.GraphingCalculator(
      calcContainer.current,
      CALCULATOR_OPTIONS
    );

    window.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="calculator" ref={calcContainer} />
        <SettingsContainer />
        <PreviewContainer />
        <BurstContainer />
        <SidebarContainer />
        <ErrorToastContainer />
      </div>
    );
  }
}

App.defaultProps = {
  onEscape: () => {}
};

App.propTypes = {
  onEscape: PropTypes.func.isRequired
};

export default App;
