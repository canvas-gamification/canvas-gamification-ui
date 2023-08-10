import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {ApiService} from "@app/_services/api.service"
// import {Observable} from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class EventSetService {

    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {

    }

}
