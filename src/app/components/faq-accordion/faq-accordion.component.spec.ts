import {ComponentFixture, TestBed} from '@angular/core/testing'

import {FaqAccordionComponent} from './faq-accordion.component'
import {of} from "rxjs"
import {TuiAccordion, TuiFilter} from "@taiga-ui/kit"

describe('FaqAccordionComponent', () => {
    let component: FaqAccordionComponent
    let fixture: ComponentFixture<FaqAccordionComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FaqAccordionComponent],
            imports: [TuiAccordion, TuiFilter]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(FaqAccordionComponent)
        component = fixture.componentInstance
        spyOn(component['faqService'], 'getFaqs').and.callFake(() => of([]))
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get faqs', () => {
        expect(component['faqService'].getFaqs).toHaveBeenCalled()
        expect(component.faqs).toEqual([])
    })
})
