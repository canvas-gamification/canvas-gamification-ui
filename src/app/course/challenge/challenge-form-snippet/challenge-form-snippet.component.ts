import {Component, Input, OnChanges} from '@angular/core'
import {Category, CourseEvent, EventLimit} from "@app/_models"
import {ActivatedRoute, Router} from "@angular/router"
import {ChallengeForm} from "@app/course/_forms/challenge.form"
import {FormArray, FormControl, FormGroup} from "@angular/forms"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {startCase} from "lodash"
import {ChallengeType} from "@app/_models/challengeType"
import {Difficulty} from "@app/_models/difficulty"
import {CategoryService} from "@app/_services/api/category.service"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-challenge-form-snippet',
    templateUrl: './challenge-form-snippet.component.html',
    styleUrls: ['./challenge-form-snippet.component.scss']
})
export class ChallengeFormSnippetComponent implements OnChanges {
    @Input() challengeType: string
    courseId: number
    challengeForm: FormGroup
    eventId: number = null
    event: CourseEvent // The event users are editing
    localChallengeTypes: ChallengeType[]
    categories: Category[]
    difficulties: Difficulty[]
    limits: EventLimit[]

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courseEventService: CourseEventService,
        private readonly categoryService: CategoryService,
        private readonly difficultyService: DifficultyService,
        private readonly notificationsService: TuiNotificationsService,
    ) {
    }

    ngOnChanges(): void {
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        this.challengeForm = ChallengeForm.createChallengeForm()
        this.challengeForm.controls['challengeType'].setValue(this.challengeType)

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

        this.categoryService.getCategories().subscribe(categories =>
            this.categories = categories)

        this.difficultyService.getDifficulties().subscribe(difficulties =>
            this.difficulties = difficulties)

        this.courseEventService.getLimits().subscribe(limits =>
            this.limits = limits)

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

    getChallengeQuestionSets(): FormArray {
        return this.challengeForm.get('challengeQuestionSets') as FormArray
    }

    addChallengeQuestionSet() {
        this.getChallengeQuestionSets().push(ChallengeForm.createChallengeQuestionSetForm())
    }

    removeChallengeQuestionSet(index: number): void {
        this.getChallengeQuestionSets().removeAt(index)
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
