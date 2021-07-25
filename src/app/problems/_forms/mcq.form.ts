import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Question} from "@app/_models";

export class McqForm {
    /**
     * Creates a FormGroup for a MCQ question.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(null, [Validators.required]),
            difficulty: new FormControl(null, [Validators.required]),
            course: new FormControl(null),
            event: new FormControl(null),
            category: new FormControl(null, [Validators.required]),
            visible_distractor_count: new FormControl(null, [Validators.required]),
        });
    }

    /**
     * Creates a FormGroup for a MCQ question with existing data.
     * @param question - The question object.
     * @param event - The event.
     * @param course - The course.
     */
    static createFormWithData(question: Question, event: number, course: number): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(question.title, [Validators.required]),
            difficulty: new FormControl(question.difficulty, [Validators.required]),
            course: new FormControl(course),
            event: new FormControl(event),
            category: new FormControl(question.category, [Validators.required]),
            visible_distractor_count: new FormControl(question.visible_distractor_count.toString(), [Validators.required]),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the question.
     * @param choices - The mcq choices list.
     * @param variablesJSON - The variables in JSON format.
     * @param questionText - The question text.
     * @param questionAnswer - The question's answer.
     */
    static extractMcqData(form: FormGroup, choices: string[], variablesJSON: JSON[], questionText: string, questionAnswer: string): McqFormData {
        choices.unshift(questionAnswer);
        const mcqChoices = this.arrayToObject(choices);
        const correctAnswer = Object.keys(mcqChoices).find(key => mcqChoices[key] === questionAnswer);
        return {
            title: form.value.title,
            difficulty: form.value.difficulty,
            course: form.value.course,
            event: form.value.event,
            text: questionText,
            answer: correctAnswer,
            category: form.value.category,
            variables: variablesJSON,
            visible_distractor_count: form.value.visible_distractor_count,
            choices: mcqChoices
        };
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the question.
     * @param choices - The checkbox choices list.
     * @param variablesJSON - The variables in JSON format.
     * @param questionText - The question text.
     * @param correctAnswers - The list of correct answers.
     */
    static extractCheckboxData(form: FormGroup, choices: string[], variablesJSON: JSON[], questionText: string, correctAnswers: string[]): McqFormData {
        correctAnswers.forEach((answer) => {
            choices.unshift(answer);
        });
        const checkboxChoices = this.arrayToObject(choices);
        const correctAnswerKeys: string[] = [];
        correctAnswers.forEach((answer) => {
            correctAnswerKeys.push(Object.keys(checkboxChoices).find(key => checkboxChoices[key] === answer));
        });
        const correctAnswer = correctAnswerKeys.toString();
        return {
            title: form.value.title,
            difficulty: form.value.difficulty,
            course: form.value.course,
            event: form.value.event,
            text: questionText,
            answer: correctAnswer,
            category: form.value.category,
            variables: variablesJSON,
            visible_distractor_count: form.value.visible_distractor_count,
            choices: checkboxChoices
        };
    }

    /**
     * Helper method to get the next letter.
     * @param char - Letter to get the following for.
     */
    private static getNextLetter(char: string): string {
        let code = char.charCodeAt(0);
        code++;
        return String.fromCharCode(code);
    }

    /**
     * Helper function to turn an array into an object.
     * @param choicesArray - The array to transform.
     */
    private static arrayToObject(choicesArray: string[]): { [id: string]: string } {
        const choices = {};
        let id = 'a';
        for (const choice of choicesArray) {
            choices[id] = choice;
            id = this.getNextLetter(id);
        }
        return choices;
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
    choices: { [id: string]: string },
}
