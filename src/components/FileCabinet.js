import React, { Component } from 'react';
import classNames from 'classnames';
import { getBurstErrors } from '../lib/input-helpers';
import { saveCurrentGraph, loadSavedGraph } from '../lib/calc-helpers';
import { getSavedGraphsList } from '../lib/local-storage-helpers';
import panes from '../constants/pane-types';
import './FileCabinet.css';

class FileCabinet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      errors: {}
    };

    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleSaveCurrent = this.handleSaveCurrent.bind(this);
    this.handleLoadGraph = this.handleLoadGraph.bind(this);
  }

  handleInputUpdate(evt) {
    const {
      target: { name, value }
    } = evt;
    const { errors, ...newState } = this.state;

    newState[name] = value;
    newState.errors = getBurstErrors(newState);

    this.setState(newState);
  }

  handleSaveCurrent() {
    const { name } = this.state;
    const { togglePane } = this.props;
    const { frames, frameIDs } = this.props.images;
    saveCurrentGraph(name, frames, frameIDs);

    const { errors, ...newState } = this.state;
    newState.name = '';
    newState.errors = getBurstErrors(newState);

    this.setState(newState);
    togglePane(panes.FILES);
  }

  handleLoadGraph(date) {
    const { togglePane, loadFramesFromLocal } = this.props;
    loadFramesFromLocal(date);
    togglePane(panes.files);
  }

  render() {
    const { name, errors } = this.state;
    const { expanded } = this.props;

    if (!expanded) return <div className="FileCabinet" />;

    // const prevGraphs =
    const prevGraphs = getSavedGraphsList();
    const savedList = prevGraphs ? (
      <ul className="FileCabinet-saved-list">
        {prevGraphs.map(function([date, name, preview]) {
          return (
            <div
              className="FileCabinet-saved-item"
              onClick={() => this.handleLoadGraph(date)}
              key={`${date}-${name}`}
            >
              <img src={preview} alt={name + '-preview'} />
              <div className="FileCabinet-item-text">
                <div>{name}</div>
                <div className="FileCabinet-small-text">
                  created on: {date.slice(0, date.lastIndexOf(' '))}
                </div>
              </div>
            </div>
          );
        }, this)}
      </ul>
    ) : (
      <div className="FileCabinet-small-text FileCabinet-previous-items">
        <em>No Saved Graphs</em>
      </div>
    );

    return (
      <div
        className={classNames('FileCabinet', {
          'FileCabinet-expanded': expanded
        })}
      >
        <div>Name</div>
        <input
          className={classNames('FileCabinet-input', {
            'FileCabinet-input-error': !!errors.min
          })}
          type="text"
          name="name"
          placeholder="graph name"
          aria-label="graph name"
          value={name}
          onChange={this.handleInputUpdate}
        />
        <div>
          <button
            className="Burst-button"
            onClick={this.handleSaveCurrent}
            aria-label="save this graph"
          >
            Save
          </button>
        </div>
        <div className="FileCabinet-previous-items">
          <div>Saved Graphs</div>
          {savedList}
        </div>
      </div>
    );
  }
}

export default FileCabinet;
