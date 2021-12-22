import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-test-cases',
    templateUrl: './test-cases.component.html',
    styleUrls: ['./test-cases.component.scss']
})
export class TestCasesComponent {

    @Input() form: FormGroup;
}
