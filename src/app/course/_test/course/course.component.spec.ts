import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseComponent} from '../../course.component';
import {TestModule} from '@test/test.module';
import {CourseService} from "@app/course/_services/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {ActivatedRoute} from "@angular/router";
import {MOCK_COURSE1} from "@app/course/_test/mock";
import {ConceptMapComponent} from "@app/course/concept-map/concept-map.component";
import {CourseEventsSnippetComponent} from "@app/course/course-events-snippet/course-events-snippet.component";
import {LeaderBoardComponent} from "@app/course/leader-board/leader-board.component";

describe('CourseComponent', () => {
    let component: CourseComponent;
    let fixture: ComponentFixture<CourseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                CourseComponent,
                ConceptMapComponent,
                CourseEventsSnippetComponent,
                LeaderBoardComponent
            ],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                courseId: 0
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('course should be retrieved on initial load', () => {
        expect(component.course).toEqual(MOCK_COURSE1);
    });
});
