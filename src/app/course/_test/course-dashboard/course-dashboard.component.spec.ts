import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CourseDashboardComponent} from '../../course-dashboard/course-dashboard.component';
import {TestModule} from "@test/test.module";
import {CourseDashboardService} from "@app/course/_services/course-dashboard.service";
import {CourseDashboardServiceMock} from "@app/course/_test/course-dashboard.service.mock";
import {MOCK_COURSE_REGISTRATION} from "@app/course/_test/mock";
import {ToastrService} from "ngx-toastr";

describe('CourseDashboardComponent', () => {
    let component: CourseDashboardComponent;
    let fixture: ComponentFixture<CourseDashboardComponent>;
    let toastr: ToastrService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [CourseDashboardComponent],
            providers: [
                {provide: CourseDashboardService, useClass: CourseDashboardServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        toastr = TestBed.inject(ToastrService);
        spyOn(toastr, 'success');
        fixture = TestBed.createComponent(CourseDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('courseRegistration should be created with data', () => {
        expect(component.registrationList).toEqual([MOCK_COURSE_REGISTRATION]);
    });

    it('should apply filter', () => {
        component.formGroup.controls['name'].setValue('');
        component.applyFilter();
        fixture.detectChanges();
        expect(component.filterQueryString === component.formGroup.value);
    });

    it('changeStatus should work', () => {
        component.changeStatus(1, true, true);
        expect(toastr.success).toHaveBeenCalled();
    });

});
