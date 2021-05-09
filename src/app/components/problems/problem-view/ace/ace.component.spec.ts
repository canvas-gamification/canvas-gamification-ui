import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AceComponent} from './ace.component';
import {TestModule} from '../../../../../test/test.module';

describe('AceComponent', () => {
    let component: AceComponent;
    let fixture: ComponentFixture<AceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
