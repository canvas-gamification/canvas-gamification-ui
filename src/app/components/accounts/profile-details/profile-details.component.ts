import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileDetailsService} from '@app/_services/api/accounts/profile-details.service';
import {MessageService} from '@app/_services/message.service';
import {ConsentService} from '@app/_services/api/accounts/consent.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  FormData: FormGroup;
  UserConsent: any;
  constructor(private builder: FormBuilder, private profile: ProfileDetailsService, private messageService: MessageService,
              private consentService: ConsentService) {
  }

  ngOnInit(): void {
    this.consentService.GetConsent().subscribe(consents => this.UserConsent = consents);
    console.log(this.UserConsent);
    this.FormData = this.builder.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit(FormData) {
    console.log(FormData);
    this.profile.PutProfileDetails(FormData)
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
