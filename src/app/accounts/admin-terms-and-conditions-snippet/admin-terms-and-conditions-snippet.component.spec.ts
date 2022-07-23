import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AdminTermsAndConditionsSnippetComponent} from './admin-terms-and-conditions-snippet.component'
import {TestModule} from '@test/test.module'

describe('AdminTermsAndConditionsSnippetComponent', () => {
    let component: AdminTermsAndConditionsSnippetComponent
    let fixture: ComponentFixture<AdminTermsAndConditionsSnippetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminTermsAndConditionsSnippetComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
