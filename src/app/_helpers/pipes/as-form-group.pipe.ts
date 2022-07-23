import {Pipe, PipeTransform} from '@angular/core'
import {AbstractControl, FormGroup} from "@angular/forms"

/**
 * Given an AbstractControl object, return
 * the value as a FormGroup object
 */
@Pipe({
    name: 'asFormGroup'
})
export class AsFormGroupPipe implements PipeTransform {
    transform(value: AbstractControl): FormGroup {
        return value as FormGroup
    }
}
