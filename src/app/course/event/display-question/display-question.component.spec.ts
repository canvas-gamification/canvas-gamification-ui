import {ComponentFixture, TestBed} from '@angular/core/testing'

import {DisplayQuestionComponent} from './display-question.component'

describe('DisplayQuestionComponent', () => {
    let component: DisplayQuestionComponent
    let fixture: ComponentFixture<DisplayQuestionComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DisplayQuestionComponent]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(DisplayQuestionComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
