import {Pipe, PipeTransform} from '@angular/core'
import {TuiContextWithImplicit, TuiStringHandler} from "@taiga-ui/cdk"

@Pipe({
    name: 'stringifyTuiDataList'
})
export class StringifyTuiDataListPipe implements PipeTransform {
    transform(items: Array<unknown>, key: string | number, value: string | number): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(items.map((item) => [item[key], item[value]] as [number, string]))
        return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || ''
    }
}
