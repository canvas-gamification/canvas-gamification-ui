import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import {InputFiles, Question} from "@app/_models"
import {
    fieldExistsIfOtherExistsValidator
} from "@app/_helpers/forms/validators/field-exists-if-other-exists.validator"

export class ParsonsForm {
    /**
     * Creates a FormGroup for a Parsons question.
     */
    static createForm(course?: number, event?: number): UntypedFormGroup {
        return new UntypedFormGroup({
            title: new UntypedFormControl(null, [Validators.required]),
            difficulty: new UntypedFormControl(null, [Validators.required]),
            category: new UntypedFormControl(null, [Validators.required]),
            is_verified: new UntypedFormControl(false),
            course: new UntypedFormControl(course),
            event: new UntypedFormControl(event),
            text: new UntypedFormControl('', [Validators.required]),
            junit_template: new UntypedFormControl(null, [Validators.required]),
            input_files: new UntypedFormControl([], [Validators.required]),
            variation_types: new UntypedFormControl(['No Variations']),
            variables: new UntypedFormControl([])
        }, [fieldExistsIfOtherExistsValidator('event', 'course')])
    }

    /**
     * Creates a FormGroup for a Parsons question with existing data.
     * @param question - The question object.
     */
    static createFormWithData(question: Question): UntypedFormGroup {
        const newForm = this.createForm()
        newForm.patchValue({
            ...question,
            course: question.event_obj?.course
        })
        return newForm
    }
}

export interface ParsonsFormData {
    title: string,
    difficulty: string,
    course: number,
    event: number,
    text: string,
    category: number,
    variation_types: string[],
    variables: JSON[],
    junit_template: string,
    input_files: InputFiles,
    is_verified: boolean,
}
