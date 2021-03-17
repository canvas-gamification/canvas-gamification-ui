import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-course-event-create',
  templateUrl: './course-event-create.component.html',
  styleUrls: ['./course-event-create.component.scss']
})
export class CourseEventCreateComponent implements OnInit {


  courseId: number;
  minDateISO: string;

  constructor(private route: ActivatedRoute) { }
  
  // TODO: Reroute if you try and navigate to a page like this without clicking the button?
  ngOnInit(): void {
    // Convert to number
    this.courseId = +this.route.snapshot.paramMap.get("courseId");
    this.minDateISO = this.getMinDate();
    console.log(this.minDateISO)
  }
  
  getMinDate(): string{
    let d = new Date()
    return d.toISOString().split(".")[0];
  }

}
