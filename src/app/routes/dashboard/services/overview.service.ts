import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
import { IChartData } from '../models';
import { get } from 'lodash-es';
import { TranslateService } from '@ngx-translate/core';
import { ISafeAny } from '@models';


const PROGRESS_COLORS = ['#399DFA', '#52cca3', '#9580ff', '#7d8fb3', '#f2637b'];
const PLATFORM_COLORS = ['#399DFA', '#E7AF0D', '#CFDAE9'];
const PIE_COLORS = ['#399DFA', '#A1E6CE', '#52CCA3', '#7d8fb3'];

@Injectable()
export class DashboardOverviewService {
  constructor(
    public $http: HttpClient,
    private i18n: TranslateService
  ) { }

  liveData(): Observable<IChartData[]> {
    return timer(0, 5000)
      .pipe(
        switchMap(_ => this.$http.get('overview/live-data').pipe(
          map((res: ISafeAny) => {
            return res.items.map((item, idx) => {
              return {
                series: [{
                  data: [{
                    value: item.count.toFixed(2),
                    itemStyle: {
                      color: PROGRESS_COLORS[idx]
                    }
                  }],
                  barWidth: 10
                }],
                title: {
                  text: item.percent + '%',
                  textStyle: {
                    fontSize: 20,
                    fontWeight: 500
                  }
                },
                grid: {
                  top: 0,
                  bottom: 0
                },
                source: this.i18n.instant(item.source),
                total: item.count.toFixed(2)
              };
            });
          })
        ))
      );
  }

  hotForecast(): Observable<IChartData> {
    return timer(0, 5000)
      .pipe(
        switchMap(_ => this.$http.get('analysis/system-data').pipe(
          map((res: IChartData) => {
            return {
              ...res,
              types: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
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
              legend: {
                show: false
              },
              grid: {
                top: 10,
                bottom: 30,
                right: 30
              }
            };
          })
        ))
      );
  }

  getUserBrowser(): Observable<IChartData> {
    return this.$http.get('overview/user-browser').pipe(
      map((res: IChartData) => {
        return {
          ...res,
          series: res.series.map(item => {
            return {
              name: '浏览器份额',
              barWidth: 20,
              itemStyle: {
                barBorderRadius: 3
              },
              label: {
                show: true,
                formatter: '{b}-{c}%'
              },
              ...item
            };
          }),
          grid: {
            top: 10,
            bottom: 0,
            right: 0
          },
          legend: {
            show: false
          }
        };
      })
    );
  }

  getPlatformRevenue(): Observable<IChartData> {
    return this.$http.get('overview/platform-revenue').pipe(
      map((res: IChartData) => {
        return {
          ...res,
          series: res.series.map((item, idx) => {
            return {
              stack: '100%',
              itemStyle: {
                color: PLATFORM_COLORS[idx]
              },
              label: {
                show: true,
                formatter: '{c}%'
              },
              ...item
            };
          }),
          grid: {
            top: 10,
            bottom: 20,
            right: 0
          }
        };
      })
    );
  }

  getUserGender(): Observable<IChartData> {
    return this.$http.get('overview/user-gender').pipe(
      map((res: ISafeAny) => {
        return {
          series: [
            {
              radius: '80%',
              label: {
                color: 'rgba(0, 0, 0, 0.45)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(0, 0, 0, 0.45)'
                }
              },
              data: res.items.map((item, idx) => {
                return {
                  ...item,
                  itemStyle: { color: PIE_COLORS[idx] }
                };
              })
            }
          ]
        };
      })
    );
  }

  getSalesRank(): Observable<IChartData> {
    return this.$http.get('overview/sales-rank').pipe(
      map((res: ISafeAny) => {
        return {
          title: {
            text: get(res, 'series[0].data', 0),
            itemGap: 5,
            textStyle: {
              color: '#333',
              fontSize: 34,
              fontWeight: 500
            },
            subtext: get(res, 'series[0].name', '-'),
            subtextStyle: {
              fontSize: 14,
              color: '#595959'
            }
          },
          legend: {
            orient: 'vertical',
            right: 'right',
            bottom: 'middle'
          },
          series: res.series.map((item) => {
            return {
              data: [{
                name: item.name,
                value: item.data
              }],
              name: item.name,
              barWidth: 15,
              barGap: '50%'
            };
          })
        };
      })
    );
  }
}
