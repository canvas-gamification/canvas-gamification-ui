import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsentService} from '@app/_services/api/accounts/consent.service';
import {MessageService} from '@app/_services/message.service';

@Component({
  selector: 'app-consent-form',
  templateUrl: './consent-form.component.html',
  styleUrls: ['./consent-form.component.css']
})
export class ConsentFormComponent implements OnInit {
  FormData: FormGroup;

  constructor(private builder: FormBuilder, private consent: ConsentService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      user: 1,
      consent: true,
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      studentNumber: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
  }

  onSubmit(FormData) {
    console.log(FormData);
    this.consent.PostConsent(FormData)
      .subscribe(response => {
        this.messageService.addSuccess('You have successfully consented!');
        console.log(response);
      }, error => {
        console.warn(error.responseText);
        console.log({error});
      });
  }

}
