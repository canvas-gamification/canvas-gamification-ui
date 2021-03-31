import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonJavaFunctionsService {

    constructor() {
    }

    createSubmissionRequest(FormData, variablesJSON, inputFileNames) {
        return {
            title: FormData.title,
            difficulty: FormData.difficulty,
            course: FormData.course,
            event: FormData.event,
            text: FormData.text,
            category: FormData.category,
            variables: variablesJSON,
            junit_template: FormData.junit_template,
            input_file_names: inputFileNames,
        };
    }
}
