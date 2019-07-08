/**
 * Helper functions for loading and saving graphs to/from local storage
 */

export const saveGraphToLocal = (graph, name, preview, frames, frameIDs) => {
  let savedGraphs = localStorage.getItem('gifsmos-saved-graphs');
  savedGraphs = savedGraphs ? JSON.parse(savedGraphs) : { saved: {} };
  const newGraph = {
    name,
    graph,
    preview,
    frames,
    frameIDs
  };
  let timeStamp = new Date().toLocaleString();
  savedGraphs.saved[timeStamp] = newGraph;

  localStorage.setItem('gifsmos-saved-graphs', JSON.stringify(savedGraphs));
  return [timeStamp, name, preview];
};

export const getGraphFromLocal = dateString => {
  let savedGraphs = JSON.parse(localStorage.getItem('gifsmos-saved-graphs'));
  return savedGraphs.saved[dateString];
};

export const getSavedGraphsList = () => {
  let savedGraphs = JSON.parse(localStorage.getItem('gifsmos-saved-graphs'));

  return savedGraphs
    ? Object.entries(savedGraphs.saved).map(([date, obj]) => [
        date,
        obj.name,
        obj.preview
      ])
    : [];
};

export const removeGraphFromLocal = dateString => {
  let savedGraphs = JSON.parse(localStorage.getItem('gifsmos-saved-graphs'));
  delete savedGraphs.saved[dateString];
  localStorage.setItem('gifsmos-saved-graphs', JSON.stringify(savedGraphs));
};
