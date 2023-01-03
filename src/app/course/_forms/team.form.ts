import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {Team} from "@app/_models/team"

export interface TeamFormData {
    event: number
    name: string
    is_private: boolean
    who_can_join?: number[]
    course_registrations: number[] //an array of course_reg_id(s)
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

    static createTeamFormTeam(team: Team): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(team.name, [Validators.required]),
            isPrivate: new FormControl(team.is_private),
            invitedMembers: new FormControl(team.who_can_join), //array of ids
            members: new FormControl(team.course_registrations), //array of ids
        })
    }

    /**
     * Returns the formatted form data ready to be sent to the backend
     * @param formData - the data to be formatted, a FormGroup object
     * @param eventId - the ID of the event that the team belongs to
     * @param myCourseRegId - the team creator's course registrations id
     */
    static formatTeamFormData(formData: FormGroup, eventId: number, myCourseRegId: number): TeamFormData{

        //Form is edited when formData.get('members').value === true; Form creation will always have 1 courseRegs which is the team creator.
        if(formData.get('is_private').value)
            if(formData.get('invitedMembers').value)//(is_private & has ppl invited)
                return {
                    event: eventId,
                    name: formData.get('name').value,
                    is_private: formData.get('is_private').value,
                    // who_can_join: TeamForm.includeMySelf(myCourseRegId, formData.get('invitedMembers').value.map(courseReg => courseReg.id)),
                    course_registrations: formData.get('members').value? formData.get('members').value.map(courseReg => courseReg.id): [myCourseRegId],
                }
            else //(is_private & no other ppl invited) don't need who_can_join (once I leave the team, team is deleted)
                return {
                    event: eventId,
                    name: formData.get('name').value,
                    is_private: formData.get('is_private').value,
                    course_registrations: [myCourseRegId],
                }
        else //not private
            return {
                event: eventId,
                name: formData.get('name').value,
                is_private: formData.get('is_private').value,
                course_registrations: formData.get('members').value? formData.get('invitedMembers').value.map(courseReg => courseReg.id): [myCourseRegId],
            }
    }

    private static includeMySelf(myCourseRegId: number, invitedCourseRegIds: number[]){
        if (invitedCourseRegIds.includes(myCourseRegId))
            return invitedCourseRegIds
        return invitedCourseRegIds.push(myCourseRegId)
    }
}
