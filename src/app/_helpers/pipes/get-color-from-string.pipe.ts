import {Pipe, PipeTransform} from '@angular/core'
import {tuiStringHashToHsl} from "@taiga-ui/kit"

@Pipe({
    name: 'getColorFromString'
})
export class GetColorFromStringPipe implements PipeTransform {
    transform(value: string): string {
        return tuiStringHashToHsl(value)
    }
}
