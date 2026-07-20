import { TuiCardLarge } from "@taiga-ui/layout";
import { TuiEditor, TuiEditorSocket } from "@taiga-ui/editor";
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EditorComponent} from './editor.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {KatexToolComponent} from './katex-tool/katex-tool.component'
import { TuiDropdown, TuiButton, TuiInput } from '@taiga-ui/core'
import { TuiActiveZone, TuiAutoFocus } from '@taiga-ui/cdk'
import { TuiInputInline } from '@taiga-ui/kit'
import {InlineMathComponent} from './inline-math/inline-math.component'
import {PipesModule} from '@app/_helpers/pipes/pipes.module'

@NgModule({
    declarations: [
        EditorComponent,
        InlineMathComponent,
        KatexToolComponent
    ],
    exports: [
        EditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        TuiActiveZone,
        TuiAutoFocus,
        TuiButton,
        ...TuiDropdown,
        TuiEditor, TuiEditorSocket,
        TuiInputInline,
        ...TuiInput,
        TuiCardLarge
    ]
})
export class EditorModule {
}
