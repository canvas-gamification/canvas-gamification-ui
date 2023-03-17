import {ComponentFixture, TestBed} from '@angular/core/testing'

import {UserActionsComponent} from './user-actions.component'
import {TestModule} from '@test/test.module'
import {UserActionsService} from "@app/_services/api/user-actions.service"
import {UserActionsServiceMock} from "@test/_services/user-actions.service.mock"
import {MOCK_USER_ACTIONS} from "@test/mock"
import {TuiLoaderModule} from "@taiga-ui/core"
import {TuiTableModule, TuiTablePaginationModule} from "@taiga-ui/addon-table"

describe('UserActionsComponent', () => {
    let component: UserActionsComponent
    let fixture: ComponentFixture<UserActionsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, TuiLoaderModule, TuiTableModule, TuiTablePaginationModule],
            declarations: [UserActionsComponent],
            providers: [
                {provide: UserActionsService, useClass: UserActionsServiceMock}
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(UserActionsComponent)
        component = fixture.componentInstance
        spyOn(component.paramChanged, 'next').and.callThrough()
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should set user actions', () => {
        expect(component.userActions).toEqual(MOCK_USER_ACTIONS)
    })

    it('should update', () => {
        component.update()
        expect(component.loadingTable).toBeTrue()
        expect(component.paramChanged.next).toHaveBeenCalled()
    })

    it('should get options', () => {
        const options = component.getOptions()
        expect(options).toEqual({
            page: component.page + 1,
            page_size: component.pageSize,
            ordering: component.getOrdering()
        })
    })

    it('should get order', () => {
        component.sorter = component.sorters['id']
        component.sortDirection = 1
        expect(component.getOrdering()).toEqual('id')
        component.sorter = component.sorters['object_type']
        component.sortDirection = -1
        expect(component.getOrdering()).toEqual('-object_type')
        component.sorter = component.sorters['time_created']
        component.sortDirection = 1
        expect(component.getOrdering()).toEqual('time_created')
    })
})
