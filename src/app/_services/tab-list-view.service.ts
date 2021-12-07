import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TabListViewService {

    localStorageValue = 'useTabOrListView';

    getView(): string {
        const tabOrList = window.localStorage.getItem(this.localStorageValue);
        if (!tabOrList) {
            this.setView('list');
            this.getView();
        }
        return tabOrList;
    }

    setView(view: 'tab' | 'list'): void {
        window.localStorage.setItem(this.localStorageValue, view);
    }
}
