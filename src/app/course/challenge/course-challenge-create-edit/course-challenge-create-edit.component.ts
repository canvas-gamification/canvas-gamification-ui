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
    filter: ChallengeType = null //cards will set the types
    challengeTypeDes = [
        ['Quota', 'Teams earn tokens from every question solved. Each member gets the number of tokens equivalent to team tokens when the challenge ends. This challenge encourages users to do more questions.'],
        ['Top Team', 'Teams earn tokens by staying on the top x teams of this challenge. i.g. Top 5 teams will get tokens. The number "5" is changable in the following form.  Each member gets the number of tokens equivalent to team tokens as the challenge ends. This challenge encourages users to work in teams.'],
        ['Consistency', 'Users earn tokens from finishing all the challenges listed in the consistency challenge. The consistency challenge encourages users\' good study habit.']
    ]

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

    setFilter(localChallengeType: ChallengeType): void {
        this.filter = localChallengeType
    }
}
