import {Injectable} from '@angular/core';
import {McqFormData} from "@app/problems/_models/mcq/mcq-form-data";
import {JavaFormData} from "@app/problems/_models/java/java-form-data";
import {ParsonsFormData} from "@app/problems/_models/parsons/parsons-form-data";
import {McqSubmissionRequest} from "@app/problems/_models/mcq/mcq-submission-request";
import {JavaSubmissionRequest} from "@app/problems/_models/java/java-submission-request";
import {ParsonsSubmissionRequest} from "@app/problems/_models/parsons/parsons-submission-request";

@Injectable({
    providedIn: 'root'
})
export class ProblemHelpersService {

    /**
     * Creates the submission request for a mcq.
     * @param formData - Data from form.
     * @param choices - Choices list.
     * @param variablesJSON - Extra variables.
     * @param questionText - The question text.
     * @param questionAnswer - The question's answer.
     */
    createMCQSubmissionRequest(formData: McqFormData, choices: string[], variablesJSON: JSON[], questionText: string, questionAnswer: string): McqSubmissionRequest {
        choices.unshift(questionAnswer);
        const mcqChoices = this.arrayToObject(choices);
        const correctAnswer = Object.keys(mcqChoices).find(key => mcqChoices[key] === questionAnswer);
        return {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: questionText,
            answer: correctAnswer,
            category: formData.category,
            variables: variablesJSON,
            visible_distractor_count: formData.visible_distractor_count,
            choices: mcqChoices
        };
    }

    /**
     * Creates the submission request for a checkbox question.
     * @param formData - Data from form.
     * @param choices - Choices list.
     * @param variablesJSON - Extra variables.
     * @param questionText - The question text.
     * @param correctAnswers - The question's answers.
     */
    createCheckboxSubmissionRequest(formData: McqFormData, choices: string[], variablesJSON: JSON[], questionText: string, correctAnswers: string[]): McqSubmissionRequest {
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
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: questionText,
            answer: correctAnswer,
            category: formData.category,
            variables: variablesJSON,
            visible_distractor_count: formData.visible_distractor_count,
            choices: checkboxChoices
        };
    }

    /**
     * Creates the submission request for a java question.
     * @param formData - Data from form.
     * @param variablesJSON - Extra variables.
     * @param inputFileNames - The file-name and code for submission.
     * @param questionText - The question text.
     */
    createJavaSubmissionRequest(formData: JavaFormData, variablesJSON: JSON[], inputFileNames: JSON, questionText: string): JavaSubmissionRequest {
        return {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: questionText,
            category: formData.category,
            variables: variablesJSON,
            junit_template: formData.junit_template,
            input_file_names: inputFileNames,
        };
    }

    /**
     * Creates the submission request for a parsons question.
     * @param formData - Data from form.
     * @param variablesJSON - Extra variables.
     * @param questionText - The question text.
     */
    createParsonsSubmissionRequest(formData: ParsonsFormData, variablesJSON: JSON[], questionText: string): ParsonsSubmissionRequest {
        return {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: questionText,
            category: formData.category,
            variables: variablesJSON,
            lines: formData.lines.split('\n'),
            additional_file_name: formData.additional_file_name,
            junit_template: formData.junit_template,
        };
    }

    /**
     * Helper method to get the next letter.
     * @param char - Letter to get the following for.
     */
    getNextLetter(char: string): string {
        let code = char.charCodeAt(0);
        code++;
        return String.fromCharCode(code);
    }

    /**
     * Helper function to turn an array into an object.
     * @param choicesArray - The array to transform.
     */
    arrayToObject(choicesArray: string[]): { [id: string]: string } {
        const choices = {};
        let id = 'a';
        for (const choice of choicesArray) {
            choices[id] = choice;
            id = this.getNextLetter(id);
        }
        return choices;
    }
}
