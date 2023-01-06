import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {Category, CourseEvent} from "@app/_models"
import {ChallengeType} from "@app/_models/challengeType"
import {CourseEventForm} from "@app/course/_forms/course-event.form"
import {FormArray, FormControl, FormGroup} from "@angular/forms"
import {CategoryService} from "@app/_services/api/category.service"
import {Difficulty} from "@app/_models/difficulty"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-course-challenge-create-edit',
    templateUrl: './course-challenge-create-edit.component.html',
    styleUrls: ['./course-challenge-create-edit.component.scss']
})
export class CourseChallengeCreateEditComponent implements OnInit {
    courseId: number
    eventId: number = null
    event: CourseEvent
    localChallengeTypes: ChallengeType[]
    challengeForm: FormGroup
    categories: Category[]
    difficulties: Difficulty[]
    limits: number[]

    list = [{id: 1, name: 'name A'}, {id: 2, name: 'name B'}, {id: 3, name: 'name C'}]

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courseEventService: CourseEventService,
        private readonly categoryService: CategoryService,
        private readonly difficultyService: DifficultyService,
        private readonly notificationsService: TuiNotificationsService,
    ) {
    }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        this.challengeForm = CourseEventForm.createChallengeForm()

        if (this.route.snapshot.paramMap.get('eventId')) { // For editing existing challenge, grab the eventId
            this.eventId = +this.route.snapshot.paramMap.get('eventId')
            this.courseEventService.getCourseEvent(this.eventId).subscribe(event => {
                this.event = event
                this.challengeForm = CourseEventForm.createChallengeFormWithData(this.event)
            })
        }

        this.courseEventService.getChallengeTypes().subscribe(
            response => this.localChallengeTypes = response
        )
        this.categoryService.getCategories().subscribe(
            categories => this.categories = categories
        )
        this.difficultyService.getDifficulties().subscribe(
            difficulties => this.difficulties = difficulties
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

    //TODO: Need support from backend
    getNumQuestionsLimit(fc: FormControl): number {
        return 100
    }

    addChallengeQuestionSet() {
        this.getChallengeQuestionSets().push(CourseEventForm.createChallengeQuestionSetForm())
    }

    removeChallengeQuestionSet(index: number): void {
        this.getChallengeQuestionSets().removeAt(index)
    }

    //TODO: Need to discuss; max= number of teams there are (but there's not point of this challenge, but we dont't know how many teams yet
    topXTeamsLimit(): number {
        return 5
    }

    isTopTeams(): boolean {
        return this.challengeForm.get('challengeType').value === 'TOP_TEAMS'
    }

    getMaxTeamSize(): number {
        return this.challengeForm.get('maxTeamSize').value
    }

    async onSubmit() {
        //TODO: what about the questions in each challenge?
        if (this.eventId) {
            const challengeData = CourseEventForm.formatChallengeFormData(
                this.challengeForm,
                this.courseId,
            )
            this.courseEventService.updateChallenge(challengeData, this.eventId).subscribe(() => {
                this.notificationsService
                    .show('The challenge has been updated successfully.', {
                        status: TuiNotification.Success
                    }).subscribe()
                this.router.navigate(
                    ['course', this.courseId, 'challenge']
                ).then()
            })
        } else {
            const challengeData = CourseEventForm.formatChallengeFormData(
                this.challengeForm,
                this.courseId
            )
            const event = await this.courseEventService.addCourseEvent(challengeData).toPromise()

            for (const questionSet of this.getChallengeQuestionSetFormControls()) {
                const questionSetFormData =
                    CourseEventForm.formatChallengeQuestionSetFormData(questionSet)
                await this.courseEventService.
                    addQuestionSet(questionSetFormData, event.id).toPromise()
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

