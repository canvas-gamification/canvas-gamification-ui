import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core'
import {TabListViewService} from "@app/_services/tab-list-view.service"
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms"

@Component({
    selector: 'app-tab-list-view-switcher',
    templateUrl: './tab-list-view-switcher.component.html',
    styleUrls: ['./tab-list-view-switcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TabListViewSwitcherComponent implements OnInit {

    viewForm = new UntypedFormGroup({
        view: new UntypedFormControl('list')
    })

    constructor(private tabListViewService: TabListViewService) {
    }

    get view(): string {
        return this.viewForm.controls.view.value
    }

    ngOnInit(): void {
        this.viewForm.controls.view.setValue(this.tabListViewService.getView())
        this.viewForm.controls.view.valueChanges.subscribe(value => this.setView(value))
    }

    setView(view: 'tab' | 'list'): void {
        this.tabListViewService.setView(view)
    }
}
