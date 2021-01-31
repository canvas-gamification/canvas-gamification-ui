import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '@environments/environment';
import {RegisterService} from '@app/_services/api/accounts/register.service';
import {MessageService} from '@app/_services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  FormData: FormGroup;
  siteKey: string = environment.siteKey;

  constructor(private builder: FormBuilder, private register: RegisterService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password_confirmation: new FormControl(null, [Validators.required]),
      recaptcha_key: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(FormData) {
    console.log(FormData);
    this.register.PostRegistration(FormData)
      .subscribe(response => {
        this.FormData.reset();
        this.messageService.addSuccess('Your profile has been updated successfully!');
        console.log(response);
      }, error => {
        console.warn(error.responseText);
        console.log({error});
      });
  }

}
