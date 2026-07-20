import {Pipe, PipeTransform} from '@angular/core'
import { TuiStringHandler, TuiContext } from "@taiga-ui/cdk"

@Pipe({
    name: 'stringifyTuiDataList',
    standalone: false
})
export class StringifyTuiDataListPipe implements PipeTransform {
    transform(items: Array<unknown>, key: string | number, value: string | number): TuiStringHandler<TuiContext<number>> {
        const map = new Map(items.map((item) => [item[key], item[value]] as [number, string]))
        return ({$implicit}: TuiContext<number>) => map.get($implicit) || ''
    }
}
