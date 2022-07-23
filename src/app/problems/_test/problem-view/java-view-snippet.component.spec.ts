import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing'

import {JavaViewSnippetComponent} from '../../problem-view/java-view-snippet/java-view-snippet.component'
import {TestModule} from '@test/test.module'
import {MOCK_UQJ_3, MOCK_UQJS} from '@app/problems/_test/mock'
import {SubmissionService} from "@app/problems/_services/submission.service"
import {SubmissionServiceMock} from "@app/problems/_test/_services/submission.service.mock"
import {of} from "rxjs"
import {delay} from "rxjs/operators"
import {HttpHeaderResponse} from "@angular/common/http"

describe('JavaViewSnippetComponent', () => {
    let component: JavaViewSnippetComponent
    let fixture: ComponentFixture<JavaViewSnippetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [{provide: SubmissionService, useClass: SubmissionServiceMock}],
            declarations: [JavaViewSnippetComponent]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(JavaViewSnippetComponent)
        component = fixture.componentInstance
        component.uqj = MOCK_UQJ_3
        component.ngOnChanges()
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should set inputFileNames', () => {
        expect(component.inputFileNames).toEqual(MOCK_UQJS.find(uqj => uqj.id === 2).input_files)
    })

    it('should submit', fakeAsync(() => {
        spyOn(component['submissionService'], 'postQuestionSubmission').and.callFake(() => of(new HttpHeaderResponse()).pipe(delay(1)))
        spyOn(component['notificationsService'], 'show').and.callFake(() => of())
        component.onSubmit()
        const codeSolution = {}
        component.inputFileNames.forEach(file => {
            codeSolution[file.name] = file.template
        })
        expect(component['submissionService'].postQuestionSubmission).toHaveBeenCalledWith({
            question: component.uqj.question.id,
            solution: codeSolution
        })
        tick(1)
        expect(component['notificationsService'].show).toHaveBeenCalled()
    }))
})
