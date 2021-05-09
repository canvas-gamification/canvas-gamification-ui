import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsentFormComponent} from './consent-form.component';
import {TestModule} from '../../../../test/test.module';

describe('ConsentFormComponent', () => {
    let component: ConsentFormComponent;
    let fixture: ComponentFixture<ConsentFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConsentFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
