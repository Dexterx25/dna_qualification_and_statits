import * as LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class DayJsService {
  private dayjs: typeof dayjs;
  constructor() {
    this.dayjs = dayjs;
    dayjs.extend(LocalizedFormat);
  }

  dayJs(props?: any) {
    return this.dayjs(props);
  }
}
