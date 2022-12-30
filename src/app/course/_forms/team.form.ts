import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"

export interface TeamFormData {
    event_id: number
    name: string
    is_private: boolean
    who_can_join: number[]
}

export class TeamForm {
    static createTeamForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(null, [Validators.required]),
            isPrivate: new FormControl(false),
            invitedMembers: new FormControl(null),
        })
    }

    static formatTeamFormData(formData: FormGroup, eventId: number): TeamFormData{
        return {
            name: formData.get('name').value,
            is_private: formData.get('is_private').value,
            who_can_join: formData.get('invitedMembers').value,
            event_id: eventId,
            // course_registrations
            // get this user's id?
            // how do i do that--from this.authenticationService.currentUser.subscribe(user => this.user = user) ?
        }
    }
}
