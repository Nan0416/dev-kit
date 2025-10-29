export type ErrorConstructor = new (message: string) => Error;

/**
 * Limitation, we don't support cause (re-throwable) case.
 * It's feature supported in ES2022. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
 */
export class SystemError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SystemError';
  }
}

export class IllegalStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IllegalStateError';
  }
}

export class IllegalArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IllegalArgumentError';
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export abstract class HttpError extends Error {
  readonly statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UnauthenticatedError extends HttpError {
  constructor(message: string) {
    super(message, 403);
    this.name = 'UnauthenticatedError';
  }
}

export class EndpointNotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 403);
    this.name = 'EndpointNotFoundError';
  }
}
