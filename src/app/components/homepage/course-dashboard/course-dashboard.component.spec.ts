import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseDashboardComponent} from './course-dashboard.component'
import {TestModule} from '@test/test.module'

describe('CourseDashboardComponent', () => {
    let component: CourseDashboardComponent
    let fixture: ComponentFixture<CourseDashboardComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseDashboardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    // TODO: (Seth) fix
    xit('should create', () => {
        expect(component).toBeTruthy()
    })
})
