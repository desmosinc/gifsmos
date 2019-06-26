let calculator;

function initializeCalculator(desmos, calcContainer, calcOptions) {
  calculator = desmos.GraphingCalculator(calcContainer.current, calcOptions);
  return calculator;
}

export { calculator, initializeCalculator };
