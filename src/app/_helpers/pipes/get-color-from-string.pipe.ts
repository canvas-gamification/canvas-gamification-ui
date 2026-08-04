
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'getColorFromString',
    standalone: false
})
export class GetColorFromStringPipe implements PipeTransform {
    transform(value: string): string {
        const hash = value.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)
        return `hsl(${hash % 360}, 60%, 70%)`
    }
}
