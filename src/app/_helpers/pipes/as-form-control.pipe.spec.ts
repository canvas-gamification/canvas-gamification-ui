import {AsFormControlPipe} from './as-form-control.pipe';

describe('AsFormControlPipe', () => {
    let pipe: AsFormControlPipe;

    beforeEach(() => {
        pipe = new AsFormControlPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });
});
