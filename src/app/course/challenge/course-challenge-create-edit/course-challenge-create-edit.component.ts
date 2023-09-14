import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {ChallengeType} from "@app/_models/challengeType"
import {startCase} from 'lodash'


@Component({
    selector: 'app-course-challenge-create-edit',
    templateUrl: './course-challenge-create-edit.component.html',
    styleUrls: ['./course-challenge-create-edit.component.scss']
})
export class CourseChallengeCreateEditComponent implements OnInit {
    eventId: number = null //used for the navigation in the parent component
    localChallengeTypes: ChallengeType[] //used to display the cards
    selectedChallengeType: string = null //cards will set the types

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courseEventService: CourseEventService,
    ) {
    }

    ngOnInit(): void {
        this.courseEventService.getChallengeTypes().subscribe(response => {
            this.localChallengeTypes = response.map(array => [
                array[0],
                startCase(array[1].toLowerCase().replace('_', ' '))
            ])
            this.localChallengeTypes.push(['CONSISTENCY', 'Consistency'])
        })
    }

    setSelectedChallengeType(selectedChallengeType: string): void {
        this.selectedChallengeType = selectedChallengeType
    }
}
