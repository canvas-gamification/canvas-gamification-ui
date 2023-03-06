import {ComponentFixture, TestBed} from '@angular/core/testing'

import {HomepageComponent} from './homepage.component'
import {TestModule} from '@test/test.module'
import {SidebarModule} from '@app/components/sidebar/sidebar.module'

describe('HomepageComponent', () => {
    let component: HomepageComponent
    let fixture: ComponentFixture<HomepageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, SidebarModule]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(HomepageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    // TODO: (Seth) fix
    xit('should create', () => {
        expect(component).toBeTruthy()
    })
})
