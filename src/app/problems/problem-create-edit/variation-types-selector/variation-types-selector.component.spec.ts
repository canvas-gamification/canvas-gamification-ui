import {ComponentFixture, TestBed} from '@angular/core/testing'
import {UntypedFormControl} from '@angular/forms'

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
        // The template binds [formControl]="variationControl"; when this component's
        // definition was compiled by an earlier spec within the AppModule scope, the
        // directive is active and a missing control throws. Always provide one.
        component.variationControl = new UntypedFormControl([])
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
