import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing'

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
import {QuestionService} from "@app/problems/_services/question.service"
import {QuestionServiceMock} from "@app/problems/_test/_services/question.service.mock"
import {of} from "rxjs"

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
                {provide: QuestionService, useClass: QuestionServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            parent: {
                                params: {
                                    courseId: 0
                                }
                            },
                            params: {
                                eventId: 0,
                            },
                        },
                        params: of({
                            type: 'parsons',
                        })
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

    it('should create with new question', () => {
        expect(component).toBeTruthy()
    })
})

describe('ProblemCreateEditComponentEditQuestion', () => {
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
                {provide: QuestionService, useClass: QuestionServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            parent: {
                                params: {
                                    courseId: 0
                                }
                            },
                            params: {
                                id: 1,
                                eventId: 0,
                            },
                        },
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

    it('should create with existing question', fakeAsync(() => {
        expect(component).toBeTruthy()
    }))
})
