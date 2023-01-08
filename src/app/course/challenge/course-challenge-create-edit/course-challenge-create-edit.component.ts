import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {Category, CourseEvent} from "@app/_models"
import {ChallengeType} from "@app/_models/challengeType"
import {FormArray, FormControl, FormGroup} from "@angular/forms"
import {CategoryService} from "@app/_services/api/category.service"
import {Difficulty} from "@app/_models/difficulty"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {ChallengeForm} from "@app/course/_forms/challenge.form"
import {startCase} from 'lodash'

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
        })
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

    // TODO: Need support from backend
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getNumQuestionsLimit(fc: FormControl): number {
        return 100
    }

    addChallengeQuestionSet() {
        this.getChallengeQuestionSets().push(ChallengeForm.createChallengeQuestionSetForm())
    }

    removeChallengeQuestionSet(index: number): void {
        this.getChallengeQuestionSets().removeAt(index)
    }

    // TODO: Need to discuss;
    //  max= number of teams there are (but there's not point of this challenge,
    //  but we dont't know how many teams yet
    topXTeamsLimit(): number {
        return 100
    }

    isTopTeams(): boolean {
        return this.challengeForm.get('challengeType').value === 'TOP_TEAMS'
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

