import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileDetailsComponent} from './profile-details.component';
import {TestModule} from '@test/test.module';

describe('ProfileDetailsComponent', () => {
    let component: ProfileDetailsComponent;
    let fixture: ComponentFixture<ProfileDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
