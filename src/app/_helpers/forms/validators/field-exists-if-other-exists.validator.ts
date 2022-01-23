import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

/**
 * Only allow the form to validate if the other parameter has a value in the form
 * @param field
 * @param other
 */
export const fieldExistsIfOtherExistsValidator = (field: string, other: string): ValidatorFn => {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const otherControl: AbstractControl = formGroup.get(other);
        const fieldControl: AbstractControl = formGroup.get(field);
        if (otherControl.value && !fieldControl.value) {
            return {confirmedExists: true};
        }
        return null;
    };
};
