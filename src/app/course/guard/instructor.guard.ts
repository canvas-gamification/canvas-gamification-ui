import {Injectable} from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate, Router,
} from '@angular/router'
import {AuthenticationService} from "@app/_services/api/authentication"
import {User} from "@app/_models"
import {CourseService} from "@app/course/_services/course.service"
import {map} from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class InstructorGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private courseService: CourseService,
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot) {
        const currentUser: User = this.authenticationService.currentUserValue
        const courseId: number = next.parent.params.courseId
        return this.courseService.getCourse(courseId).pipe(
            map(course => {
                if (course.has_create_event_permission) {
                    return true
                } else {
                    this.router.navigate(['/course', courseId, 'tokens', currentUser.id]).then()
                    return false
                }
            })
        )
    }
}
