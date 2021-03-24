import {Component, Input, OnInit} from '@angular/core';
import {Question, UQJ, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course-question-snippet',
  templateUrl: './course-question-snippet.component.html',
  styleUrls: ['./course-question-snippet.component.scss']
})
export class CourseQuestionSnippetComponent implements OnInit {
  @Input() questions: Question[];
  @Input() uqjs: UQJ[]; // This will need to be commented out
  user: User;

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get("eventId")){ // We are opening an event
      // uqjs = some api call
    }
  }

  getStatus(uqj: UQJ): string {
    if (!uqj.question.event || !uqj.question.event.is_exam) { // If the event exists
      return uqj.status;
    }
    if (uqj.question.event.is_exam && uqj.num_attempts > 0) {
      return 'Submitted';
    } else if (uqj.question.event.is_exam) {
      return 'Not submitted';
    }
  }

  // TODO: FIX THIS FUNCTION
  isStudent() {
    return false;
    // return this.user.is_student;
  }

  isTeacher() {
    return false;
    // return this.user.is_teacher;
  }
}
