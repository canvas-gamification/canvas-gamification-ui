import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'

import {TopicsComponent} from './topics.component'
import {TestModule} from '../../../test/test.module'

describe('TopicsComponent', () => {
    let component: TopicsComponent
    let fixture: ComponentFixture<TopicsComponent>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(TopicsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
