import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import {Team} from "@app/_models/team"
import {CourseRegistration} from "@app/_models"

export interface TeamFormData {
    event_id: number
    name: string
    is_private: boolean
    who_can_join?: string
}

export class TeamForm {
    static createTeamForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            name: new UntypedFormControl(null, [Validators.required]),
            isPrivate: new UntypedFormControl(false, [Validators.required]),
            invitedMembers: new UntypedFormControl(null),
        })
    }

    static createTeamFormTeam(
        team: Team,
        courseRegistrations: CourseRegistration[]
    ): UntypedFormGroup {
        const invitedMembers = courseRegistrations.filter(reg => team.who_can_join.includes(reg.id))
        const builder = new UntypedFormBuilder()
        return builder.group({
            name: new UntypedFormControl(team.name, [Validators.required]),
            isPrivate: new UntypedFormControl(team.is_private, [Validators.required]),
            invitedMembers: new UntypedFormControl(invitedMembers),
        })
    }

    /**
     * Returns the formatted form data ready to be sent to the backend
     * @param formData - the data to be formatted, a FormGroup object
     * @param eventId - the ID of the event that the team belongs to
     */
    static formatTeamFormData(formData: UntypedFormGroup, eventId: number): TeamFormData{
        return {
            event_id: eventId,
            name: formData.get('name').value,
            is_private: formData.get('isPrivate').value,
            who_can_join: formData.get('invitedMembers').value?.map(reg => reg.id),
        }
    }
}
