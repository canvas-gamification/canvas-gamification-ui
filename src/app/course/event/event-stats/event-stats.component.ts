import {Component, OnInit} from '@angular/core'
import {CourseEventService} from "@app/course/_services/course-event.service"
import {EventStats} from "@app/_models/event/event_stats"
import {ActivatedRoute} from "@angular/router"
import {isEmpty} from "lodash"

@Component({
    selector: 'app-event-stats',
    templateUrl: './event-stats.component.html',
    styleUrls: ['./event-stats.component.scss']
})
export class EventStatsComponent implements OnInit {

    eventId: number
    stats: EventStats

    constructor(
        private courseEventService: CourseEventService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.eventId = this.route.snapshot.params.eventId
        this.courseEventService.getStats(this.eventId).subscribe(stats => this.stats = stats)
    }

    isEmpty(obj: unknown) {
        return isEmpty(obj)
    }

    originalOrder() {
        return 0
    }
}
