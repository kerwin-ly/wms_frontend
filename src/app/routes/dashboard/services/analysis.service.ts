import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';
import { IList, ISafeAny } from '@models';
import { ICard, IChartData } from '../models';
import { TranslateService } from '@ngx-translate/core';

const CHART_BLUES = ['#0043A1', '#045CC7', '#107CEE', '#399DFA', '#D4E7FC'];
const ICONS = ['icons/monitor:list', 'icons/monitor:screen', 'icons/monitor:pin', 'icons/monitor:category'];

const toThousands = (num: number) => {
  const result = [];
  let counter = 0;
  const numArr = (num || 0).toString().split('');
  for (let i = numArr.length - 1; i >= 0; i--) {
    counter++;
    result.unshift(numArr[i]);
    if (!(counter % 3) && i !== 0) result.unshift(',');
  }
  return result.join('');
};

@Injectable()
export class DashboardAnalysisService {
  constructor(
    public $http: HttpClient,
    private i18n: TranslateService
  ) { }

  // 分析页面 api
  cardData() {
    return timer(0, 10000).pipe(
      switchMap(_ => this.$http.get<IList<ICard>>('analysis/card').pipe(
        map((res) => {
          return [...res.items.map((item, idx) => {
            return {
              ...item,
              icon: ICONS[idx],
              data: toThousands(Number(item.data))
            };
          })];
        })
      ))
    );
  }

  analysisTrend(): Observable<IChartData> {
    return timer(0, 10000)
      .pipe(
        switchMap(_ => this.$http.get('analysis/mark-trend').pipe(
          map((res: IChartData) => {
            return {
              ...res,
              types: ['南京', '成都', '天津', '重庆', '苏州', '杭州', '深圳', '广州', '北京', '上海'],
              series: res.series.map((item) => {
                return {
                  ...item,
                  lineStyle: {
                    width: 3
                  }
                };
              }),
              grid: {
                top: 10,
                left: 60,
                right: 40
              }
            };
          })
        ))
      );
  }

  analysisUserPie() {
    return timer(0, 10000)
      .pipe(
        switchMap(_ => this.$http.get('analysis/user-pie').pipe(
          map((res: ISafeAny) => {
            return {
              title: {
                text: res.items.reduce((sum, data) => {
                  return (sum.value ? sum.value : sum) + data.value;
                }),
                itemGap: 3,
                textStyle: {
                  color: '#333',
                  fontSize: 32,
                  fontWeight: 500
                },
                subtextStyle: {
                  color: '#595959',
                  fontWeight: 400
                },
                textAlign: 'center',
                textVerticalAlign: 'top',
                subtext: this.i18n.instant('monitor.total_consume'),
                left: '30%',
                bottom: 'middle'
              },
              series: [{
                center: ['30%', '50%'],
                radius: ['40%', '60%'],
                label: { show: false },
                labelLine: {
                  color: 'rgba(0, 0, 0, 0.45)'
                },
                data: res.items
              }]
            };
          })
        ))
      );
  }

  analysisSystemLine(): Observable<IChartData> {
    return timer(0, 10000)
      .pipe(
        switchMap(_ => this.$http.get('analysis/system-data').pipe(
          map((res: IChartData) => {
            return {
              ...res,
              types: ['10/25', '10/26', '10/27', '10/28', '10/29', '10/30', '10/31', '11/01', '11/02', '11/03'],
              series: res.series.map((item) => {
                return {
                  ...item,
                  areaStyle: {
                    shadowColor: 'rgba(57, 157, 250, 0.08)',
                    shadowBlur: 10,
                    shadowOffsetY: 10,
                    shadowOffsetX: 10,
                    opacity: 0.1
                  },
                  lineStyle: {
                    width: 3,
                    shadowColor: 'rgba(57, 157, 250, 0.1)',
                    shadowBlur: 12,
                    shadowOffsetY: 6
                  }
                };
              }),
              grid: {
                top: 10,
                left: 60,
                right: 40,
                bottom: 10
              }
            };
          })
        ))
      );
  }

  analysisProduct(): Observable<IChartData> {
    return timer(0, 10000)
      .pipe(
        switchMap(_ => this.$http.get('analysis/product-category').pipe(
          map((res: IChartData) => {
            return {
              ...res,
              types: ['安徽', '湖北', '湖南', '江西', '河南', '江苏', '浙江', '福建', '广东', '广西'],
              series: res.series.map((item, idx) => {
                const len = res.series.length || 0;
                let radius: number | number[] = 0;
                if (idx === 0) radius = [0, 0, 3, 3];
                if (idx === len - 1) radius = [3, 3, 0, 0];
                return {
                  ...item,
                  stack: '总量',
                  itemStyle: {
                    color: CHART_BLUES[idx],
                    barBorderRadius: radius
                  }
                };
              }),
              grid: {
                top: 10,
                left: 60,
                right: 40
              }
            };
          })
        ))
      );
  }

  analysisCompare(): Observable<IChartData> {
    return timer(0, 10000)
      .pipe(
        switchMap(_ => this.$http.get('analysis/product-compare').pipe(
          map((res: IChartData) => {
            return {
              ...res,
              types: ['家电', '手机', '家居', '电脑', '耳机', '棉袄', '化妆品', '书本'],
              series: res.series.map((item) => {
                return {
                  ...item,
                  itemStyle: {
                    barBorderRadius: 3
                  }
                };
              }),
              grid: {
                top: 10,
                left: 60,
                right: 20
              }
            };
          })
        ))
      );
  }
}
