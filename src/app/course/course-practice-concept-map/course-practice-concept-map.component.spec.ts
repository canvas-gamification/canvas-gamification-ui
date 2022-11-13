import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CoursePracticeConceptMapComponent} from './course-practice-concept-map.component'

describe('CoursePracticeConceptMapComponent', () => {
    let component: CoursePracticeConceptMapComponent
    let fixture: ComponentFixture<CoursePracticeConceptMapComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CoursePracticeConceptMapComponent ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursePracticeConceptMapComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
