import {ComponentFixture, TestBed} from '@angular/core/testing'

import {EditorComponent} from './editor.component'
import {DebugElement} from '@angular/core'
import {GetKatexHtmlStringPipe} from '@app/_helpers/pipes/get-katex-html-string.pipe'

describe('EditorComponent', () => {
    let component: EditorComponent
    let fixture: ComponentFixture<EditorComponent>
    let componentDe: DebugElement
    let componentEl: HTMLElement

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditorComponent, GetKatexHtmlStringPipe]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(EditorComponent)
        component = fixture.componentInstance
        componentDe = fixture.debugElement
        componentEl = componentDe.nativeElement
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should render editor when not readonly', () => {
        // setInput (rather than a direct field write) marks the view dirty,
        // which Angular 22 requires for the change to be picked up by detectChanges.
        fixture.componentRef.setInput('readonly', false)
        fixture.detectChanges()
        expect(componentEl.querySelector('tui-editor')).toBeTruthy()
    })

    it('should render socket when readonly', () => {
        fixture.componentRef.setInput('readonly', true)
        fixture.detectChanges()
        expect(componentEl.querySelector('tui-editor-socket')).toBeTruthy()
    })
})
