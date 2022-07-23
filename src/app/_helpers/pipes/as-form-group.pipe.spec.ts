import {AsFormGroupPipe} from './as-form-group.pipe'

describe('AsFormGroupPipe', () => {
    let pipe: AsFormGroupPipe

    beforeEach(() => {
        pipe = new AsFormGroupPipe()
    })

    it('should create an instance', () => {
        expect(pipe).toBeTruthy()
    })
})
