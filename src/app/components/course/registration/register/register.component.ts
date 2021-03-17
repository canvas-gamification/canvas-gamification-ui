import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false, showError: true}
  }]
})
export class RegisterComponent implements OnInit {
  nameForm: FormGroup;
  studentNumberForm: FormGroup;
  courseId: number;
  needsStudentNumber: boolean;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.params.subscribe(params => {
      this.courseId = params.courseId;
    });
    this.needsStudentNumber = true;
  }

  ngOnInit(): void {
    this.nameForm = this.formBuilder.group({
      nameControl: ['', Validators.required]
    });
    this.studentNumberForm = this.formBuilder.group({
      studentNumberControl: ['', Validators.required]
    });
  }
}
