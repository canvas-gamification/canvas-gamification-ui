import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms"
import {Question} from "@app/_models"
import {
    fieldExistsIfOtherExistsValidator
} from "@app/_helpers/forms/validators/field-exists-if-other-exists.validator"

export class McqForm {
    /**
     * Creates a FormGroup for a MCQ question.
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
            answer: new FormArray([], [Validators.required, Validators.minLength(1)]),
            visible_distractor_count: new FormControl(null, [Validators.required]),
            choices: new FormArray([], [Validators.required, Validators.minLength(1)]),
            variables: new FormControl([])
        }, [fieldExistsIfOtherExistsValidator('event', 'course')])
    }

    /**
     * Creates a FormGroup for a MCQ question with existing data.
     * @param question - The question object.
     */
    static createFormWithData(question: Question): FormGroup {
        const newForm = this.createForm()
        const [answers, distractors] = this.getFormAnswersAndDistractors(question)
        newForm.patchValue({
            ...question,
            course: question.event_obj?.course,
            answer: [],
            choices: []
        })
        answers.forEach((answer) => (
            newForm.controls.answer as FormArray
        ).push(
            new FormControl(answer, [Validators.required])
        ))
        distractors.forEach((distractor) => (
            newForm.controls.choices as FormArray
        ).push(
            new FormControl(distractor, [Validators.required])
        ))
        return newForm
    }

    static createChoiceControl(): FormControl {
        return new FormControl('', [Validators.required])
    }

    static submissionData(form: FormGroup): McqFormData {
        const data = form.getRawValue()
        const [answer, choices] = this.getQuestionAnswerAndChoices(data.answer, data.choices)
        return {
            ...data,
            answer: answer,
            choices: choices
        }
    }

    static getFormAnswersAndDistractors(question: Question): [string[], string[]] {
        let answers = question.answer.split(',')
        answers = answers.map(answer => {
            if (question.choices[answer]) {
                const answerValue = Object.entries(question.choices).find(
                    entry => entry[0] === answer
                )[1]
                delete question.choices[answer]
                return answerValue
            }
        })
        return [answers, Object.values(question.choices)]
    }

    static getQuestionAnswerAndChoices(
        answers: string[],
        distractors: string[]
    ): [string, { [id: string]: string }] {
        const choices = {}
        const answerChar = [];
        [...answers, ...distractors].forEach((value, index) => {
            const char = String.fromCharCode('a'.charCodeAt(0) + index)
            choices[char] = value
            if (index < answers.length) answerChar.push(char)
        })
        return [answerChar.toString(), choices]
    }
}

export interface McqFormData {
    title: string,
    difficulty: string,
    course: number,
    event: number,
    text: string,
    answer: string,
    category: number,
    variables: JSON[],
    visible_distractor_count: number,
    is_verified: boolean,
    choices: { [id: string]: string },
}
