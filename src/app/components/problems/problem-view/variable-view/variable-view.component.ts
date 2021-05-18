import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-variable-view',
    templateUrl: './variable-view.component.html',
    styleUrls: ['./variable-view.component.scss']
})
export class VariableViewComponent implements OnInit {
    @Input() variables;
    @Input() variableErrors;
    generatedVariables: { name: string, value: string }[];

    ngOnInit(): void {
        if (Object.keys(this.variables).length !== 0) {
            const array = [];
            for (const variable in this.variables) {
                array.push({
                    name: variable,
                    value: this.variables[variable]
                });
                this.generatedVariables = array;
            }
        }
        else {
            this.generatedVariables = [];
        }
    }

}
