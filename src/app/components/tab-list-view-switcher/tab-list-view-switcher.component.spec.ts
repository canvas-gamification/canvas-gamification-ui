import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TabListViewSwitcherComponent} from './tab-list-view-switcher.component'
import {TestModule} from "@test/test.module"
import {TuiRadioBlockModule} from "@taiga-ui/kit"
import {TuiSvgModule} from "@taiga-ui/core"

describe('TabListViewSwitcherComponent', () => {
    let component: TabListViewSwitcherComponent
    let fixture: ComponentFixture<TabListViewSwitcherComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TabListViewSwitcherComponent],
            imports: [TestModule, TuiRadioBlockModule, TuiSvgModule]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(TabListViewSwitcherComponent)
        component = fixture.componentInstance
        window.localStorage.removeItem(component['tabListViewService'].localStorageValue)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get initiated view with default list value', () => {
        expect(component.view).toBe('list')
    })

    it('should set view', () => {
        component.setView('tab')
        expect(component['tabListViewService'].getView()).toBe('tab')
    })
})
