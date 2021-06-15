import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivationEmailComponent} from './activation-email.component';
import {TestModule} from '@test/test.module';

describe('ActivationEmailComponent', () => {
    let component: ActivationEmailComponent;
    let fixture: ComponentFixture<ActivationEmailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivationEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
