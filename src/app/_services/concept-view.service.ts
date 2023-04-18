import {Injectable} from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class ConceptViewService {
    private enableListView: boolean

    constructor() {
        const useListView = window.localStorage.getItem('useListView')
        if (useListView) {
            this.enableListView = useListView === 'true'
        } else {
            this.enableListView = useListView === 'false'
        }
    }

    getListView(): boolean {
        return this.enableListView
    }

    setListView(value: boolean) {
        this.enableListView = value
        window.localStorage.setItem('useListView', String(this.enableListView))
    }
}
