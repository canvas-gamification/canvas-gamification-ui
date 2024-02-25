import {FormControl, FormGroup, Validators} from "@angular/forms"
import {InputFiles, Question} from "@app/_models"
import {
    fieldExistsIfOtherExistsValidator
} from "@app/_helpers/forms/validators/field-exists-if-other-exists.validator"

export class ParsonsForm {
    /**
     * Creates a FormGroup for a Parsons question.
     */
    static createForm(course?: number, event?: number): FormGroup {
        return new FormGroup({
            title: new FormControl(null, [Validators.required]),
            difficulty: new FormControl(null, [Validators.required]),
            category: new FormControl(null, [Validators.required]),
            is_verified: new FormControl(false),
            course: new FormControl(course),
            event: new FormControl(event),
            text: new FormControl('', [Validators.required]),
            junit_template: new FormControl(null, [Validators.required]),
            input_files: new FormControl([], [Validators.required]),
            variation_types: new FormControl([]),
            variables: new FormControl([])
        }, [fieldExistsIfOtherExistsValidator('event', 'course')])
    }

    /**
     * Creates a FormGroup for a Parsons question with existing data.
     * @param question - The question object.
     */
    static createFormWithData(question: Question): FormGroup {
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
    variation_types: JSON,
    variables: JSON[],
    junit_template: string,
    input_files: InputFiles,
    is_verified: boolean,
}
