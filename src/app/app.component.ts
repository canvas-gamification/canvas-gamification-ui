import {Component} from '@angular/core'
import {NavigationEnd, Router, RouterEvent} from "@angular/router"
import {PageViewService} from "@app/_services/api/page_view/page-view.service"
import {AuthenticationService} from "@app/_services/api/authentication"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'canvas-gamification-ui'
    hideFooterForLanding = true

    constructor(
        private router: Router,
        private pageViewService: PageViewService,
        private authenticationService: AuthenticationService
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof RouterEvent) {
                this.hideFooterForLanding = event.url === '/'
            }
            if (
                event instanceof NavigationEnd
                && authenticationService.currentUserValue
            ) {
                this.pageViewService.pageView({
                    url: event.url
                }).subscribe()
            }
        })
    }
}
