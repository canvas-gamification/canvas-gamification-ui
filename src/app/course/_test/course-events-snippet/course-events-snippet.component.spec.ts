import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseEventsSnippetComponent} from '../../course-events-snippet/course-events-snippet.component';
import {TestModule} from '@test/test.module';

describe('CourseEventsSnippetComponent', () => {
    let component: CourseEventsSnippetComponent;
    let fixture: ComponentFixture<CourseEventsSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseEventsSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
