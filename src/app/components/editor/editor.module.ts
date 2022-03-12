import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from './editor.component';
import {TuiEditorModule, TuiEditorNewModule, TuiEditorSocketModule} from '@taiga-ui/addon-editor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KatexToolComponent} from './katex-tool/katex-tool.component';
import {TuiButtonModule, TuiDropdownControllerModule, TuiHostedDropdownModule} from '@taiga-ui/core';
import {TuiActiveZoneModule} from '@taiga-ui/cdk';
import {TuiInputModule} from '@taiga-ui/kit';
import {InlineMathComponent} from './inline-math/inline-math.component';

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
        ReactiveFormsModule,
        TuiActiveZoneModule,
        TuiButtonModule,
        TuiDropdownControllerModule,
        TuiEditorModule,
        TuiEditorNewModule,
        TuiEditorSocketModule,
        TuiHostedDropdownModule,
        TuiInputModule
    ]
})
export class EditorModule {
}
