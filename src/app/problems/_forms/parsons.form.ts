import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InputFiles, Question} from "@app/_models";

export class ParsonsForm {
    /**
     * Creates a FormGroup for a Parsons question.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(null, [Validators.required]),
            difficulty: new FormControl(null, [Validators.required]),
            category: new FormControl(null, [Validators.required]),
            course: new FormControl(null),
            event: new FormControl(null),
            junit_template: new FormControl(null, [Validators.required]),
        });
    }

    /**
     * Creates a FormGroup for a Parsons question with existing data.
     * @param question - The question object.
     * @param event - The event.
     * @param course - The course.
     */
    static createFormWithData(question: Question, event: number, course: number): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(question.title, [Validators.required]),
            difficulty: new FormControl(question.difficulty, [Validators.required]),
            category: new FormControl(question.category, [Validators.required]),
            course: new FormControl(course),
            event: new FormControl(event),
            junit_template: new FormControl(question.junit_template, [Validators.required]),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the question.
     * @param variablesJSON - The variables in JSON format.
     * @param inputFiles - The input files
     * @param questionText - The question text.
     */
    static extractData(
        form: FormGroup, variablesJSON: JSON[],
        inputFiles: {name: string, compile: boolean, lines: string}[],
        questionText: string
    ): ParsonsFormData {
        return {
            title: form.value.title,
            difficulty: form.value.difficulty,
            course: form.value.course,
            event: form.value.event,
            text: questionText,
            category: form.value.category,
            variables: variablesJSON,
            junit_template: form.value.junit_template,
            input_files: inputFiles.map(inputFile => ({
                name: inputFile.name,
                compile: inputFile.compile,
                lines: inputFile.lines.split('\n')
            }))
        };
    }
}

export interface ParsonsFormData {
    title: string,
    difficulty: string,
    course: number,
    event: number,
    text: string,
    category: number,
    variables: JSON[],
    junit_template: string,
    input_files: InputFiles,
}
