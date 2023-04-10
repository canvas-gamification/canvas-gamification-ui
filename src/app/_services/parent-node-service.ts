import {Injectable} from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class ParentNodeService {
    private parentNode: number

    constructor() {
        this.parentNode = null
    }

    getParentNode(): number {
        return this.parentNode
    }

    setParentNode(value: number): void {
        this.parentNode = value
    }
}
