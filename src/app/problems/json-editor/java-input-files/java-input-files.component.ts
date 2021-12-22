import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-java-input-files',
    templateUrl: './java-input-files.component.html',
    styleUrls: ['./java-input-files.component.scss']
})
export class JavaInputFilesComponent {

    @Input() form: FormGroup;
}
