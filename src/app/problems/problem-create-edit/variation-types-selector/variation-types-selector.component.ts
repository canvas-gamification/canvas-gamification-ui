import {Component, OnInit} from '@angular/core'

@Component({
    selector: 'app-variation-types-selector',
    templateUrl: './variation-types-selector.component.html',
    styleUrls: ['./variation-types-selector.component.scss']
})
export class VariationTypesSelectorComponent implements OnInit {
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

    constructor() { }

    ngOnInit(): void {
    }

}
