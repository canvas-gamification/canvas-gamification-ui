import {ComponentFixture, TestBed} from '@angular/core/testing'
import {CommunityComponent} from './community.component'
import {AuthenticationService} from "@app/_services/api/authentication"
import {AuthenticationServiceMock} from "@test/_services/authentication.service.mock"

describe('CommunityComponent', () => {
    let component: CommunityComponent
    let fixture: ComponentFixture<CommunityComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommunityComponent],
            providers: [
                {provide: AuthenticationService, useClass: AuthenticationServiceMock}
            ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CommunityComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
