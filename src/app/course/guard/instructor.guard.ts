import {Injectable} from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate, Router,
} from '@angular/router'
import {AuthenticationService} from "@app/_services/api/authentication"
import {Course, User} from "@app/_models"
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

    canActivate(
        next: ActivatedRouteSnapshot) {
        console.log(next.parent.params.courseId)
        const currentUser: User = this.authenticationService.currentUserValue
        const courseId: number = next.parent.params.courseId
        let currentCourse: Course = null
        return this.courseService.getCourse(courseId).pipe(
            map(course => {
                currentCourse = course
                const isInstructor: boolean = currentCourse.instructor === currentUser.id
                if (isInstructor) {
                    return true
                } else {
                    this.router.navigate(['/course', courseId, 'tokens', currentUser.id]).then()
                    return false
                }
            })
        )
    }
}
