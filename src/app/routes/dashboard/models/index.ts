import { ISafeAny } from '@models';
import { EChartOption } from 'echarts';

interface ICard {
  title?: string;
  subTitle?: string;
  data?: number | string;
  trend?: number;
  raise?: boolean;
}

interface IMarkTrend {
  trendTypes: string[];
  trendSeries: string[];
}

interface IChartSeries {
  name?: string;
  data: number[];
}

interface IChartData {
  types?: string[];
  title?: ISafeAny;
  series: IChartSeries[];
  legend?: EChartOption.Legend;
  [key: string]: ISafeAny;
}


export {
  ICard,
  IMarkTrend,
  IChartData
};
