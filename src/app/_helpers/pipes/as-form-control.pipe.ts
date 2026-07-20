import {Pipe, PipeTransform} from '@angular/core'
import {AbstractControl, UntypedFormControl} from "@angular/forms"

/**
 * Given an AbstractControl object, return
 * the value as a FormControl object
 */
@Pipe({
    name: 'asFormControl'
})
export class AsFormControlPipe implements PipeTransform {
    transform(value: AbstractControl): UntypedFormControl {
        return value as UntypedFormControl
    }
}
