import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProblemSetComponent} from '../../problem-set/problem-set.component';
import {TestModule} from '@test/test.module';
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {DifficultyServiceMock} from "@app/problems/_test/difficulty.service.mock";

describe('ProblemSetComponent', () => {
    let component: ProblemSetComponent;
    let fixture: ComponentFixture<ProblemSetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [ProblemSetComponent],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: DifficultyService, useClass: DifficultyServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemSetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});
