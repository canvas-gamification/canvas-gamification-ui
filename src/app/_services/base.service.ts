import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    // Usage: this.baseService.addParams(this.baseService.getURL('course','edit','2'), {'param1':'1','param2':'false'});
    addParams(url: URL, params: Record<string,string>): string{
        const searchParams = new URLSearchParams(params).toString();
        return url + searchParams;

    }

    getURL(...names: string[]): URL {
        // generate BaseURL/api/names[0]/names[1]/.../names[-1]/
        let relativeURL = '';
        for (const id in names) {
            relativeURL += names[id].split('/').join('') + '/';
        }
        return new URL(relativeURL, environment.apiBaseUrl+'/api/');
    }
}
