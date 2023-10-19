import {ComponentFixture, TestBed} from '@angular/core/testing'
import {MyStatsComponent} from './my-stats.component'
import {MOCK_USER_STATS1} from "@app/course/_test/mock"
import {UserStatsService} from "@app/_services/api/user-stats.service"
import {UserStatsServiceMock} from "@test/_services/user-stats.service.mock"
import {CategoryService} from "@app/_services/api/category.service"
import {CategoryServiceMock} from "@test/_services/category.service.mock"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {DifficultyServiceMock} from "@app/problems/_test/_services/difficulty.service.mock"
import {AuthenticationService} from "@app/_services/api/authentication";
import {AuthenticationServiceMock} from "@test/_services/authentication.service.mock";


describe('MyStatsComponent', () => {
    let component: MyStatsComponent
    let fixture: ComponentFixture<MyStatsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MyStatsComponent],
            providers: [
                {provide: UserStatsService, useClass: UserStatsServiceMock},
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: DifficultyService, useClass: DifficultyServiceMock},
                {provide: AuthenticationService, useClass: AuthenticationServiceMock}
            ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(MyStatsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should retrieve stats', () => {
        expect(component.stats).toEqual(MOCK_USER_STATS1)
    })

    it('should test number of challenges completed', () => {
        expect(component.challengesCompleted).toEqual(2)
    })

    it('should test number of goals completed', () => {
        expect(component.goalsCompleted).toEqual(2)
    })

    it('should test number of questions solved', () => {
        expect(component.totalQuestionsSolved).toEqual(6)
    })
})
