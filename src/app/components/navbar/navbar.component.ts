import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  path: string;

  constructor() { }

  ngOnInit(): void {
    this.path = window.location.pathname.split('/').pop();
  }

  isTeacher(): boolean {
    return true;
  }

  isActive(navItem: string): boolean {
    return navItem === this.path;
  }
}
