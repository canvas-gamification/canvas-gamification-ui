import {Component} from '@angular/core'
import {NightModeService} from "@app/_services/night-mode.service"

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    constructor(private nightModeService: NightModeService) {
    }

    getNightMode(): boolean {
        return this.nightModeService.getNightMode()
    }

    getYear(): number {
        return new Date().getFullYear()
    }
}
