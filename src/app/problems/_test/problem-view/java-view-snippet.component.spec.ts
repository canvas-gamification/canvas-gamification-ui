import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaViewSnippetComponent} from '../../problem-view/java-view-snippet/java-view-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_UQJ_3, MOCK_UQJS} from '@app/problems/_test/mock';
import {SubmissionService} from "@app/problems/_services/submission.service";
import {SubmissionServiceMock} from "@app/problems/_test/_services/submission.service.mock";

describe('JavaViewSnippetComponent', () => {
    let component: JavaViewSnippetComponent;
    let fixture: ComponentFixture<JavaViewSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [{provide: SubmissionService, useClass: SubmissionServiceMock}],
            declarations: [JavaViewSnippetComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JavaViewSnippetComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ_3;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set inputFileNames', () => {
        expect(component.inputFileNames).toEqual(MOCK_UQJS.find(uqj => uqj.id === 2).input_files);
    });
});
