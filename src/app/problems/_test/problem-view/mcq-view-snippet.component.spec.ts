import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {McqViewSnippetComponent} from '../../problem-view/mcq-view-snippet/mcq-view-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_UQJ, MOCK_UQJ_2} from '@app/problems/_test/mock';
import {SubmissionService} from "@app/problems/_services/submission.service";
import {SubmissionServiceMock} from "@app/problems/_test/_services/submission.service.mock";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiCheckboxBlockModule, TuiRadioBlockModule} from "@taiga-ui/kit";
import {of} from "rxjs";
import {HttpHeaderResponse} from "@angular/common/http";
import {delay} from "rxjs/operators";
import {AsFormControlPipe} from "@app/_helpers/pipes/as-form-control.pipe";

let component: McqViewSnippetComponent;
let fixture: ComponentFixture<McqViewSnippetComponent>;

beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [TestModule, ReactiveFormsModule, TuiCheckboxBlockModule, TuiRadioBlockModule],
        providers: [{provide: SubmissionService, useClass: SubmissionServiceMock}],
        declarations: [McqViewSnippetComponent, AsFormControlPipe]
    }).compileComponents();
});

describe('McqViewSnippetComponent - MCQ', () => {
    let component: McqViewSnippetComponent;
    let fixture: ComponentFixture<McqViewSnippetComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(McqViewSnippetComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ;
        component.ngOnChanges();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set choiceArray', () => {
        expect(component.choiceArray.length).toEqual(2);
    });

    it('should submit', fakeAsync(() => {
        spyOn(component['submissionService'], 'postQuestionSubmission').and.callFake(() => of(new HttpHeaderResponse()).pipe(delay(1)));
        spyOn(component['notificationsService'], 'show').and.callFake(() => of());
        component.onSubmit(component.formData.value);
        expect(component['submissionService'].postQuestionSubmission).toHaveBeenCalled();
        tick(1);
        expect(component['notificationsService'].show).toHaveBeenCalled();
    }));
});

describe('McqViewSnippetComponent - Checkbox', () => {
    beforeEach(() => {
        fixture = TestBed.createComponent(McqViewSnippetComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ_2;
        component.ngOnChanges();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit', fakeAsync(() => {
        spyOn(component['submissionService'], 'postQuestionSubmission').and.callFake(() => of(new HttpHeaderResponse()).pipe(delay(1)));
        spyOn(component['notificationsService'], 'show').and.callFake(() => of());
        component.onCheckboxSubmit();
        expect(component['submissionService'].postQuestionSubmission).toHaveBeenCalled();
        tick(1);
        expect(component['notificationsService'].show).toHaveBeenCalled();
    }));
});
