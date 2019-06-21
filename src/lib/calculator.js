let calculator;

function initializeCalculator(desmos, calcContainer, calcOptions) {
  calculator = desmos.GraphingCalculator(calcContainer.current, calcOptions);
  window.calculator = calculator;
  return calculator;
}

export { calculator, initializeCalculator };
