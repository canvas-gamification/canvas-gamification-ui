import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ProblemCreateEditComponent} from '../../problem-create-edit/problem-create-edit.component'
import {TestModule} from '@test/test.module'
import {
    JavaCreateEditSnippetComponent
} from "@app/problems/problem-create-edit/java-create-edit-snippet/java-create-edit-snippet.component"
import {
    ParsonsCreateEditSnippetComponent
} from "@app/problems/problem-create-edit/parsons-create-edit-snippet/parsons-create-edit-snippet.component"
import {
    McqCreateEditSnippetComponent
} from "@app/problems/problem-create-edit/mcq-create-edit-snippet/mcq-create-edit-snippet.component"
import {ActivatedRoute} from "@angular/router"

describe('ProblemCreateEditComponent', () => {
    let component: ProblemCreateEditComponent
    let fixture: ComponentFixture<ProblemCreateEditComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ProblemCreateEditComponent, JavaCreateEditSnippetComponent,
                ParsonsCreateEditSnippetComponent, McqCreateEditSnippetComponent
            ],
            imports: [TestModule],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                type: 'MCQ',
                            },
                            parent: {
                                params: {},
                            }
                        }
                    }
                }
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemCreateEditComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
