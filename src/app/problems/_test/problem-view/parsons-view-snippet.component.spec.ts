import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ParsonsViewSnippetComponent} from '../../problem-view/parsons-view-snippet/parsons-view-snippet.component'
import {TestModule} from '@test/test.module'
import {DragulaModule} from "ng2-dragula"
import {MOCK_UQJ_4} from "@app/problems/_test/mock"
import {TabListViewSwitcherModule} from "@app/components/tab-list-view-switcher/tab-list-view-switcher.module"
import {ParsonsLinesComponent} from "@app/problems/problem-view/parsons-lines/parsons-lines.component"
import {of} from "rxjs"
import {TuiTabsModule} from "@taiga-ui/kit"

describe('ParsonsViewSnippetComponent', () => {
    let component: ParsonsViewSnippetComponent
    let fixture: ComponentFixture<ParsonsViewSnippetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParsonsViewSnippetComponent, ParsonsLinesComponent],
            imports: [TestModule, DragulaModule.forRoot(), TabListViewSwitcherModule, TuiTabsModule],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsViewSnippetComponent)
        component = fixture.componentInstance
        component.uqj = MOCK_UQJ_4
        component.ngOnChanges()
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should submit', () => {
        spyOn(component['submissionService'], 'postQuestionSubmission').and.callFake(() => of())
        component.onSubmit()
        expect(component['submissionService'].postQuestionSubmission).toHaveBeenCalled()
    })
})
