import {GetColorFromStringPipe} from './get-color-from-string.pipe'

describe('GetColorFromStringPipe', () => {
    it('create an instance', () => {
        const pipe = new GetColorFromStringPipe()
        expect(pipe).toBeTruthy()
    })

    it('should get correct colour', () => {
        const pipe = new GetColorFromStringPipe()
        const color = pipe.transform('test')
        expect(color).toBe('hsl(58,63%,83%)')
    })
})
