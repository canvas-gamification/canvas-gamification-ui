import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-name',
  templateUrl: './register-name.component.html',
  styleUrls: ['./register-name.component.scss']
})
export class RegisterNameComponent implements OnInit {
  guessedName: string
  courseId: number
  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.courseId = params.courseId;
    })
  }

  ngOnInit(): void {
    this.guessedName = "bob"
    console.log(this.courseId)
  }

}
