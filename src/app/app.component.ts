import {Component} from '@angular/core';
import {Router, RouterEvent} from "@angular/router";
// import renderMathInElement from 'katex/dist/contrib/auto-render';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'canvas-gamification-ui';
    hideFooterForLanding = true;

    constructor(private router: Router) {
        // renderMathInElement(document.body);
        this.router.events.subscribe((event) => {
            if (event instanceof RouterEvent) {
                this.hideFooterForLanding = event.url === '/';
            }
        });
    }
}
