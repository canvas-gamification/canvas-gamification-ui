import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseTeamCreateComponent} from './course-team-create.component';

describe('CourseCreateTeamComponent', () => {
    let component: CourseTeamCreateComponent;
    let fixture: ComponentFixture<CourseTeamCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CourseTeamCreateComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseTeamCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
