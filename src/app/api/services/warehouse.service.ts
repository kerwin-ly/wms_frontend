/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonResponse } from '../strict-http-response';
import { ApiBaseService } from '../base-service';

import { ResGetApiWarehouseInList, WarehouseInPostParams, WarehouseOutPostParams, ResGetWarehouseOutList, ResGetWarehouseList, ResGetWarehouseBatch, ResGetWarehouseHistory } from '../models/warehouse';
@Injectable({
  providedIn: 'root',
})
export class WarehouseService extends ApiBaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  /**
   * 入库列表
   * @param params The `WarehouseService.GetApiWarehouseInListParams` containing the following parameters:
   *
   * - `word`: 类目名
   *
   * - `start_date`: 开始时间
   *
   * - `page_size`: 每页行数
   *
   * - `page_index`: 第几页
   *
   * - `in_type`: 入库类型。0:采购入库，1:盘盈入库，2:赠送入库
   *
   * - `end_date`: 结束时间
   *
   * @return successful operation
   */
  getApiWarehouseInList(params: WarehouseService.GetApiWarehouseInListParams): Observable<ICommonResponse<ResGetApiWarehouseInList>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseInList>>(`api/warehouse/in/list`, { params: this.getHttpParams(params) })
  }

  /**
   * 入库
   * @param params undefined
   * @return successful operation
   */
  postWarehouseIn(params?: WarehouseInPostParams): Observable<ICommonResponse<null>> {
    return this.http.post<ICommonResponse<null>>(`warehouse/in`, params)
  }

  /**
   * 出库
   * @param params undefined
   * @return successful operation
   */
  postWarehouseOut(params?: WarehouseOutPostParams): Observable<ICommonResponse<null>> {
    return this.http.post<ICommonResponse<null>>(`warehouse/out`, params)
  }

  /**
   * 出库列表
   * @param params The `WarehouseService.GetWarehouseOutListParams` containing the following parameters:
   *
   * - `word`: 类目名称
   *
   * - `start_date`:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `end_date`:
   *
   * @return successful operation
   */
  getWarehouseOutList(params: WarehouseService.GetWarehouseOutListParams): Observable<ICommonResponse<ResGetWarehouseOutList>> {
    return this.http.get<ICommonResponse<ResGetWarehouseOutList>>(`warehouse/out/list`, { params: this.getHttpParams(params) })
  }

  /**
   * 库存表
   * @param params The `WarehouseService.GetWarehouseListParams` containing the following parameters:
   *
   * - `word`: 类目名
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * @return successful operation
   */
  getWarehouseList(params: WarehouseService.GetWarehouseListParams): Observable<ICommonResponse<ResGetWarehouseList>> {
    return this.http.get<ICommonResponse<ResGetWarehouseList>>(`warehouse/list`, { params: this.getHttpParams(params) })
  }

  /**
   * 库存批次详情
   * @param goods_id 类目id
   * @return successful operation
   */
  getWarehouseBatch(goods_id: string): Observable<ICommonResponse<ResGetWarehouseBatch>> {
    return this.http.get<ICommonResponse<ResGetWarehouseBatch>>(`warehouse/batch`, { params: { goods_id } })
  }

  /**
   * 明细表
   * @param params The `WarehouseService.GetWarehouseHistoryParams` containing the following parameters:
   *
   * - `word`: 类目名称
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * @return successful operation
   */
  getWarehouseHistory(params: WarehouseService.GetWarehouseHistoryParams): Observable<ICommonResponse<ResGetWarehouseHistory>> {
    return this.http.get<ICommonResponse<ResGetWarehouseHistory>>(`warehouse/history`, { params: this.getHttpParams(params) })
  }
}

export module WarehouseService {

  /**
   * Parameters for getApiWarehouseInList
   */
  export interface GetApiWarehouseInListParams {

    /**
     * 类目名
     */
    word: string;

    /**
     * 开始时间
     */
    start_date: string;

    /**
     * 每页行数
     */
    page_size: string;

    /**
     * 第几页
     */
    page_index: string;

    /**
     * 入库类型。0:采购入库，1:盘盈入库，2:赠送入库
     */
    in_type: string;

    /**
     * 结束时间
     */
    end_date: string;
  }

  /**
   * Parameters for getWarehouseOutList
   */
  export interface GetWarehouseOutListParams {

    /**
     * 类目名称
     */
    word: string;
    start_date: string;
    page_size: string;
    page_index: string;
    end_date: string;
  }

  /**
   * Parameters for getWarehouseList
   */
  export interface GetWarehouseListParams {

    /**
     * 类目名
     */
    word: string;
    page_size: string;
    page_index: string;
  }

  /**
   * Parameters for getWarehouseHistory
   */
  export interface GetWarehouseHistoryParams {

    /**
     * 类目名称
     */
    word: string;
    page_size: string;
    page_index: string;
  }
}
