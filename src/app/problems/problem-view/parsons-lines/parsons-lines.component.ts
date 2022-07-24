import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core'
import {ParsonsFile} from '@app/_models'
import {DragulaService} from 'ng2-dragula'
import {Subscription} from 'rxjs'

@Component({
    selector: 'app-parsons-lines',
    templateUrl: './parsons-lines.component.html',
    styleUrls: ['./parsons-lines.component.scss']
})
export class ParsonsLinesComponent implements OnInit, OnDestroy {
    @Input() testABNew = false
    @Input() file: ParsonsFile
    @Output() readonly code = new EventEmitter<string>()

    leftContainer: ContainerObject[] = []
    rightContainer: ContainerObject[] = []

    subscriptions: Subscription = new Subscription()

    constructor(
        private dragulaService: DragulaService,
        private elementRef: ElementRef
    ) {
    }

    ngOnInit(): void {
        this.leftContainer = this.file.lines.map(line => {
            return new ContainerObject(line)
        })
        this.dragulaService.destroy(this.file.name)
        this.dragulaService.createGroup(this.file.name, {
            revertOnSpill: true
        })

        if (this.testABNew) {
            this.subscriptions.add(this.dragulaService.dragend().subscribe(() => {
                this.calculateSourceCode();
                [...this.elementRef.nativeElement.getElementsByClassName('container-nested')].forEach(element => {
                    element.classList.remove('container-nested_hover')
                })
            }))
            this.subscriptions.add(this.dragulaService.drag().subscribe(() => {
                [...this.elementRef.nativeElement.getElementsByClassName('container-nested')].forEach(element => {
                    element.classList.add('container-nested_hover')
                })
            }))
            // These two subscriptions are used as a workaround to stop nested dragula arrays
            // from giving an error with "Node.insertBefore: The new child is an ancestor of the parent"
            this.subscriptions.add(this.dragulaService.over().subscribe(({el}) => {
                if (el.classList.contains('gu-transit')) {
                    el.querySelectorAll('.container').forEach(child => {
                        child.classList.add('remove-container-events')
                    })
                }
            }))
            this.subscriptions.add(this.dragulaService.dragend().subscribe(({el}) => {
                el.querySelectorAll('.container').forEach(child => {
                    child.classList.remove('remove-container-events')
                })
            }))
        } else {
            this.removeLeftContainerIndents()
            this.dragulaService.dragend().subscribe(() => {
                this.determineIndents()
                this.removeLeftContainerIndents()
                this.calculateSourceCode()
            })
        }
    }

    ngOnDestroy(): void {
        this.dragulaService.destroy(this.file.name)
        this.subscriptions.unsubscribe()
    }

    /**
     * Determine indents for the parsons lines.
     */
    determineIndents(): void {
        let count = 0
        let nextLineRemoveIndent = false
        for (let i = 0; i < this.rightContainer.length; i++) {
            const line = this.rightContainer[i]
            const nextLine = this.rightContainer[i + 1]
            const tempLine = line.value.trim()
            const tempNextLine = nextLine?.value.trim()
            // If the line starts with a bracket, then remove a tab count
            if (tempLine.startsWith('}')) {
                count = Math.max(count - 1, 0)
            }
            // Add specific amount of tabs to the line based on the count
            line.value = [...Array(count)].reduce((prev,) => prev + '\t', '') + tempLine
            // If the current line is specified to be the only indented line, then decrease tab count
            if (nextLineRemoveIndent) {
                count = Math.max(count - 1, 0)
            }
            // Using the line and the next line, determine if there should be an indent
            const {indentNextLine, onlyIndentNextLine} = this.determineLineIndented(tempLine, tempNextLine)
            nextLineRemoveIndent = onlyIndentNextLine
            if (indentNextLine) {
                count++
            }
        }
    }

    /**
     * Determine if the object should allow nested objects.
     * Go through as many cases as possible defined by Java.
     * @param value the value of the object
     * @param nextValue the next value to check if it's a single curly brace
     */
    determineLineIndented(value: string, nextValue?: string): { indentNextLine: boolean, onlyIndentNextLine: boolean } {
        let matchExpression = false

        // Check if the line end in a curly brace then it will always indent
        const curlyBraceMatch = /(.*?){/ // CASES: Anything ending in {, ...
        const matchBraceVal = value.match(curlyBraceMatch)
        if (matchBraceVal && matchBraceVal[0] === value) return {indentNextLine: true, onlyIndentNextLine: false}
        // Check if the next line is a curly brace and the current line does not have a curly brace, then don't indent this line
        const matchBraceNext = nextValue?.match(curlyBraceMatch)
        if ((!matchBraceVal || matchBraceVal[0] !== value) && matchBraceNext && matchBraceNext[0] === nextValue && nextValue?.length === 1) return {
            indentNextLine: false,
            onlyIndentNextLine: false
        }

        // Match cases for indents other than curly braces
        const elseIfMatch = /(}?\s*else\s+)?if\s*\((.*?)\)/ // CASES: IF (...), ELSE IF (...)
        const elseMatch = /(}?\s*)?else/ // CASES: ELSE
        const whileMatch = /while\s*\((.*?)\)/ // CASES: WHILE (...)
        const forMatch = /for\s*\((.*?)\)/; // CASES: FOR (...)
        [elseIfMatch, elseMatch, whileMatch, forMatch, curlyBraceMatch].forEach(regExp => {
            if (!matchExpression)
                matchExpression = !!value.match(regExp)?.find(match => match === value)
        })

        return {indentNextLine: matchExpression, onlyIndentNextLine: matchExpression}
    }

    /**
     * Remove indents from lines in the left container.
     */
    removeLeftContainerIndents(): void {
        this.leftContainer.forEach(line => {
            line.value = line.value.trim()
        })
    }

    /**
     * Calculate the source code for question submission.
     */
    calculateSourceCode(): void {
        let answer
        if (this.testABNew) {
            answer = this.rightContainer.reduce((prev, curr) => {
                return prev + curr.render('    ')
            }, '')
        } else {
            answer = this.rightContainer.reduce((prev, curr) => {
                return prev + curr.value + '\n'
            }, '')
        }
        this.code.emit(answer)
    }

    /**
     * testABNew
     * This is to deal with displaying the hovered container in nested containers
     * When hovered, ensure that the hovered container is only displaying as hovered
     * Other containers are set to not hover.
     */
    containerObjectHover(event: MouseEvent): void {
        [...this.elementRef.nativeElement.getElementsByClassName('container-object')].forEach(element => {
            if (element !== (event.target as Element))
                element.classList.add('container-object_hover-none')
            else
                element.classList.remove('container-object_hover-none')
        })
    }

    containerObjectRemoveHover(): void {
        [...this.elementRef.nativeElement.getElementsByClassName('container-object')].forEach(element => {
            element.classList.remove('container-object_hover-none')
        })
    }
}

class ContainerObject {
    nestedObjects: Array<ContainerObject> = [] // testABNew

    constructor(public value: string) {
    }

    /**
     * testABNew
     * Render the object to a string with nested objects as indented strings.
     * Each object, including nested, is created with a \n separator
     * @param indent the type of indent
     * @param indentFactor recursive value used to determine indents for nested values.
     */
    render(indent: string, indentFactor = 0): string {
        let indents = ''
        for (let i = 0; i < indentFactor; ++i) {
            indents += indent
        }
        const initialVal = indents + this.value + '\n'
        return this.nestedObjects.reduce((prev, curr) => {
            return prev + curr.render(indent, indentFactor + 1)
        }, initialVal)
    }
}
