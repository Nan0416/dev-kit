import { ErrorConstructor } from './errors';

export interface Query {
  readonly [key: string]: string;
}

export interface Headers {
  readonly [key: string]: string;
}

interface BaseHttpRequest {
  readonly url: string;
  readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  readonly query?: Query;
  readonly headers?: Headers;
  readonly signal?: AbortSignal;
  /**
   * If signal if given, the timeout won't be applied. The actual timeout will depends on the environment.
   *
   * Firefox default timeout: 90 seconds
   * Chromium default timeout: 300 seconds
   * Node.js: no timeout.
   */
  readonly timeout?: number;
  readonly baseUrl?: string;
}

export interface HttpGetRequest extends BaseHttpRequest {
  readonly method: 'GET';
}

export interface HttpPostRequest<Body> extends BaseHttpRequest {
  readonly method: 'POST';
  readonly body?: Body;
}

export interface HttpPutRequest<Body> extends BaseHttpRequest {
  readonly method: 'PUT';
  readonly body?: Body;
}

export interface HttpPatchRequest<Body> extends BaseHttpRequest {
  readonly method: 'PATCH';
  readonly body?: Body;
}

export interface HttpDeleteRequest extends BaseHttpRequest {
  readonly method: 'DELETE';
}

export type HttpRequest = HttpGetRequest | HttpPostRequest<any> | HttpPutRequest<any> | HttpPatchRequest<Body> | HttpDeleteRequest;

export interface HttpResponse<T> {
  readonly body: T;
}

export interface HttpErrorHandlerConfiguration {
  readonly type: 'http-error-handler';
  // set to null to remove the handler.
  readonly handler: ((status: number, body: any) => void) | null;
}

export interface ErrorConstructorConfiguration {
  readonly type: 'error-constructor';
  readonly errorNameToConstructor: ReadonlyMap<string, ErrorConstructor> | null;
  readonly serviceErrorConstructor: ErrorConstructor | null;
}

export type Configuration = HttpErrorHandlerConfiguration | ErrorConstructorConfiguration;

export interface HttpClient {
  configure(config: Configuration): void;
  send<T>(request: HttpRequest): Promise<HttpResponse<T>>;
}
