import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsentService} from '@app/_services/api/accounts/consent.service';
import {MessageService} from '@app/_services/message.service';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-consent-form',
  templateUrl: './consent-form.component.html',
  styleUrls: ['./consent-form.component.scss']
})
export class ConsentFormComponent implements OnInit {
  FormData: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private builder: FormBuilder, private consent: ConsentService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      consent: true,
      legal_first_name: new FormControl('', [Validators.required]),
      legal_last_name: new FormControl('', [Validators.required]),
      student_number: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
  }

  onSubmit(FormData) {
    console.log(FormData);
    this.consent.PostConsent(FormData)
      .subscribe(response => {
        this.router.navigate(['../profile'], {relativeTo: this.route});
        this.messageService.addSuccess('You have successfully consented!');
        console.log(response);
      }, error => {
        console.warn(error.responseText);
        console.log({error});
      });
  }

}
