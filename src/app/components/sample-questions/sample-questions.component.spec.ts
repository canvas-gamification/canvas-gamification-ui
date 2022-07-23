import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'

import {SampleQuestionsComponent} from './sample-questions.component'
import {TestModule} from '../../../test/test.module'

describe('SampleQuestionsComponent', () => {
    let component: SampleQuestionsComponent
    let fixture: ComponentFixture<SampleQuestionsComponent>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SampleQuestionsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
