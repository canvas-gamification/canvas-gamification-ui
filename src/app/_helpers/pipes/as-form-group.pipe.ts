import {Pipe, PipeTransform} from '@angular/core'
import {AbstractControl, UntypedFormGroup} from "@angular/forms"

/**
 * Given an AbstractControl object, return
 * the value as a FormGroup object
 */
@Pipe({
    name: 'asFormGroup',
    standalone: false
})
export class AsFormGroupPipe implements PipeTransform {
    transform(value: AbstractControl): UntypedFormGroup {
        return value as UntypedFormGroup
    }
}
