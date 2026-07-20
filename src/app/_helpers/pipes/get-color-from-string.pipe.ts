import { tuiStringHashToHsl } from "@taiga-ui/core";
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'getColorFromString',
    standalone: false
})
export class GetColorFromStringPipe implements PipeTransform {
    transform(value: string): string {
        return tuiStringHashToHsl(value)
    }
}
