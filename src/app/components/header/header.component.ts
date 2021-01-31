import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {User} from '@app/_models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
