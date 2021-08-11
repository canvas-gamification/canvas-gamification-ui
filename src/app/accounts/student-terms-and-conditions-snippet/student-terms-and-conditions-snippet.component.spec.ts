import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentTermsAndConditionsSnippetComponent} from './student-terms-and-conditions-snippet.component';

describe('StudentTermsAndConditionsSnippetComponent', () => {
    let component: StudentTermsAndConditionsSnippetComponent;
    let fixture: ComponentFixture<StudentTermsAndConditionsSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StudentTermsAndConditionsSnippetComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentTermsAndConditionsSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
