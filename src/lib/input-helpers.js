/*
 * Helpers to detect errors in user inputs.
 */

export const isPositiveInteger = val => {
  if (isNaN(val)) return false;
  if (Math.round(val) !== val) return false;
  return val > 0;
};

export const getBurstErrors = inputs => {
  const { idx, min, max, step } = inputs;
  const errors = {};

  for (let prop in inputs) {
    if (isNaN(inputs[prop])) errors[prop] = true;
  }

  if (!idx) errors.idx = true;
  if (min >= max) {
    errors.min = true;
    errors.max = true;
  }
  if (step > max - min) errors.step = true;

  return errors;
};

export const getSettingsErrors = inputs => {
  const errors = {};

  for (let prop in inputs) {
    if (!isPositiveInteger(inputs[prop])) errors[prop] = true;
  }

  return errors;
};
