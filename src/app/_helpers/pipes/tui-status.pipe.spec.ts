import {TuiStatusPipe} from './tui-status.pipe'

describe('TuiStatusPipe', () => {
    it('create an instance', () => {
        const pipe = new TuiStatusPipe()
        expect(pipe).toBeTruthy()
    })

    it('should return TuiStatus', () => {
        const pipe = new TuiStatusPipe()
        const statuses = ['default', 'primary', 'custom', 'success', 'error', 'warning', 'info', 'neutral']
        expect(statuses).toContain(pipe.transform('Solved'))
    })
})
