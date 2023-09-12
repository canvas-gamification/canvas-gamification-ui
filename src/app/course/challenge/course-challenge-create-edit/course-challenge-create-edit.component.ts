import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {Category, CourseEvent, EventLimit} from "@app/_models"
import {ChallengeType} from "@app/_models/challengeType"
import {FormArray, FormControl, FormGroup} from "@angular/forms"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {ChallengeForm} from "@app/course/_forms/challenge.form"
import {startCase} from 'lodash'
import {Difficulty} from "@app/_models/difficulty"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {CategoryService} from "@app/_services/api/category.service"
import {CourseService} from "@app/course/_services/course.service"

@Component({
    selector: 'app-course-challenge-create-edit',
    templateUrl: './course-challenge-create-edit.component.html',
    styleUrls: ['./course-challenge-create-edit.component.scss']
})
export class CourseChallengeCreateEditComponent implements OnInit {
    courseId: number
    eventId: number = null
    event: CourseEvent // The event users are editing
    localChallengeTypes: ChallengeType[]
    challengeForm: FormGroup
    categories: Category[]
    difficulties: Difficulty[]
    limits: EventLimit[]
    events: CourseEvent[] // All the events in this course
    search: string
    selectedChallengeType: string = null

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courseEventService: CourseEventService,
        private readonly categoryService: CategoryService,
        private readonly difficultyService: DifficultyService,
        private readonly notificationsService: TuiNotificationsService,
        private courseService: CourseService,
    ) {
    }

    setSelectedChallengeType(selectedChallengeType: string): void {
        this.selectedChallengeType = selectedChallengeType
    }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        this.courseService.getCourse(this.courseId).subscribe( course => {
            this.events = course.events
        })
        this.challengeForm = ChallengeForm.createChallengeForm()

        if (this.route.snapshot.paramMap.get('eventId')) {
            this.eventId = +this.route.snapshot.paramMap.get('eventId')
            this.courseEventService.getCourseEvent(this.eventId).subscribe(event => {
                this.event = event
                this.challengeForm = ChallengeForm.createChallengeFormWithData(this.event)
            })
        }

        this.courseEventService.getChallengeTypes().subscribe(response => {
            this.localChallengeTypes = response.map(array => [
                array[0],
                startCase(array[1].toLowerCase().replace('_', ' '))
            ])
            this.localChallengeTypes.push(['CONSISTENCY', 'Consistency'])
        })
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

    getChallengeQuestionSets(): FormArray {
        return this.challengeForm.get('challengeQuestionSets') as FormArray
    }

    getChallengeQuestionSetFormControls(): FormControl[] {
        return this.getChallengeQuestionSets().controls as FormControl[]
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
        this.getChallengeQuestionSets().push(ChallengeForm.createChallengeQuestionSetForm())
    }

    removeChallengeQuestionSet(index: number): void {
        this.getChallengeQuestionSets().removeAt(index)
    }

    // TODO: Need to discuss;
    //  max= number of teams there are (but there's not point of this challenge,
    //  but we don't know how many teams yet
    topXTeamsLimit(): number {
        return 100
    }

    isTopTeams(): boolean {
        return this.challengeForm.get('challengeType').value === 'TOP_TEAMS'
    }

    isConsistency(): boolean {
        return this.challengeForm.get('challengeType').value === 'CONSISTENCY'
    }

    stringify(eventInCourse: CourseEvent): string {
        return eventInCourse.name
    }

    onSearchChange(searchQuery: string | null): void {
        this.search = searchQuery
    }

    getCourseEvents(): CourseEvent[] {
        if(!this.search)
            return this.events
        return this.events.filter(event => event.name.includes(this.search) )
    }

    async onSubmit() {
        const challengeData = ChallengeForm.formatChallengeFormData(
            this.challengeForm,
            this.courseId,
            this.eventId
        )
        if (this.eventId) {
            await this.courseEventService.updateCourseEvent(challengeData).toPromise()
            for (const questionSet of this.getChallengeQuestionSetFormControls()) {
                const questionSetFormData =
                    ChallengeForm.formatChallengeQuestionSetFormData(questionSet)
                await this.courseEventService
                    .addQuestionSet(questionSetFormData, this.eventId)
                    .toPromise()
            }
            this.notificationsService
                .show('The challenge has been updated successfully.', {
                    status: TuiNotification.Success
                }).subscribe()
            this.router.navigate(
                ['course', this.courseId, 'challenge']
            ).then()

        } else {
            const event = await this.courseEventService.addCourseEvent(challengeData).toPromise()

            for (const questionSet of this.getChallengeQuestionSetFormControls()) {
                const questionSetFormData =
                    ChallengeForm.formatChallengeQuestionSetFormData(questionSet)
                await this.courseEventService
                    .addQuestionSet(questionSetFormData, event.id)
                    .toPromise()
            }

            this.notificationsService
                .show('The challenge has been created successfully.', {
                    status: TuiNotification.Success
                }).subscribe()

            this.router.navigate(
                ['course', this.courseId, 'challenge']
            ).then()
        }
    }
}

