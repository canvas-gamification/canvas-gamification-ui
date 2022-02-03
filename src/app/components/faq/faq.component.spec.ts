import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FaqComponent} from './faq.component';
import {TestModule} from '@test/test.module';
import {FaqAccordionModule} from "@app/components/faq-accordion/faq-accordion.module";

describe('FaqComponent', () => {
    let component: FaqComponent;
    let fixture: ComponentFixture<FaqComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FaqComponent],
            imports: [TestModule, FaqAccordionModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FaqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
