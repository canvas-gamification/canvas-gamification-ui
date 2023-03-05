import {ComponentFixture, TestBed} from '@angular/core/testing'

import {InactiveCoursesComponent} from './inactive-courses.component'
import {TestModule} from '../../../../test/test.module'

describe('InactiveCoursesComponent', () => {
    let component: InactiveCoursesComponent
    let fixture: ComponentFixture<InactiveCoursesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(InactiveCoursesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    // TODO: (Seth) fix
    xit('should create', () => {
        expect(component).toBeTruthy()
    })
})
