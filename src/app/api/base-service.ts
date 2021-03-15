/* tslint:disable */
import { HttpClient, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

/**
 * Custom parameter codec to correctly handle the plus sign in parameter
 * values. See https://github.com/angular/angular/issues/18261
 */
class ParameterCodec implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
const PARAMETER_CODEC = new ParameterCodec();

/**
 * Base class for API services
 */
export class ApiBaseService {
  constructor(
    protected http: HttpClient
  ) {
    this.http = http;
  }

  /**
   * Creates a new `HttpParams` with the correct codec
   */
  protected getHttpParams(params): HttpParams {
    let httpParams = new HttpParams({
      encoder: PARAMETER_CODEC
    });
    for (const key in params) {
      httpParams = httpParams.set(key, params[key]);
    }
    return httpParams;
  }

  /**
   * convert object to formdata
   */
  protected getFormData(params: object): FormData {
    const formData = new FormData();
    for (const key in params) {
      formData.append(key, params[key])
    }
    return formData;
  }
}
