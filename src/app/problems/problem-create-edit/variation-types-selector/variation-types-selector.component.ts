import {Component, Input} from '@angular/core'
import {FormControl} from "@angular/forms"

@Component({
    selector: 'app-variation-types-selector',
    templateUrl: './variation-types-selector.component.html',
    styleUrls: ['./variation-types-selector.component.scss']
})
export class VariationTypesSelectorComponent {
    @Input() variationControl: FormControl
    variationTypes = [
        "Variable Name Change",
        "Function Name Change",
        "Method Parameter Order Change",
        "Constant Change",
        "Polarity Reverse",
        "Data Type Change",
        "No Variations",
        "Console Output Format Change",
        "Question Text Change",
    ]
}
