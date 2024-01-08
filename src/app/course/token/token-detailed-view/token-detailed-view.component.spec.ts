import {ComponentFixture, TestBed} from '@angular/core/testing'
import {TokenDetailedViewComponent} from './token-detailed-view.component'

describe('TokenDetailedViewComponent', () => {
    let component: TokenDetailedViewComponent
    let fixture: ComponentFixture<TokenDetailedViewComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TokenDetailedViewComponent]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenDetailedViewComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
