import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TokenValuesComponent} from './token-values.component'
import {TestModule} from '../../../test/test.module'

describe('TokenValuesComponent', () => {
    let component: TokenValuesComponent
    let fixture: ComponentFixture<TokenValuesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenValuesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
