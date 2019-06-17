import React, { Component } from 'react';
import classNames from 'classnames';
import { getSaveGraphErrors } from '../lib/input-helpers';
import { saveCurrentGraph } from '../lib/calc-helpers';
import { getSavedGraphsList } from '../lib/local-storage-helpers';
import panes from '../constants/pane-types';
import './Folder.css';

class Folder extends Component {
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
    const { name, value } = evt.target;

    this.setState(st => {
      const { ...nextState } = st;
      nextState[name] = value;
      return nextState;
    });
  }

  handleSaveCurrent() {
    const { name } = this.state;
    const { togglePane } = this.props;
    const { frames, frameIDs } = this.props.images;
    const { errors, ...newState } = this.state;
    newState.errors = getSaveGraphErrors(name);

    if (!newState.errors.name) {
      saveCurrentGraph(name, frames, frameIDs);
      newState.name = '';
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
    const { name, errors } = this.state;
    const { expanded } = this.props;

    if (!expanded) return <div className="Folder" />;

    const prevGraphs = getSavedGraphsList();
    const savedList = prevGraphs ? (
      <ul className="Folder-saved-list">
        {prevGraphs.map(function([date, name, preview]) {
          return (
            <div
              className="Folder-saved-item"
              onClick={() => this.handleLoadGraph(date)}
              key={`${date}-${name}`}
            >
              <img src={preview} alt={name + '-preview'} />
              <div className="Folder-item-text">
                <div>{name}</div>
                <div className="Folder-small-text">
                  created on: {date.slice(0, date.lastIndexOf(' '))}
                </div>
              </div>
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
            placeholder={errors.name ? errors.name : 'Graph name'}
            aria-label="graph name"
            value={name}
            onChange={this.handleInputUpdate}
          />
          <div>
            <button
              className="Folder-button"
              onClick={this.handleSaveCurrent}
              aria-label="save this graph"
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
