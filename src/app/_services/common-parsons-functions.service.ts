import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonParsonsFunctionsService {

    constructor() {
    }

    createSubmissionRequest(FormData, variablesJSON) {
        return {
            title: FormData.title,
            difficulty: FormData.difficulty,
            course: FormData.course,
            event: FormData.event,
            text: FormData.text,
            category: FormData.category,
            variables: variablesJSON,
            lines: FormData.lines.split('\n'),
            additional_file_name: FormData.additional_file_name,
            junit_template: FormData.junit_template,
        };
    }
}
