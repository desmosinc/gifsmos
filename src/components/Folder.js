import React, { Component } from 'react';
import classNames from 'classnames';
import {
  getSavedGraphsList,
  removeGraphFromLocal
} from '../lib/local-storage-helpers';
import panes from '../constants/pane-types';
import './Folder.css';

class Folder extends Component {
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
    togglePane(panes.FILES);
  }

  render() {
    const { name, errors, prevGraphs } = this.state;
    const { expanded } = this.props;

    if (!expanded) return <div className="Folder" />;

    const savedList = prevGraphs.length ? (
      <ul className="Folder-saved-list">
        {prevGraphs.reverse().map(function([date, name, preview]) {
          return (
            <div className="Folder-saved-item" key={`${date}-${name}`}>
              <div
                className="Folder-saved-graph"
                onClick={() => this.handleLoadGraph(date)}
              >
                <img src={preview} alt={name + '-preview'} />
                <div className="Folder-item-text">
                  <div className="Folder-name-text">{name}</div>
                  <div className="Folder-small-text">
                    created on: {date.slice(0, date.lastIndexOf(' '))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => this.handleDeleteSavedGraph(date)}
                className="Folder-button Folder-delete-graph"
              >
                <div className="Folder-delete-text">+</div>
              </button>
            </div>
          );
        }, this)}
      </ul>
    ) : (
      <div className="Folder-small-text Folder-previous-items">
        <em>No Saved Graphs</em>
      </div>
    );

    return (
      <div
        className={classNames('Folder', {
          'Folder-expanded': expanded
        })}
      >
        <div>
          <div className="Folder-titles">Name</div>
          <input
            className={classNames('Folder-input', {
              'Folder-input-error': !!errors.name
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
              className="Folder-button Folder-save"
              onClick={this.handleSaveCurrent}
              aria-label="Folder this graph"
            >
              Save
            </button>
          </div>
        </div>
        <div className="Folder-titles">Saved Graphs</div>
        <div className="Folder-previous-items">{savedList}</div>
      </div>
    );
  }
}

export default Folder;
