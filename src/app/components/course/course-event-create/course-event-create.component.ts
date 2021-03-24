import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CourseEventService } from '@app/_services/api/course-event.service';
import { interval, Subscription } from 'rxjs';
// TODO: Make changes to import properly from @app/_models for both
// import { EventInfo, UpdateEvent} from '@app/_models';
import { EventInfo } from '@app/_models/event_info';
import { UpdateEvent } from '@app/_models/update_event';

@Component({
    selector: 'app-course-event-create',
    templateUrl: './course-event-create.component.html',
    styleUrls: ['./course-event-create.component.scss']
})
export class CourseEventCreateComponent implements OnInit {

    courseId: number;
    minDateISO: string;
    subscription: Subscription;
    eventId: number;

    // Two way bound variables on inputs
    eventName: string;
    eventType: string;
    countsForTokens: string;
    startTime: Date;
    endTime: Date;

  constructor(private route: ActivatedRoute, private CourseEventService: CourseEventService) { }
  
  // TODO: Reroute if you try and navigate to a page like this without clicking the button?
  ngOnInit(): void {
    this.getMinDate()
    // Convert to number
    this.courseId = +this.route.snapshot.paramMap.get("courseId");
    if (this.route.snapshot.paramMap.get("eventId")){
      this.eventId = +this.route.snapshot.paramMap.get("eventId");
      console.log("This is a previously existing event of id");
    }
    const source = interval(10000);
    this.subscription = source.subscribe(() => this.getMinDate());
  }
  
  // TODO: Set the mindate to a higher number?
  getMinDate(): void{
    let d = new Date();
    this.minDateISO = d.toISOString().split(".")[0];

  }
  //Hey

  submitEvent(): void{
    // Create the object here with the two way bound variables
    let localCountsForTokens = false;
    if(this.countsForTokens == "on"){
      localCountsForTokens = true;
    }
    const ourEvent: EventInfo = {
      name: this.eventName,
      type: this.eventType,
      count_for_tokens: localCountsForTokens,
      start_date: new Date(this.startTime),
      end_date: new Date(this.endTime),
      course: this.courseId
    }

    if(this.eventId){ // If this is a previously existing event
      const ourUpdateEvent: UpdateEvent = {
        id: this.eventId,
        event: ourEvent
      };
      this.CourseEventService.updateCourseEvent(ourUpdateEvent);
    }
    else{ // Creating a brand new event
      console.log("We got here")
      this.CourseEventService.addCourseEvent(ourEvent).subscribe();
    }
  }

}
