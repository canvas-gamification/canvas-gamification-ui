import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  FormData: FormGroup;
  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({

    });
  }

}
