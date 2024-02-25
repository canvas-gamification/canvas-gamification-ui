import {ComponentFixture, TestBed} from '@angular/core/testing'

import {VariationTypesSelectorComponent} from './variation-types-selector.component'

describe('VariationTypesSelectorComponent', () => {
    let component: VariationTypesSelectorComponent
    let fixture: ComponentFixture<VariationTypesSelectorComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ VariationTypesSelectorComponent ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(VariationTypesSelectorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
