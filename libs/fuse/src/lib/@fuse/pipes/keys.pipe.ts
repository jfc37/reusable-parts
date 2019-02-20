import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  /**
   * Transform
   *
   *  value
   *  {string[]} args
   *  {any}
   */
  transform(value: any, args: string[]): any {
    const keys: any[] = [];

    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push({
          key: key,
          value: value[key],
        });
      }
    }

    return keys;
  }
}
