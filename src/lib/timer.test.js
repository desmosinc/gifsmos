import { startTimer, clearTimer } from './timer';

const fn = jest.fn();

describe('timer', () => {
  xit('calls a function at a given interval', () => {
    startTimer(fn);
    expect(fn).toBeCalled();
  });
});
