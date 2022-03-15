import {Pipe, PipeTransform} from '@angular/core';
import {GetKatexStringPipe} from '@app/_helpers/pipes/get-katex-string.pipe';

/**
 * Search through the html string and find the 'editor-inline-math' elements and
 * parse them to display KaTeX based on their equation
 */
@Pipe({
    name: 'getKatexHtmlString'
})
export class GetKatexHtmlStringPipe implements PipeTransform {
    transform(html: string): string {
        const katexToStringPipe = new GetKatexStringPipe();
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(html, 'text/html');
        const inlineMaths = htmlDoc.querySelectorAll('editor-inline-math');
        inlineMaths.forEach(inlineMath => {
            const equation = inlineMath.getAttribute('equation');
            inlineMath.innerHTML = katexToStringPipe.transform(equation);
        });
        return htmlDoc.documentElement.outerHTML;
    }
}
