import { Component, OnDestroy } from '@angular/core';
import { DashboardAnalysisService } from '@routes/dashboard/services';
import { ICard, IChartData } from '../../models';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from '@bixi/core/utils';

const DEFAULT_CARDS: ICard[] = [{}, {}, {}, {}];

@AutoUnsubscribe('subscription')
@Component({
  selector: 'dashboard-data-page',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.less']
})
export class DataAnalysisPageComponent {
  cards: ICard[] = DEFAULT_CARDS;
  markTrendData: IChartData;
  systemData: IChartData;
  userPieData: IChartData;
  productData: IChartData;
  compareData: IChartData;

  subscription: Subscription = new Subscription();
  constructor(private analysisService: DashboardAnalysisService) {
    this.subscription.add(
      this.analysisService.cardData().subscribe((res: ICard[]) => {
        this.cards = res;
      })
    );

    this.subscription.add(
      this.analysisService.analysisTrend().subscribe((res) => {
        this.markTrendData = res;
      })
    );

    this.subscription.add(
      this.analysisService.analysisUserPie().subscribe(res => {
        this.userPieData = res;
      })
    );

    this.subscription.add(
      this.analysisService.analysisSystemLine().subscribe(res => {
        this.systemData = res;
      })
    );

    this.subscription.add(
      this.analysisService.analysisProduct().subscribe(res => {
        this.productData = res;
      })
    );

    this.subscription.add(
      this.analysisService.analysisCompare().subscribe(res => {
        this.compareData = res;
      })
    );
  }
}
