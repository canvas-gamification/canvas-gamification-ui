import {TuiStatusPipe} from './tui-status.pipe';
import {TuiStatus} from "@taiga-ui/kit";

describe('TuiStatusPipe', () => {
    it('create an instance', () => {
        const pipe = new TuiStatusPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return TuiStatus', () => {
        const pipe = new TuiStatusPipe();
        const statuses = [TuiStatus.Success, TuiStatus.Default, TuiStatus.Error, TuiStatus.Warning, TuiStatus.Primary];
        expect(statuses).toContain(pipe.transform('Solved'));
    });
});
