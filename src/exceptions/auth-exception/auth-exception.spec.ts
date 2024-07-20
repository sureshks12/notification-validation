import { AuthException } from './auth-exception';

describe('AuthException', () => {
  it('should be defined', () => {
    expect(new AuthException()).toBeDefined();
  });
});
