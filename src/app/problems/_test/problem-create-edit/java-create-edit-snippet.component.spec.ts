import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {JavaCreateEditSnippetComponent} from '../../problem-create-edit/java-create-edit-snippet/java-create-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/_services/question.service.mock";
import {ReactiveFormsModule} from "@angular/forms";
import {MOCK_JAVA_QUESTION} from "@app/problems/_test/mock";
import {TuiButtonModule} from "@taiga-ui/core";
import {of} from "rxjs";
import {TuiFieldErrorModule, TuiInputModule, TuiSelectModule, TuiTextAreaModule} from "@taiga-ui/kit";
import {HttpResponse} from "@angular/common/http";
import {Question} from "@app/_models";
import {delay} from "rxjs/operators";

describe('JavaCreateEditSnippetComponent', () => {
    let component: JavaCreateEditSnippetComponent;
    let fixture: ComponentFixture<JavaCreateEditSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JavaCreateEditSnippetComponent, CkEditorComponent],
            imports: [
                TestModule, CKEditorModule, ReactiveFormsModule, TuiTextAreaModule,
                TuiInputModule, TuiSelectModule, TuiFieldErrorModule, TuiButtonModule
            ],
            providers: [
                {provide: QuestionService, useClass: QuestionServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JavaCreateEditSnippetComponent);
        component = fixture.componentInstance;
        spyOn(component['questionService'], 'postJavaQuestion').and.callFake(() => of(new HttpResponse<Question>()).pipe(delay(1)));
        spyOn(component['questionService'], 'putJavaQuestion').and.callFake(() => of(new HttpResponse<Question>()).pipe(delay(1)));
        spyOn(component['router'], 'navigate').and.callThrough();
        spyOn(component, 'refreshPage').and.callThrough();
        spyOn(component['notificationsService'], 'show').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should refresh page', () => {
        component.refreshPage();
        expect(component['router'].onSameUrlNavigation).toBe('reload');
        expect(component['router'].navigate).toHaveBeenCalled();
    });

    it('should be valid form', () => {
        component.formGroup.patchValue(MOCK_JAVA_QUESTION);
        fixture.detectChanges();
        expect(component.formGroup.valid).toBeTrue();
    });

    it('should submit', fakeAsync(() => {
        component.onSubmit();
        const data = component.formGroup.getRawValue();
        expect(component['questionService'].postJavaQuestion).toHaveBeenCalledWith(data);
        tick(1);
        expect(component['notificationsService'].show).toHaveBeenCalled();
        expect(component.refreshPage).toHaveBeenCalled();
    }));

    describe('JavaCreateEditSnippetComponent with Question Details', () => {
        beforeEach(() => {
            component.questionDetails = MOCK_JAVA_QUESTION;
            component.ngOnInit();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
            expect(component.formGroup).toBeTruthy();
        });

        it('should be valid form', () => {
            expect(component.formGroup.valid).toBeTrue();
        });

        it('should submit', fakeAsync(() => {
            component.onSubmit();
            const data = component.formGroup.getRawValue();
            expect(component['questionService'].putJavaQuestion).toHaveBeenCalledWith(data, component.questionDetails.id);
            tick(1);
            expect(component['notificationsService'].show).toHaveBeenCalled();
            expect(component.refreshPage).toHaveBeenCalled();
        }));
    });
});
