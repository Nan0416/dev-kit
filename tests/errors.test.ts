import { UnauthenticatedError, HttpError } from '../src';

describe('errors', () => {
  test('NotImplementedError', () => {
    try {
      throw new UnauthenticatedError('Testing');
    } catch (error: any) {
      expect(error instanceof UnauthenticatedError).toBeTruthy();
      expect(error instanceof HttpError).toBeTruthy();
      expect((error as HttpError).statusCode).toEqual(403);
    }
  });
});
