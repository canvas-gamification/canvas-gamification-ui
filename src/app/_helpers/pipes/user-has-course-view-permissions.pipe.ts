import {Pipe, PipeTransform} from '@angular/core';
import {Course, User} from "@app/_models";

@Pipe({
    name: 'userHasCourseViewPermissions'
})
export class UserHasCourseViewPermissionsPipe implements PipeTransform {
    transform(user: User, course: Course): boolean {
        return user.is_teacher || course.is_registered;
    }
}
