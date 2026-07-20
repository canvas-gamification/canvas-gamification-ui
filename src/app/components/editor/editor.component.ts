import {Component, Injector, Input, OnDestroy} from '@angular/core'
import {defaultEditorExtensions, TUI_EDITOR_EXTENSIONS} from '@tinkoff/tui-editor'
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
import {TuiDestroyService} from '@taiga-ui/cdk'
import {createInlineMathEditorExtension} from '@app/components/editor/inline-math/inline-math.extension'

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    providers: [
        TuiDestroyService,
        {
            provide: TUI_EDITOR_EXTENSIONS,
            deps: [Injector],
            useFactory: (injector: Injector) => [
                ...defaultEditorExtensions,
                createInlineMathEditorExtension(injector)
            ]
        },
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
    ]
})
export class EditorComponent implements ControlValueAccessor, Validator, OnDestroy {
    @Input() exampleText = ''
    @Input() placeHolder = ''
    @Input() readonly = false

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
        isDisabled ? this.editor.disable() : this.editor.enable()
    }

    writeValue(value: string): void {
        this.editor.setValue(value)
    }

    validate(): ValidationErrors | null {
        return this.editor.errors
    }
}
