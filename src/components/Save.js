import React, { Component } from 'react';
import classNames from 'classnames';
import {
  getSavedGraphsList,
  removeGraphFromLocal
} from '../lib/local-storage-helpers';
import panes from '../constants/pane-types';
import './Save.css';

class Save extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      prevGraphs: getSavedGraphsList(),
      errors: {}
    };

    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleSaveCurrent = this.handleSaveCurrent.bind(this);
    this.handleLoadGraph = this.handleLoadGraph.bind(this);
    this.handleDeleteSavedGraph = this.handleDeleteSavedGraph.bind(this);
  }

  handleInputUpdate(evt) {
    const { name, value } = evt.target;

    this.setState(st => {
      const { ...nextState } = st;
      nextState[name] = value;
      return nextState;
    });
  }

  handleDeleteSavedGraph(date) {
    removeGraphFromLocal(date);
    this.setState(st => ({
      prevGraphs: st.prevGraphs.filter(graph => graph[0] !== date)
    }));
  }

  async handleSaveCurrent() {
    const { name } = this.state;
    const { togglePane, saveGraph } = this.props;
    const { frames, frameIDs } = this.props.images;
    const { errors, ...newState } = this.state;
    let newGraph = await saveGraph(name, frames, frameIDs);

    if (newGraph) {
      newState.name = '';
      newState.prevGraphs = [...newState.prevGraphs, newGraph];
      togglePane(panes.FILES);
    }

    this.setState(newState);
  }

  handleLoadGraph(date) {
    const { togglePane, loadFramesFromLocal } = this.props;
    loadFramesFromLocal(date);
    togglePane(panes.files);
  }

  render() {
    const { name, errors, prevGraphs } = this.state;
    const { expanded } = this.props;

    if (!expanded) return <div className="Save" />;

    const savedList = prevGraphs ? (
      <ul className="Save-saved-list">
        {prevGraphs.map(function([date, name, preview]) {
          return (
            <div className="Save-saved-item" key={`${date}-${name}`}>
              <div
                className="Save-saved-graph"
                onClick={() => this.handleLoadGraph(date)}
              >
                <img src={preview} alt={name + '-preview'} />
                <div className="Save-item-text">
                  <div>{name}</div>
                  <div className="Save-small-text">
                    created on: {date.slice(0, date.lastIndexOf(' '))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => this.handleDeleteSavedGraph(date)}
                className="Save-button Save-delete-graph"
              >
                <div className="Save-delete-text">+</div>
              </button>
            </div>
          );
        }, this)}
      </ul>
    ) : (
      <div className="Save-small-text Save-previous-items">
        <em>No Saved Graphs</em>
      </div>
    );

    return (
      <div
        className={classNames('Save', {
          'Save-expanded': expanded
        })}
      >
        <div>
          <div className="Save-titles">Name</div>
          <input
            className={classNames('Save-input', {
              'Save-input-error': !!errors.name
            })}
            type="text"
            name="name"
            placeholder="Graph name"
            aria-label="graph name"
            value={name}
            onChange={this.handleInputUpdate}
          />
          <div>
            <button
              className="Save-button Save-save"
              onClick={this.handleSaveCurrent}
              aria-label="save this graph"
            >
              Save
            </button>
          </div>
        </div>
        <div className="Save-titles">Saved Graphs</div>
        <div className="Save-previous-items">{savedList}</div>
      </div>
    );
  }
}

export default Save;
