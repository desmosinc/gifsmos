/*
 * Calculator helpers
 *
 * We're only using a small portion of the Desmos API, and in pretty spefic
 * ways. Defining a few helper methods makes those call sites more descriptive
 * and concise.
 */

import { calculator } from '../components/App';
import { noSuchExpression, notASlider } from './error-messages';
import { saveGraphToLocal, getGraphFromLocal } from './local-storage-helpers';

/*
 * The calculator's async screenshot method takes a callback, but we'd prefer to
 * be able to `await` the results inside of async action creators, so wrap it up
 * in a promise.
 */
export const getImageData = opts =>
  new Promise((resolve, reject) => {
    calculator.asyncScreenshot(opts, data => resolve(data));
  });

/*
 * Note that the array of expressions returned fom the Desmos API is 0-indexed,
 * but the numbering in the calculator UI is 1-indexed. Functions here that
 * accept an expression index as an argument should be 1-indexed so that users
 * can enter numbers that match what they're looking at in the UI.
 */
const getExpByIndex = idx => calculator.getExpressions()[idx - 1];

// Returns an error message on failure.
export const setSliderByIndex = (idx, val) => {
  const exp = getExpByIndex(idx);
  if (!exp) return noSuchExpression(idx);

  const { id, latex } = exp;
  const match = latex.match(/(.+)=/);
  if (!match) return notASlider(idx);

  const identifier = match[1];
  calculator.setExpression({ id, latex: `${identifier}=${val}` });
};

/**
 * saves the current graph and any gifs to local storage
 * returns the new graph info to add to saved graph list
 */
export const saveCurrentGraph = async (name, frames, frameIDs) => {
  const graph = calculator.getState();
  const preview = await getImageData({
    width: 160,
    height: 160,
    targetPixelRatio: 0.25
  });

  return saveGraphToLocal(graph, name, preview, frames, frameIDs);
};

// retrieves saved graph
export const loadSavedGraph = dateString => {
  const { graph, frames, frameIDs } = getGraphFromLocal(dateString);
  calculator.setState(graph);
  return { frames, frameIDs };
};
