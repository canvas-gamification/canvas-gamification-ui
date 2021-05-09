import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LandingPageComponent} from './landing-page.component';
import {TestModule} from '../../../test/test.module';

describe('LandingPageComponent', () => {
    let component: LandingPageComponent;
    let fixture: ComponentFixture<LandingPageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
