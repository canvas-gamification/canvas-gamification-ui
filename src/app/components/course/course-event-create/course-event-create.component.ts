import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-course-event-create',
    templateUrl: './course-event-create.component.html',
    styleUrls: ['./course-event-create.component.scss']
})
export class CourseEventCreateComponent implements OnInit {

    courseId: number;
    minDateISO: string;
    subscription: Subscription;

  constructor(private route: ActivatedRoute) { }
  
  // TODO: Reroute if you try and navigate to a page like this without clicking the button?
  ngOnInit(): void {
    this.getMinDate()
    // Convert to number
    this.courseId = +this.route.snapshot.paramMap.get("courseId");
    const source = interval(10000);
    this.subscription = source.subscribe(() => this.getMinDate());
  }
  
  // TODO: Set the mindate to a higher number?
  getMinDate(): void{
    let d = new Date();
    this.minDateISO = d.toISOString().split(".")[0];

  }

}
