import { Pipe, PipeTransform } from '@angular/core';
import { FuseUtils } from '@reusable-parts/@fuse/utils';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform
{
    transform(mainArr: any[], searchText: string, property: string): any
    {
        return FuseUtils.filterArrayByString(mainArr, searchText);
    }
}
