import {Component, Inject, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Category, EventLimit, EventType} from '@app/_models'
import {CourseEventService} from '@app/course/_services/course-event.service'
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms'
import {CourseEventForm} from "@app/course/_forms/course-event.form"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {tuiCreateTimePeriods} from "@taiga-ui/kit"
import {Difficulty} from "@app/_models/difficulty"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {CategoryService} from "@app/_services/api/category.service"

@Component({
    selector: 'app-course-event-create',
    templateUrl: './course-event-create-edit.component.html',
    styleUrls: ['./course-event-create-edit.component.scss']
})
export class CourseEventCreateEditComponent implements OnInit {
    localEventTypes: EventType[] = [['ASSIGNMENT', 'Assignment'], ["EXAM", "Exam"]]
    courseId: number
    eventId: number = null
    formData: FormGroup
    timeOptions = tuiCreateTimePeriods()
    categories: Category[]
    difficulties: Difficulty[]
    limits: EventLimit[]
    submitting = false

    constructor(
        private route: ActivatedRoute,
        private courseEventService: CourseEventService,
        private router: Router,
        private readonly categoryService: CategoryService,
        private readonly difficultyService: DifficultyService,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService
    ) {
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formData.controls
    }

    ngOnInit(): void {
        this.formData = CourseEventForm.createForm()
        // Convert to number
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        if (this.route.snapshot.paramMap.get('eventId')) {
            this.eventId = +this.route.snapshot.paramMap.get('eventId')
            this.courseEventService.getCourseEvent(this.eventId).subscribe(event => {
                this.formData = CourseEventForm.createFormWithData(event)
            })
        } else{
            this.addChallengeQuestionSet()
        }
        this.categoryService.getCategories().subscribe(
            categories => this.categories = categories
        )
        this.difficultyService.getDifficulties().subscribe(
            difficulties => this.difficulties = difficulties
        )
        this.courseEventService.getLimits().subscribe(
            limits => this.limits = limits
        )
    }

    getQuestionSets(): FormArray {
        return this.formData.get('questionSets') as FormArray
    }

    getQuestionSetFormControls(): FormControl[] {
        return this.getQuestionSets().controls as FormControl[]
    }

    getFormControl(fc: FormControl, field: string): FormControl {
        return fc.get(field) as FormControl
    }

    getNumQuestionsLimit(formControl: FormControl) {
        const category = formControl.get('category').value as number
        const difficulty = formControl.get('difficulty').value as string
        if (!category || !difficulty) {
            return 0
        }
        return this.limits.find(
            limit => limit.category === category && limit.difficulty === difficulty
        ).available_questions
    }

    addChallengeQuestionSet() {
        this.getQuestionSets().push(CourseEventForm.createQuestionSetForm())
    }

    removeChallengeQuestionSet(index: number): void {
        this.getQuestionSets().removeAt(index)
    }

    getTitle(): string {
        if (this.eventId === null) {
            return 'Create New'
        } else {
            return 'Edit'
        }
    }

    getButtonName(): string {
        if (this.eventId === null) {
            return 'Create'
        } else {
            return 'Save Changes'
        }
    }

    /**
     * Sends the course event data to the server. Sends different requests based on whether
     * the event being created is a new event or not.
     * @param formData - grabs the components formData and creates a request based on that
     */
    async submitEvent(formData: FormGroup) {
        this.submitting = true
        const ourEvent = CourseEventForm.formatFormData(formData, this.courseId, this.eventId)
        if (this.eventId) { // If this is a previously existing event
            await this.courseEventService.updateCourseEvent(ourEvent).toPromise()
            for (const questionSet of this.getQuestionSetFormControls()) {
                const questionSetFormData =
                    CourseEventForm.formatQuestionSetFormData(questionSet)
                await this.courseEventService
                    .addQuestionSet(questionSetFormData, this.eventId)
                    .toPromise()
            }
            this.notificationsService
                .show('The event has been updated successfully.', {
                    status: TuiNotification.Success
                }).subscribe()
            this.router.navigate(['course', this.courseId, 'assignments-exams']).then()
        } else { // Creating a brand-new event
            const event = await this.courseEventService.addCourseEvent(ourEvent).toPromise()
            for (const questionSet of this.getQuestionSetFormControls()) {
                const questionSetFormData =
                    CourseEventForm.formatQuestionSetFormData(questionSet)
                await this.courseEventService
                    .addQuestionSet(questionSetFormData, event.id)
                    .toPromise()
            }
            this.notificationsService
                .show('The event has been added successfully.', {
                    status: TuiNotification.Success
                }).subscribe()
            this.router.navigate(['course', this.courseId, 'assignments-exams']).then()
        }
    }
}
