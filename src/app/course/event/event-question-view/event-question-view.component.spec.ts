import {ComponentFixture, TestBed} from '@angular/core/testing'

import {EventQuestionViewComponent} from './event-question-view.component'

describe('EventQuestionViewComponent', () => {
    let component: EventQuestionViewComponent
    let fixture: ComponentFixture<EventQuestionViewComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventQuestionViewComponent]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(EventQuestionViewComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
