import {Pipe, PipeTransform} from '@angular/core';
import {TuiStatus} from "@taiga-ui/kit";

@Pipe({
    name: 'tuiStatus'
})
export class TuiStatusPipe implements PipeTransform {
    transform(status: string): TuiStatus {
        if (status === 'Solved' || status === 'Correct') return TuiStatus.Success;
        else if (status === 'Partially Solved') return TuiStatus.Warning;
        else if (status === 'Wrong') return TuiStatus.Error;
        else return TuiStatus.Default;
    }
}
