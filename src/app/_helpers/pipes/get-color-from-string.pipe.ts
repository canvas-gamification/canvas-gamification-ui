import {Pipe, PipeTransform} from '@angular/core';
import {stringHashToHsl} from "@taiga-ui/kit";

@Pipe({
    name: 'getColorFromString'
})
export class GetColorFromStringPipe implements PipeTransform {
    transform(value: string): string {
        return stringHashToHsl(value);
    }
}
