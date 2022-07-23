import {GetKatexHtmlStringPipe} from './get-katex-html-string.pipe'

describe('GetKatexHtmlStringPipe', () => {
    it('create an instance', () => {
        const pipe = new GetKatexHtmlStringPipe()
        expect(pipe).toBeTruthy()
    })

    it('should return string with katex injected', () => {
        const pipe = new GetKatexHtmlStringPipe()
        const preKatexString = '<editor-inline-math equation="x=y"></editor-inline-math>'
        const postKatexString = '<html><head></head><body><editor-inline-math equation="x=y"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>x</mi><mo>=</mo><mi>y</mi></mrow><annotation encoding="application/x-tex">x=y</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span></span></span></span></editor-inline-math></body></html>'
        expect(pipe.transform(preKatexString)).toEqual(postKatexString)
    })
})
