import {Component, OnInit} from '@angular/core'
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser'
import {User} from '@app/_models'
import {AuthenticationService} from '@app/_services/api/authentication'

@Component({
    selector: 'app-community',
    templateUrl: './community.component.html',
    styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
    user: User
    communityUrl: SafeResourceUrl

    constructor(
      private readonly authenticationService: AuthenticationService,
      private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.user = this.authenticationService.currentUserValue
        const redirectUrl = "/?layout=basic"
        const jwt = this.user.community_jwt
        this.communityUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://gamification.bettermode.io/api/auth/sso?redirect_uri=${redirectUrl}&jwt=${jwt}`
        )

    }
}
