import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EditorComponent} from './editor.component'
import {TuiEditorModule, TuiEditorNewModule, TuiEditorSocketModule} from '@taiga-ui/addon-editor'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {KatexToolComponent} from './katex-tool/katex-tool.component'
import {
    TuiButtonModule,
    TuiDropdownControllerModule,
    TuiDropdownModule,
    TuiHostedDropdownModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core'
import {TuiActiveZoneModule, TuiAutoFocusModule} from '@taiga-ui/cdk'
import {TuiDropdownSelectionModule, TuiInputInlineModule, TuiInputModule, TuiIslandModule} from '@taiga-ui/kit'
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
        TuiActiveZoneModule,
        TuiAutoFocusModule,
        TuiButtonModule,
        TuiDropdownControllerModule,
        TuiDropdownModule,
        TuiDropdownSelectionModule,
        TuiEditorModule,
        TuiEditorNewModule,
        TuiEditorSocketModule,
        TuiHostedDropdownModule,
        TuiInputInlineModule,
        TuiInputModule,
        TuiIslandModule,
        TuiTextfieldControllerModule
    ]
})
export class EditorModule {
}
