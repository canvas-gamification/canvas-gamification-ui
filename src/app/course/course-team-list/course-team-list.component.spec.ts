import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseTeamListComponent} from './course-team-list.component';

describe('CourseTeamListComponent', () => {
    let component: CourseTeamListComponent;
    let fixture: ComponentFixture<CourseTeamListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CourseTeamListComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseTeamListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
