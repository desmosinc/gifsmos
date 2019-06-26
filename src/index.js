import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import AppContainer from './containers/AppContainer';
import panes from './constants/pane-types';
import { togglePane } from './actions';
import greet from './lib/dev-greeting';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const closePane = () => store.dispatch(togglePane(panes.NONE));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer onEscape={closePane} />
  </Provider>,
  document.getElementById('root')
);

// Say hello to the nice people with their consoles open.
greet();
