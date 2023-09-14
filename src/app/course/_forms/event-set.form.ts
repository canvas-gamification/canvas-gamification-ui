import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {EventSet} from "@app/_models/event-set"

export interface EventSetFormData {
    name: string
    course: number
    events: number[]
    tokens: number
}

export class EventSetForm {
    static createEventSetForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(null, [Validators.required]),
            tokens: new FormControl(null, [Validators.required]),
            events: new FormControl(null, [Validators.required]),
        })
    }

    static createEventSetFormWithData(eventSet: EventSet): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(eventSet.name, [Validators.required]),
            tokens: new FormControl(eventSet.tokens, [Validators.required]),
            event_ids: new FormControl(eventSet.event_ids, [Validators.required])
        })
    }

    static formatEventSetFormData(formData: FormGroup, courseId: number): EventSetFormData {
        return {
            name: formData.get('name').value,
            course: courseId,
            events: formData.get('events').value?.map(event => event.id),
            tokens: formData.get('tokens').value
        }
    }
}
