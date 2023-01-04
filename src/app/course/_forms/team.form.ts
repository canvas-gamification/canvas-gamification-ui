import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {Team} from "@app/_models/team"

export interface TeamFormData {
    event: number
    name: string
    is_private: boolean
    who_can_join?: number[]
}

export class TeamForm {
    static createTeamForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(null, [Validators.required]),
            isPrivate: new FormControl(false, [Validators.required]),
            invitedMembers: new FormControl([]),
        })
    }

    static createTeamFormTeam(team: Team): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(team.name, [Validators.required]),
            isPrivate: new FormControl(team.is_private, [Validators.required]),
            invitedMembers: new FormControl(team.who_can_join), //array of ids
        })
    }

    /**
     * Returns the formatted form data ready to be sent to the backend
     * @param formData - the data to be formatted, a FormGroup object
     * @param eventId - the ID of the event that the team belongs to
     * @param myCourseRegId - the team creator's course registrations id
     */
    static formatTeamFormData(formData: FormGroup, eventId: number): TeamFormData{
        return {
            event: eventId,
            name: formData.get('name').value,
            is_private: formData.get('is_private').value,
            //add null=True to the team model in the backend?
            who_can_join: formData.get('invitedMembers').value,
        }
    }
}
