import { TuiStatus } from "@taiga-ui/kit";
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'tuiStatus'
})
export class TuiStatusPipe implements PipeTransform {
    transform(status: string): TuiStatus {
        if (status === 'Solved' || status === 'Correct') return 'success'
        else if (status === 'Partially Correct') return 'warning'
        else if (status === 'Incorrect') return 'error'
        else if (status === 'Pending') return 'info'
        else return 'default'
    }
}
