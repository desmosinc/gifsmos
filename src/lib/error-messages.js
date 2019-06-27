/*
 * Centralized logic for returning human-radable error messages.
 *
 * As a guiding principle, error messages should refer to the input that led to
 * the error when possible.
 */

export const noSuchExpression = idx =>
  `There is no expression at position ${idx}.`;

export const notASlider = idx =>
  `Looks like expression ${idx} doesn't define a slider.`;

export const badNameInput = errorMessage =>
  `Invalid name input for saving graph: ${errorMessage}`;

export const gifCreationProblem = () =>
  'There was a problem creating your GIF. :(';

export const badBurstInput = errors => {
  const propMap = {
    idx: 'Slider Index',
    min: 'Slider Min',
    max: 'Slider Max',
    step: 'Slider Step'
  };

  let badProps = [];
  for (let prop in errors) {
    if (!!errors[prop]) badProps.push(prop);
  }

  let propText;
  switch (badProps.length) {
    case 1:
      propText = propMap[badProps[0]];
      break;
    case 2:
      propText = badProps.indexOf('idx') > -1 ? propMap.idx : 'input';
      break;
    default:
      propText = 'input';
  }

  if (propText === propMap.idx) {
    return `Your ${propText} must be a positive integer.`;
  }

  return `Your ${propText} isn't quite right.`;
};

export const badSettingsInput = errors => {
  const propMap = {
    width: 'Image Width',
    height: 'Image Height',
    interval: 'Interval'
  };

  let badProps = [];
  for (let prop in errors) {
    if (!!errors[prop]) badProps.push(prop);
  }

  if (badProps.length === 1) {
    let propText = propMap[badProps[0]];
    return `The ${propText} setting must be a positive integer.`;
  }

  return 'Image settings must be positive integers.';
};

export const invalidBounds = errors => {
  let badProps = [];
  for (let prop in errors) {
    if (!!errors[prop]) badProps.push(prop);
  }

  let errorString = [];

  for (let i = 0; i < badProps.length; i++) {
    let errBound = badProps[i];

    switch (errBound) {
      case 'leftless':
        errorString.push(
          'Left Bound must be less than Right Bound to create a snapshot.'
        );
        break;
      case 'bottomless':
        errorString.push(
          'Bottom Bound must be less than Top Bound to create a snapshot.'
        );
        break;
      case 'top':
        errorString.push('Top Bound must be a valid integer.');
        break;
      case 'bottom':
        errorString.push('Bottom Bound must be a valid integer.');
        break;
      case 'left':
        errorString.push('Left Bound must be a valid integer.');
        break;
      case 'right':
        errorString.push('Right Bound must be a valid integer.');
        break;
      default:
        break;
    }
  }

  return errorString.join('   ');
};
