import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'

import {HeaderComponent} from './header.component'
import {TestModule} from '../../../test/test.module'

describe('HeaderComponent', () => {
    let component: HeaderComponent
    let fixture: ComponentFixture<HeaderComponent>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
