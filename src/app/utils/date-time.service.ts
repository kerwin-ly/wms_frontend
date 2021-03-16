import { Injectable } from '@angular/core';
/**
 * 日期数据清除的类型
 * 用于date-time.service的DateClean方法
 * @argument Min 当天起始时间
 * @argument Max 当天结束时间
 */
export enum DateCleanType {
  Min,
  Max
}

@Injectable({ providedIn: 'root' })
export class DateTimeService {
  constructor() {}

  /**
   * 依据日期偏移量，生成需要的日期
   */
  getDay(dayOffset?: number): Date {
    dayOffset = !!dayOffset ? dayOffset : 0;

    const newDate = new Date();
    newDate.setDate(newDate.getDate() + dayOffset);
    return newDate;
  }

  /**
   * 日期清洗，支持两种type: min  max
   * min 移除当前日期的时分秒
   * max 将当前日期的时分秒都置为59
   */
  dateClean(date: Date, type: DateCleanType = DateCleanType.Min): string {
    switch (type) {
      case DateCleanType.Min:
        date.setHours(0, 0, 0, 0);
        break;
      case DateCleanType.Max:
        date.setHours(23, 59, 59, 999);
        break;
    }

    return this.dateToStr(date);
  }

  /**
   * 日期转换成标准字符串
   */
  dateToStr(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
      year +
      '-' +
      this.formatDateNum(month) +
      '-' +
      this.formatDateNum(days) +
      ' ' +
      this.formatDateNum(hours) +
      ':' +
      this.formatDateNum(minutes) +
      ':' +
      this.formatDateNum(seconds)
    );
  }

  /**
   * 日期月日时分数值是个位数时，补齐为两位数
   * @param num 日期月日时分
   */
  formatDateNum(num: number): string {
    if (num / 10 < 1) {
      return '0' + num;
    } else {
      return num.toString();
    }
  }

  /**
   * 格式化时间
   * @param fmt 格式
   * @param date 日期
   */
  dateFormat(fmt: string, date: Date) {
    let ret: RegExpExecArray;
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key of Object.keys(opt)) {
      ret = new RegExp('(' + key + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[key] : opt[key].padStart(ret[1].length, '0'));
      }
    }
    return fmt;
  }

  getDaysOfMonth(year: number, month: number): number {
    const d = new Date(year, month, 0);
    return d.getDate();
  }
}
