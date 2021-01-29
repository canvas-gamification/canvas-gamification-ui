import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  FormData: FormGroup;
  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({

    });
  }

}
