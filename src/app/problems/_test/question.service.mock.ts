import {Injectable} from "@angular/core";
import {McqFormData} from "@app/problems/_forms/mcq.form";
import {Observable, of} from "rxjs";
import {APIResponse} from "@app/_models";
import {JavaFormData} from "@app/problems/_forms/java.form";
import {ParsonsFormData} from "@app/problems/_forms/parsons.form";

@Injectable({
    providedIn: 'root'
})
export class QuestionServiceMock {
    postMultipleChoiceQuestion(input: McqFormData): Observable<APIResponse> {
        return of({success: true});
    }

    postJavaQuestion(input: JavaFormData): Observable<APIResponse> {
        return of({success: true});
    }

    postParsonsQuestion(input: ParsonsFormData): Observable<APIResponse> {
        return of({success: true});
    }
}
