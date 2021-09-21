import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserActionsComponent} from './user-actions.component';
import {TestModule} from '../../../../test/test.module';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {UserActionsService} from "@app/_services/api/user-actions.service";
import {UserActionsServiceMock} from "@test/user-actions.service.mock";
import {MOCK_USER_ACTIONS} from "@test/mock";

describe('UserActionsComponent', () => {
    let component: UserActionsComponent;
    let fixture: ComponentFixture<UserActionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, MatPaginatorModule, MatTableModule],
            declarations: [UserActionsComponent],
            providers: [
                {provide: UserActionsService, useClass: UserActionsServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set user actions', () => {
        expect(component.userActions).toEqual(MOCK_USER_ACTIONS);
    });

    it('should sort actions', () => {
        component.sortData({active: 'ascending', direction: 'asc'});
        expect(component.ordering).toEqual('ascending');

        component.sortData({active: 'ascending', direction: 'desc'});
        expect(component.ordering).toEqual('-ascending');

        component.sortData({active: 'ascending', direction: ''});
        expect(component.ordering).toEqual('');
    });
});
