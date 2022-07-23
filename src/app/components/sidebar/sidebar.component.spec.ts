import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SidebarComponent} from './sidebar.component'
import {TestModule} from '@test/test.module'
import {SidebarModule} from '@app/components/sidebar/sidebar.module'

describe('SidebarComponent', () => {
    let component: SidebarComponent
    let fixture: ComponentFixture<SidebarComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            imports: [TestModule, SidebarModule]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent)
        component = fixture.componentInstance
        component.sidebarId = 'test-id'
        localStorage.removeItem(component.storageKey)
        spyOn(component, 'getSidebarDirectory').and.callThrough()
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should throw error when no ID is provided', () => {
        component.sidebarId = undefined
        fixture.detectChanges()
        expect(component.getSidebarDirectory).toThrowError('Attach an ID to the sidebar!')
    })

    it('should not throw error when not toggleable', () => {
        component.sidebarId = undefined
        component.toggleable = false
        fixture.detectChanges()
        expect(component.getSidebarDirectory).toThrowError('Attach an ID to the sidebar!')
    })

    it('should initialize with empty directory', () => {
        expect(component.getSidebarDirectory).toHaveBeenCalled()
        expect(localStorage.getItem(component.storageKey)).toEqual('{}')
    })

    it('should toggle sidebar and save to storage', () => {
        const sidebarOpen = component.sidebarOpen
        component.toggleSidebar()
        expect(component.sidebarOpen).toEqual(!sidebarOpen)
        expect(localStorage.getItem(component.storageKey)).toEqual(`{"${component.sidebarId}":${!sidebarOpen}}`)
    })
})
