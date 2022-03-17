import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParsonsFile} from '@app/_models';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-parsons-lines',
    templateUrl: './parsons-lines.component.html',
    styleUrls: ['./parsons-lines.component.scss']
})
export class ParsonsLinesComponent implements OnInit, OnDestroy {
    @Input() file: ParsonsFile;
    @Output() readonly code = new EventEmitter<string>();

    leftContainer: ContainerObject[] = [];
    rightContainer: ContainerObject[] = [];

    subscriptions: Subscription = new Subscription();

    constructor(private dragulaService: DragulaService) {
    }

    ngOnInit(): void {
        for (const line of this.file.lines) {
            this.leftContainer.push(new ContainerObject(line));
        }
        this.dragulaService.createGroup(this.file.name, {
            revertOnSpill: true
        });

        this.subscriptions.add(
            this.dragulaService.dragend().subscribe(() => {
                this.calculateSourceCode();
            })
        );
        // These two subscriptions are used as a workaround to stop nested dragula arrays
        // from giving an error with "Node.insertBefore: The new child is an ancestor of the parent"
        this.subscriptions.add(
            this.dragulaService.over().subscribe(({el}) => {
                if (el.classList.contains('gu-transit')) {
                    el.querySelectorAll('.container').forEach(child => {
                        child.classList.add('remove-container-events');
                    });
                }
            })
        );
        this.subscriptions.add(
            this.dragulaService.dragend().subscribe(({el}) => {
                el.querySelectorAll('.container').forEach(child => {
                    child.classList.remove('remove-container-events');
                });
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Calculate the source code for question submission.
     */
    calculateSourceCode(): void {
        const answer = this.rightContainer.reduce((prev, curr) => {
            return prev + curr.render('    ');
        }, '');
        this.code.emit(answer);
    }
}

class ContainerObject {
    canNestObjects = false;
    nestedObjects: Array<ContainerObject> = [];

    constructor(public value: string) {
        this.canNestObjects = this.determineIfNestObjects(value);
    }

    determineIfNestObjects(value: string) {
        let matchExpression = false;
        const elseIfMatch = /(else\s)?if\s*\((.*?)\)\s*{?/;
        const elseMatch = /else\s*{?/;
        const whileMatch = /while\s*\((.*?)\)\s*{?/;
        const forMatch = /for\s*\((.*?)\)\s*{?/;
        const curlyBraceMatch = /(.*?){/;
        [elseIfMatch, elseMatch, whileMatch, forMatch, curlyBraceMatch].forEach(regExp => {
            const match = value.match(regExp);
            if (match && !matchExpression) matchExpression = match[0] === value;
        });
        return matchExpression;
    }

    /**
     * Render the object to a string with nested objects as indented strings.
     * Each object, including nested, is created with a \n separator
     * @param indent the type of indent
     * @param indentFactor recursive value used to determine indents for nested values.
     */
    render(indent: string, indentFactor = 0): string {
        let indents = '';
        for (let i = 0; i < indentFactor; ++i) {
            indents += indent;
        }
        const initialVal = indents + this.value + '\n';
        return this.nestedObjects.reduce((prev, curr) => {
            return prev + curr.render(indent, indentFactor + 1);
        }, initialVal);
    }
}
