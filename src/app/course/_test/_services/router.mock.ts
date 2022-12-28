import {Injectable} from "@angular/core"
import {of} from "rxjs"
import {NavigationEnd} from "@angular/router"


@Injectable({
    providedIn: 'root',
})
export class RouterMock {
    public events = of(new NavigationEnd(0, '', ''))
    public url = '/course/0/homepage'
}
