import {inject, Injectable} from "@angular/core"
import {TUI_DARK_MODE} from "@taiga-ui/core"

@Injectable({
    providedIn: 'root'
})
export class NightModeService {
    // Taiga 5's provideTaiga() mirrors this signal onto body[tuiTheme], and it
    // defaults to the OS color scheme. Pin it to the app's night-mode state so
    // the toggle — not prefers-color-scheme — controls the theme.
    private readonly darkMode = inject(TUI_DARK_MODE)
    private enableNightMode: boolean

    constructor() {
        const useNightMode = window.localStorage.getItem('useNightMode')
        if (useNightMode) {
            this.enableNightMode = useNightMode === 'true'
        } else {
            this.enableNightMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        }
        this.darkMode.set(this.enableNightMode)
    }

    getNightMode(): boolean {
        return this.enableNightMode
    }

    setNightMode(value: boolean): void {
        this.enableNightMode = value
        this.darkMode.set(value)
        window.localStorage.setItem('useNightMode', String(this.enableNightMode))
    }

}
