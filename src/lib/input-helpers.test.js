import {
  isPositiveInteger,
  getBurstErrors,
  getSettingsErrors
} from './input-helpers';

describe('input helpers', () => {
  xit('detects positive integers', () => {
    const testCases = [
      [0, false],
      [1, true],
      [-1, false],
      [NaN, false],
      [1.5, false],
      [-1.5, false]
    ];

    testCases.forEach(testCase => {
      const [value, result] = testCase;
      expect(isPositiveInteger(value)).toEqual(result);
    });
  });

  xit('detects burst input errors', () => {
    expect(getBurstErrors({ idx: -1, min: -10, max: 10, step: 1 })).toEqual({
      idx: true
    });
    expect(getBurstErrors({ idx: 1, min: 10, max: 10, step: 1 })).toEqual({
      min: true,
      max: true,
      step: true
    });
    expect(getBurstErrors({ idx: 1, min: -10, max: 10, step: 21 })).toEqual({
      step: true
    });
    expect(getBurstErrors({ idx: NaN, min: NaN, max: NaN, step: NaN })).toEqual(
      { idx: true, min: true, max: true, step: true }
    );
  });

  xit('detects settings errors', () => {
    expect(getSettingsErrors({ width: -30, height: 30, interval: 10 })).toEqual(
      { width: true }
    );
    expect(
      getSettingsErrors({ width: -30, height: -30, interval: 10 })
    ).toEqual({ width: true, height: true });
    expect(
      getSettingsErrors({ width: -30, height: -30, interval: -10 })
    ).toEqual({ width: true, height: true, interval: true });
  });
});
