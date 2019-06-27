import greet, { greeting } from './dev-greeting';

describe('dev greeting', () => {
  xit('logs a welcome message to the console', () => {
    greet();
    expect(console.log).toBeCalledWith(greeting);
  });
});
