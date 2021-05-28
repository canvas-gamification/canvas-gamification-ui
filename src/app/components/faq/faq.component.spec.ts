import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FaqComponent} from './faq.component';
import {TestModule} from '@test/test.module';

describe('FaqComponent', () => {
    let component: FaqComponent;
    let fixture: ComponentFixture<FaqComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
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
