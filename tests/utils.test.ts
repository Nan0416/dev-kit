import { isUltrasaErrorBody, ULTRASA_ERROR_TAG, HttpError, toUltrasaErrorBody } from '../src';

class InvalidRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'InvalidRequestError';
  }
}

describe('utils', () => {
  const MESSGAGE = 'mockMessage';

  test('isUltrasaErrorBody', () => {
    expect(
      isUltrasaErrorBody({
        [ULTRASA_ERROR_TAG]: true,
        name: 'MockError',
        message: MESSGAGE,
        some_extra: 'ignore extra',
      }),
    ).toBeTruthy();

    expect(
      isUltrasaErrorBody({
        [ULTRASA_ERROR_TAG]: false,
        name: 'MockError',
        message: MESSGAGE,
        some_extra: 'ignore extra',
      }),
    ).toBeFalsy();

    expect(
      isUltrasaErrorBody({
        [ULTRASA_ERROR_TAG]: true,
        message: MESSGAGE,
        some_extra: 'ignore extra',
      }),
    ).toBeFalsy();

    expect(isUltrasaErrorBody()).toBeFalsy();

    expect(isUltrasaErrorBody(null)).toBeFalsy();

    expect(isUltrasaErrorBody(undefined)).toBeFalsy();

    expect(isUltrasaErrorBody(true)).toBeFalsy();

    expect(isUltrasaErrorBody('Hello')).toBeFalsy();
  });

  test('toSparrowErrorBody', () => {
    expect(toUltrasaErrorBody(new InvalidRequestError(MESSGAGE))).toEqual({
      [ULTRASA_ERROR_TAG]: true,
      name: 'InvalidRequestError',
      message: MESSGAGE,
    });

    expect(toUltrasaErrorBody(new Error())).toEqual({
      [ULTRASA_ERROR_TAG]: true,
      name: 'Error',
      message: '',
    });

    expect(toUltrasaErrorBody(new Error(''))).toEqual({
      [ULTRASA_ERROR_TAG]: true,
      name: 'Error',
      message: '',
    });
  });
});
