import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseChallengeSnippetComponent} from './course-challenge-snippet.component'

describe('CourseChallengeSnippetComponent', () => {
    let component: CourseChallengeSnippetComponent
    let fixture: ComponentFixture<CourseChallengeSnippetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CourseChallengeSnippetComponent ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseChallengeSnippetComponent)
        component = fixture.componentInstance
        component.events = []
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
