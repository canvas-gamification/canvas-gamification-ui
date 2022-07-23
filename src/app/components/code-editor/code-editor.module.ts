import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CodeEditorComponent} from './code-editor.component'

@NgModule({
    declarations: [CodeEditorComponent],
    exports: [
        CodeEditorComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CodeEditorModule {
}
