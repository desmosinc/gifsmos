import greet, { greeting } from './dev-greeting';

describe('dev greeting', () => {
  it('logs a welcome message to the console', () => {
    greet();
    expect(console.log).toBeCalledWith(greeting);
  });
});
