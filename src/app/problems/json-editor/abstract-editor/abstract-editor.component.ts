import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {
    AbstractControl,
    ControlValueAccessor,
    FormArray,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validator,
    Validators
} from "@angular/forms";

@Component({
    selector: 'app-abstract-editor',
    template: '',
})
export class AbstractEditorComponent implements ControlValueAccessor, Validator, OnDestroy {

    models = new FormArray([]);
    onTouched = (): void => {
        return;
    };
    onChangeSubs: Subscription[] = [];

    /**
     * Functions required to treat this component as a form control
     */
    ngOnDestroy(): void {
        this.onChangeSubs.forEach(sub => sub.unsubscribe());
    }

    registerOnChange(onChange: never): void {
        const sub = this.models.valueChanges.subscribe(onChange);
        this.onChangeSubs.push(sub);
    }

    registerOnTouched(onTouched: () => unknown): void {
        this.onTouched = onTouched;
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.models.disable() : this.models.enable();
    }

    writeValue(value: Array<unknown>): void {
        this.models.clear();
        value.forEach((value, index) => {
            this.addNewModel(value['type']);
            this.setFormFromString(this.models.at(index), JSON.stringify(value));
        });
    }

    validate(): ValidationErrors | null {
        const errors = {};
        this.models.controls.forEach((control, index) => {
            if (control.invalid) {
                errors[`value${index}`] = control.errors;
            }
        });
        return errors ? errors : null;
    }

    /**
     * Functions to manage models.
     * addNewModel must be overwritten within the parent class.
     */
    addNewModel(type?: string): void {
        throw SyntaxError(`addNewModel ${type ? `with type ${type}` : ''} must be overwritten within its parent class`);
    }

    removeModel(index: number): void {
        this.models.removeAt(index);
    }

    /**
     * Get form as a JSON string value
     */
    getFormString(form: AbstractControl): string {
        return JSON.stringify((form as FormGroup).getRawValue(), null, 2);
    }

    /**
     * Convert a string into a JSON value, then set the form values with that data
     * Will only set the value of one level of array control children.
     * @param form
     * @param value
     */
    setFormFromString(form: AbstractControl, value: string): void {
        try {
            const jsonParsed = JSON.parse(value);
            if (form.value.type) jsonParsed['type'] = form.value.type;
            Object.entries(jsonParsed).forEach(([key, value]) => {
                const formControl = (form as FormGroup).controls[key];
                if (formControl) {
                    if (formControl instanceof FormArray) {
                        if (!(value instanceof Array)) throw SyntaxError;
                        const formArray = formControl as FormArray;
                        formArray.clear();
                        value.forEach(value1 => {
                            formArray.push(new FormControl(value1, [Validators.required]));
                        });
                    } else {
                        formControl.setValue(value);
                    }
                }
            });
        } catch (SyntaxError) {
            return;
        }
    }
}
