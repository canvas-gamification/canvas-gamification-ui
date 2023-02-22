import {Injectable} from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class NightModeService {
    private enableNightMode: boolean

    constructor() {
        const useNightMode = window.localStorage.getItem('useNightMode')
        if (useNightMode) {
            this.enableNightMode = useNightMode === 'true'
        } else {
            this.enableNightMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        }
    }

    getNightMode(): boolean {
        return this.enableNightMode
    }

    setNightMode(value: boolean): void {
        this.enableNightMode = value
        window.localStorage.setItem('useNightMode', String(this.enableNightMode))
    }

}
