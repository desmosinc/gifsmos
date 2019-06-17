/*
 * Helpers to detect errors in user inputs.
 */

export const isPositiveInteger = val => {
  if (isNaN(val)) return false;
  if (Math.round(val) !== val) return false;
  return val > 0;
};

export const isProperBound = (lower, higher, value) => {
  return lower < higher && !isNaN(value);
};

export const getBurstErrors = inputs => {
  const { idx, min, max, step } = inputs;
  const errors = {};

  for (let prop in inputs) {
    if (isNaN(inputs[prop])) errors[prop] = true;
  }

  if (!isPositiveInteger(idx)) errors.idx = true;
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

export const getBoundErrors = inputs => {
  const errors = {};
  const { left, right, top, bottom } = inputs;

  if (left >= right) errors['leftless'] = true;
  if (bottom >= top) errors['bottomless'] = true;
  if (isNaN(top)) errors['top'] = true;
  if (isNaN(bottom)) errors['bottom'] = true;
  if (isNaN(left)) errors['left'] = true;
  if (isNaN(right)) errors['right'] = true;

  return errors;
};
