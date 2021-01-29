import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '@app/_services/api/accounts/reset-password.service';
import {MessageService} from '@app/_services/message.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  FormData: FormGroup;

  constructor(private builder: FormBuilder, private password: ResetPasswordService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      old_password: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required])
    });
  }

  onSubmit(FormData) {
    console.log(FormData);
    this.password.PutPasswordReset(FormData)
      .subscribe(response => {
        this.FormData.reset();
        this.messageService.addSuccess('Your password has been updated successfully!');
        console.log(response);
      }, error => {
        console.warn(error.responseText);
        console.log({error});
      });
  }

}
