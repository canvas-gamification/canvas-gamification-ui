import {ComponentFixture, TestBed} from '@angular/core/testing'

import {HomepageComponent} from './homepage.component'
import {TestModule} from '@test/test.module'
import {SidebarModule} from '@app/components/sidebar/sidebar.module'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/course.service.mock"

describe('HomepageComponent', () => {
    let component: HomepageComponent
    let fixture: ComponentFixture<HomepageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, SidebarModule],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(HomepageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    fit('should create', () => {
        expect(component).toBeTruthy()
    })
})
