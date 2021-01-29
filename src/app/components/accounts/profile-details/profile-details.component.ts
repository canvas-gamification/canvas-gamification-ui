import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileDetailsService} from '@app/_services/api/accounts/profile-details.service';
import {MessageService} from '@app/_services/message.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  FormData: FormGroup;

  constructor(private builder: FormBuilder, private profile: ProfileDetailsService, private messageService: MessageService) {
  }

  ngOnInit(): void {
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
