import { Component, Input, OnInit } from '@angular/core';
import { SpinService } from '@utils';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.less']
})
export class SpinComponent implements OnInit {
  isSpin = false;
  @Input()
  size = 45;

  constructor(private spinService: SpinService) {}

  ngOnInit() {
    // 防止页面初始化时，重复修改数据报错
    this.spinService.subscribe((bol) =>
      setTimeout(() => {
        this.isSpin = bol;
      }, 0)
    );
  }
}
