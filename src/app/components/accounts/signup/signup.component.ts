import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  FormData: FormGroup;
  siteKey: string = environment.siteKey;

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      recaptcha_key: new FormControl(null, [Validators.required])
    });
  }

}
