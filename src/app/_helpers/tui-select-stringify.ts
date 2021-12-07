import {Injectable} from "@angular/core";
import {TuiContextWithImplicit, tuiPure, TuiStringHandler} from "@taiga-ui/cdk";

@Injectable({providedIn: 'root'})
export class TuiSelectStringifyService {
    @tuiPure
    stringify(
        items: Array<unknown>, key: string | number, value: string | number
    ): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(items.map((item) => [item[key], item[value]] as [number, string]));
        return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || '';
    }
}
