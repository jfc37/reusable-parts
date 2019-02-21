import { Pipe, PipeTransform } from '@angular/core';
import { FuseUtils } from '../utils';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   *  {any[]} mainArr
   *  {string} searchText
   *  {string} property
   *  {any}
   */
  transform(mainArr: any[], searchText: string): any {
    return FuseUtils.filterArrayByString(mainArr, searchText);
  }
}
