import {Component, OnInit} from '@angular/core';
import {TabListViewService} from "@app/_services/tab-list-view.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-tab-list-view-switcher',
    templateUrl: './tab-list-view-switcher.component.html',
    styleUrls: ['./tab-list-view-switcher.component.scss']
})
export class TabListViewSwitcherComponent implements OnInit {

    viewForm = new FormGroup({
        view: new FormControl('list')
    });

    constructor(private tabListViewService: TabListViewService) {
    }

    ngOnInit(): void {
        this.viewForm.controls.view.setValue(this.tabListViewService.getView());
        this.viewForm.controls.view.valueChanges.subscribe(value => this.setView(value));
    }

    setView(view: 'tab' | 'list'): void {
        this.tabListViewService.setView(view);
    }

    get view(): string {
        return this.viewForm.controls.view.value;
    }
}
