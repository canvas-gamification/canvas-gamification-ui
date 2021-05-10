import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    getParamURL(url: string, params: { [key: string]: string | number | boolean }): string {
        let httpParams = new HttpParams();
        Object.entries(params).forEach(
            ([key, value]) => httpParams = (httpParams.has(key)) ? httpParams : httpParams.append(key, String(value))
        )
        ;
        return ((url.slice(-1) === '/')? url : url +'/') + httpParams.toString();
    }
}
