import {Injectable} from '@angular/core';
import {FormArray} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ProblemHelpersService {

    createMCQSubmissionRequest(formData: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        answer: string,
        category: string,
        choices: string,
        visible_distractor_count: number,
    }, choices: FormArray, variablesJSON: JSON[]): {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        answer: string,
        category: string,
        variables: JSON[],
        visible_distractor_count: number,
        choices: FormArray
    } {
        let mcqChoices = choices.value;
        mcqChoices.unshift(formData.answer);
        mcqChoices = this.arrayToObject(mcqChoices);
        const correctAnswer = Object.keys(mcqChoices).find(key => mcqChoices[key] === formData.answer);
        return {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: formData.text,
            answer: correctAnswer,
            category: formData.category,
            variables: variablesJSON,
            visible_distractor_count: formData.visible_distractor_count,
            choices: mcqChoices
        };
    }

    createJavaSubmissionRequest(formData: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        category: string,
        junit_template: string,
        input_file_names: JSON,
    }, variablesJSON: JSON[], inputFileNames: JSON): {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        category: string,
        variables: JSON[],
        junit_template: string,
        input_file_names: JSON,
    } {
        return {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: formData.text,
            category: formData.category,
            variables: variablesJSON,
            junit_template: formData.junit_template,
            input_file_names: inputFileNames,
        };
    }

    createParsonsSubmissionRequest(formData: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        category: string,
        lines: string,
        additional_file_name: string,
        junit_template: string,
    }, variablesJSON: JSON[]): {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        category: string,
        variables: JSON[],
        lines: string[],
        additional_file_name: string,
        junit_template: string,
    } {
        return {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: formData.text,
            category: formData.category,
            variables: variablesJSON,
            lines: formData.lines.split('\n'),
            additional_file_name: formData.additional_file_name,
            junit_template: formData.junit_template,
        };
    }

    getNextLetter(char: string): string {
        let code = char.charCodeAt(0);
        code++;
        return String.fromCharCode(code);
    }

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
