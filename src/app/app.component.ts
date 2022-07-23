import {Component} from '@angular/core'
import {Router, RouterEvent} from "@angular/router"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'canvas-gamification-ui'
    hideFooterForLanding = true

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof RouterEvent) {
                this.hideFooterForLanding = event.url === '/'
            }
        })
    }
}
