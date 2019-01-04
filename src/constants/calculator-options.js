/*
 * Configuration options for the Desmos API. This object is passed to the
 * GraphingCalculator constructor once its container element mounts.
 *
 * editOnWeb: Enable exporting a graph to desmos.com so a user with a Desmos
 * account can save it there.
 *
 * pasteGraphLink: Enable importing a graph from desmos.com by pasting a saved
 * graph's URL into the expressions list in the calculator.
 *
 * See https://www.desmos.com/api for complete documentation.
 */

const CALCULATOR_OPTIONS = {
  border: false,
  editOnWeb: true,
  pasteGraphLink: true
};

export default CALCULATOR_OPTIONS;
