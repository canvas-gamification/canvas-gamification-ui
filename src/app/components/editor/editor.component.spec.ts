import {ComponentFixture, TestBed} from '@angular/core/testing'

import {EditorComponent} from './editor.component'
import {DebugElement} from '@angular/core'

describe('EditorComponent', () => {
    let component: EditorComponent
    let fixture: ComponentFixture<EditorComponent>
    let componentDe: DebugElement
    let componentEl: HTMLElement

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditorComponent]
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
        component.readonly = false
        fixture.detectChanges()
        expect(componentEl.querySelector('tui-editor')).toBeTruthy()
    })

    it('should render socket when readonly', () => {
        component.readonly = true
        fixture.detectChanges()
        expect(componentEl.querySelector('tui-editor-socket')).toBeTruthy()
    })
})
