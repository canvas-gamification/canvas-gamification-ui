import {provideTuiEditor, TuiEditorTool, type TuiEditorToolType} from "@taiga-ui/editor"
import {Component, Input, OnDestroy, ChangeDetectionStrategy} from '@angular/core'
import {
    ControlValueAccessor,
    UntypedFormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
    Validators
} from '@angular/forms'
import {Subscription} from 'rxjs'
import {
    createInlineMathEditorExtension
} from '@app/components/editor/inline-math/inline-math.extension'

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    providers: [
        provideTuiEditor(
            {
                image: true,
                iframe: true,
                video: true,
                source: true,
                audio: true,
                details: true,
                detailsSummary: true,
                detailsContent: true,
            },
            async injector => createInlineMathEditorExtension(injector),
        ),
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: EditorComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: EditorComponent
        }
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EditorComponent implements ControlValueAccessor, Validator, OnDestroy {
    @Input() exampleText = ''
    @Input() placeHolder = ''
    @Input() readonly = false

    // Tool set matching the old (Taiga 2) default editor toolbar
    readonly tools: TuiEditorToolType[] = [
        TuiEditorTool.Undo,
        TuiEditorTool.Size,
        TuiEditorTool.Bold,
        TuiEditorTool.Italic,
        TuiEditorTool.Underline,
        TuiEditorTool.Align,
        TuiEditorTool.List,
        TuiEditorTool.Quote,
        TuiEditorTool.Link,
        TuiEditorTool.Color,
        TuiEditorTool.Hilite,
        TuiEditorTool.Clear,
        TuiEditorTool.Strikethrough,
        TuiEditorTool.Code,
        TuiEditorTool.Img,
        TuiEditorTool.HR,
        TuiEditorTool.Sup,
        TuiEditorTool.Sub,
        TuiEditorTool.Table,
    ]

    editor = new UntypedFormControl('', [Validators.required])
    onChangeSubs: Subscription[] = []

    onTouched = (): void => {
        return
    }

    /**
     * Functions required to treat this component as a form control
     */
    ngOnDestroy(): void {
        this.onChangeSubs.forEach(sub => sub.unsubscribe())
    }

    registerOnChange(onChange: never): void {
        const sub = this.editor.valueChanges.subscribe(onChange)
        this.onChangeSubs.push(sub)
    }

    registerOnTouched(onTouched: () => unknown): void {
        this.onTouched = onTouched
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.editor.disable()
        } else {
            this.editor.enable()
        }
    }

    writeValue(value: string): void {
        this.editor.setValue(value)
    }

    validate(): ValidationErrors | null {
        return this.editor.errors
    }
}
