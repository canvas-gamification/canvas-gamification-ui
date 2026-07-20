import { tuiStringHashToHsl } from "@taiga-ui/core";
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'getColorFromString'
})
export class GetColorFromStringPipe implements PipeTransform {
    transform(value: string): string {
        return tuiStringHashToHsl(value)
    }
}
