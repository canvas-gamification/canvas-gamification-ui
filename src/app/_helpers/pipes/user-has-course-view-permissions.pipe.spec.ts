import {UserHasCourseViewPermissionsPipe} from './user-has-course-view-permissions.pipe'
import {MOCK_COURSE1, MOCK_USER_STUDENT, MOCK_USER_TEACHER} from "@app/course/_test/mock"

describe('CourseHasViewPermissionsPipe', () => {
    it('create an instance', () => {
        const pipe = new UserHasCourseViewPermissionsPipe()
        expect(pipe).toBeTruthy()
    })

    it('should have view permissions', () => {
        const pipe = new UserHasCourseViewPermissionsPipe()
        const hasViewPermission = pipe.transform(MOCK_USER_TEACHER, MOCK_COURSE1)
        expect(hasViewPermission).toBeTrue()
    })

    it('should not have view permissions', () => {
        const pipe = new UserHasCourseViewPermissionsPipe()
        const hasViewPermission = pipe.transform(MOCK_USER_STUDENT, MOCK_COURSE1)
        expect(hasViewPermission).toBeTrue()
    })
})
