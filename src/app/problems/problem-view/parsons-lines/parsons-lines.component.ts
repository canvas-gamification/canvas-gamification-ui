import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParsonsFile} from "@app/_models";
import * as indentString from "indent-string";
import {DragulaService} from "ng2-dragula";

@Component({
    selector: 'app-parsons-lines',
    templateUrl: './parsons-lines.component.html',
    styleUrls: ['./parsons-lines.component.scss']
})
export class ParsonsLinesComponent implements OnInit {
    @Input() file: ParsonsFile;
    @Output() readonly code = new EventEmitter<string>();

    leftContainer: ContainerObject[];
    rightContainer: ContainerObject[];

    constructor(private dragulaService: DragulaService,) {
    }

    ngOnInit(): void {
        this.leftContainer = [];
        this.rightContainer = [];
        for (const line of this.file.lines) {
            this.leftContainer.push(new ContainerObject(line));
        }
        this.removeLeftContainerIndents();
        this.dragulaService.createGroup(this.file.name, {});

        this.dragulaService.dragend().subscribe(() => {
            this.determineIndents();
            this.removeLeftContainerIndents();
            this.calculateSourceCode();
        });
    }

    /**
     * Determine indents for the parsons lines.
     */
    determineIndents(): void {
        let count = 0;
        this.rightContainer.forEach(line => {
            const tempLine = line.value.trim();
            if (tempLine.charAt(tempLine.length - 1) === '}') {
                count = Math.max(count - 1, 0);
            }
            line.value = indentString(tempLine, count, {indent: '    '});
            if (tempLine.charAt(tempLine.length - 1) === '{') {
                count++;
            }
        });
    }

    /**
     * Remove indents from lines in the left container.
     */
    removeLeftContainerIndents(): void {
        this.leftContainer.forEach(line => {
            line.value = line.value.trim();
        });
    }

    /**
     * Calculate the source code for question submission.
     */
    calculateSourceCode(): void {
        let answer = '';
        this.rightContainer.forEach(line => {
            answer += line.value + '\n';
        });
        this.code.emit(answer);
    }
}

class ContainerObject {
    constructor(public value: string) {
    }
}
