import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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

    constructor(
        private dragulaService: DragulaService,
        private elementRef: ElementRef
    ) {}

    ngOnInit(): void {
        this.leftContainer = this.file.lines.map(line => {
            return new ContainerObject(line);
        });
        this.dragulaService.createGroup(this.file.name, {
            revertOnSpill: true
        });
        this.subscriptions.add(
            this.dragulaService.dragend().subscribe(() => {
                this.calculateSourceCode();
                [...this.elementRef.nativeElement.getElementsByClassName('container-nested')].forEach(element => {
                    element.classList.remove('container-nested_hover');
                });
            })
        );
        this.subscriptions.add(
            this.dragulaService.drag().subscribe(() => {
                [...this.elementRef.nativeElement.getElementsByClassName('container-nested')].forEach(element => {
                    element.classList.add('container-nested_hover');
                });
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
        this.dragulaService.destroy(this.file.name);
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
    nestedObjects: Array<ContainerObject> = [];

    constructor(public value: string) {
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
