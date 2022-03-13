import {GetKatexStringPipe} from './get-katex-string.pipe';

describe('GetKatexStringPipe', () => {
    it('create an instance', () => {
        const pipe = new GetKatexStringPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return katex html', () => {
        const pipe = new GetKatexStringPipe();
        const equation = 'x=y';
        const katexHtml = '<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>x</mi><mo>=</mo><mi>y</mi></mrow><annotation encoding="application/x-tex">x=y</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span></span></span></span>';
        expect(pipe.transform(equation)).toEqual(katexHtml);
    });
});
