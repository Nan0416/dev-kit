export const ULTRASA_ERROR_TAG = 'x-ultrasa-error';

export interface UltrasaErrorBody {
  readonly [ULTRASA_ERROR_TAG]: true;
  readonly name: string;
  readonly message: string;
}

export function isUltrasaErrorBody(body?: any): body is UltrasaErrorBody {
  if (typeof body === 'object' && body !== null) {
    const tag = body[ULTRASA_ERROR_TAG];
    return typeof tag === 'boolean' && tag && typeof body['name'] === 'string' && typeof body['message'] === 'string';
  }
  return false;
}

export function toUltrasaErrorBody(error: Error): UltrasaErrorBody {
  return {
    [ULTRASA_ERROR_TAG]: true,
    name: error.name,
    message: error.message,
  };
}
