/**
 * Helper functions for loading and saving graphs to/from local storage
 */

/**
 * takes a graph object & graph name, stringifies, and saves to local storage
 * in "saved" object with unique key of date string
 */
export const saveGraphToLocal = (graph, name, preview) => {
  let savedGraphs = localStorage.getItem('gifsmos-saved-graphs');
  if (!savedGraphs) {
    savedGraphs = {
      saved: {}
    };
  } else {
    savedGraphs = JSON.parse(savedGraphs);
  }
  const newGraph = {
    name,
    graph,
    preview
  };
  let timeStamp = new Date().toString();
  timeStamp = timeStamp.slice(0, timeStamp.indexOf('(') - 1);
  savedGraphs.saved[timeStamp] = newGraph;
  localStorage.setItem('gifsmos-saved-graphs', JSON.stringify(savedGraphs));
};

/**
 * takes a date string and retrieves the graph object from local storage
 * returns graph object
 */

export const getGraphFromLocal = dateString => {
  console.log(typeof dateString);

  let savedGraphs = JSON.parse(localStorage.getItem('gifsmos-saved-graphs'));
  return savedGraphs.saved[dateString].graph;
};

/**
 * returns an array of objects with a name and dateStrings or
 * null if none saved
 */
export const getSavedGraphsList = () => {
  let savedGraphs = JSON.parse(localStorage.getItem('gifsmos-saved-graphs'));

  return savedGraphs
    ? Object.entries(savedGraphs.saved).map(([date, obj]) => [
        date,
        obj.name,
        obj.preview
      ])
    : savedGraphs;
};
