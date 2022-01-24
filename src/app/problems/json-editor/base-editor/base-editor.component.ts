import {Component, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-base-editor',
    templateUrl: './base-editor.component.html',
    styleUrls: ['./base-editor.component.scss']
})
export class BaseEditorComponent {

    @Input() form!: FormGroup;
    @Input() title!: string;

    /**
     * Get form as a JSON string value
     */
    getFormString(): string {
        return JSON.stringify(this.form.getRawValue(), null, 2);
    }

    /**
     * Convert a string into a JSON value, then set the form values with that data
     * Will only set the value of one level of array control children.
     * @param value
     */
    setFormFromString(value: string): void {
        try {
            const jsonParsed = JSON.parse(value);
            if (this.form.value.type) jsonParsed['type'] = this.form.value.type;
            Object.entries(jsonParsed).forEach(([key, value]) => {
                const formControl = this.form.controls[key];
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
