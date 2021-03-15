import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DashboardOverviewService } from '@routes/dashboard/services';
import { BixiChartProgressComponent } from '@bixi/chart/progress';
import { IChartData } from '@routes/dashboard/models';
import { get } from 'lodash-es';
import { Subscription } from 'rxjs';
import { ISafeAny } from '@models';
import { endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';
import { AutoUnsubscribe } from '@bixi/core/utils';

@AutoUnsubscribe('subscription')
@Component({
  selector: 'dashboard-overview-page',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('progressChart', { static: true }) progressChart: BixiChartProgressComponent;
  subscription: Subscription = new Subscription();
  liveData = [{}, {}, {}, {}];
  userBrowser: IChartData;
  platformRevenue: IChartData;
  userGender: IChartData;
  salesRank: IChartData;
  hotForecast: IChartData;

  progressGrid = {
    left: 0,
    top: 0,
    bottom: 0
  };

  horizontalBarGrid = {
    top: 0,
    bottom: 0
  };

  ranges = {
    [this.i18n.instant('monitor.today')]: [new Date(), new Date()],
    [this.i18n.instant('monitor.all_week')]: [startOfWeek(new Date()), endOfWeek(new Date())],
    [this.i18n.instant('monitor.all_month')]: [new Date(), endOfMonth(new Date())],
    [this.i18n.instant('monitor.all_year')]: [startOfYear(new Date()), endOfYear(new Date())]
  };

  dates = [startOfWeek(new Date()), endOfWeek(new Date())];

  constructor(
    private overviewService: DashboardOverviewService,
    private i18n: TranslateService
  ) {
    this.subscription.add(
      this.overviewService.liveData().subscribe(res => {
        this.liveData = res;
      })
    );

    this.subscription.add(
      this.overviewService.getUserBrowser().subscribe(res => {
        this.userBrowser = res;
      })
    );

    this.subscription.add(
      this.overviewService.getPlatformRevenue().subscribe(res => {
        this.platformRevenue = res;
      })
    );

    this.subscription.add(
      this.overviewService.getUserGender().subscribe(res => {
        this.userGender = res;
      })
    );

    this.subscription.add(
      this.overviewService.getSalesRank().subscribe(res => {
        this.salesRank = res;
      })
    );

    this.subscription.add(
      this.overviewService.hotForecast().subscribe(res => {
        this.hotForecast = res;
      })
    );
  }

  trackByValue(idx, item) {
    return item.value;
  }

  onProgressHoverIn = (params: ISafeAny) => {
    this.salesRank.title = {
      ...this.salesRank.title,
      text: get(params, 'data.value', 0),
      subtext: params.name
    };
  }

  ngAfterViewInit() {
    if (this.progressChart) {
      this.progressChart.getInstance().on('mouseover', this.onProgressHoverIn);
    }
  }

  ngOnDestroy() {
    if (this.progressChart) {
      this.progressChart.getInstance().off('mouseover', this.onProgressHoverIn);
    }
  }
}
