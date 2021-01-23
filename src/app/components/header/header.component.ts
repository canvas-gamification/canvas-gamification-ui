import { Component, OnInit } from "@angular/core";
import { User } from "@app/_models";
import { AuthenticationService } from "@app/_services/api/authentication";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  user: User;
  path: String;

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.path = window.location.pathname.split("/").pop();
  }

  isTeacher(): boolean {
    return true;
  }

  isActive(navItem: String): boolean {
    return navItem === this.path;
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
  