import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MessagesComponent} from './messages.component';
import {TestModule} from '../../../test/test.module';

describe('MessagesComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
