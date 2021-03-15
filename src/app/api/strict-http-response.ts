/**
 * Constrains the http to not expand the response type with `| null`
 */
export interface ICommonResponse<T> {
  code: number;
  msg: string;
  data?: T;
}
