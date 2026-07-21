import {GetColorFromStringPipe} from './get-color-from-string.pipe'

describe('GetColorFromStringPipe', () => {
    it('create an instance', () => {
        const pipe = new GetColorFromStringPipe()
        expect(pipe).toBeTruthy()
    })

    it('should get correct colour', () => {
        const pipe = new GetColorFromStringPipe()
        const color = pipe.transform('test')
        // tuiStringHashToHsl was removed in Taiga 5; the pipe now hashes to hue with
        // fixed saturation/lightness (same hue as before for a given string).
        expect(color).toBe('hsl(58, 60%, 70%)')
    })
})
