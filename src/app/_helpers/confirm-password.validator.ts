import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password: AbstractControl = control.get('password');
    const password2: AbstractControl = control.get('password2');
    if (password.value !== password2.value) {
        password2.setErrors({confirmedValidator: true});
        return {confirmedValidator: true};
    }
    return null;
};
