import {Component, ViewChild, ChangeDetectionStrategy} from '@angular/core'

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LandingPageComponent {
    logoPath = 'assets/global/logo.jpg'
    canvasLogoPath = 'assets/global/Logo_Canvas_Red_Vertical.png'

    @ViewChild('services') servicesComponent

    goToServices(): void {
        this.servicesComponent.nativeElement.scrollIntoView({
            behavior: 'smooth',
        })
    }
}
