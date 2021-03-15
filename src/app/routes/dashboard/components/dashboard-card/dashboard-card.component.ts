import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.less'],
  host: {
    '[class.dashboard-card]': 'true'
  }
})
export class DashboardCardComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() data: string;
  @Input() trend: number;
  @Input() raise: boolean;
  @Input() icon: string;
}
