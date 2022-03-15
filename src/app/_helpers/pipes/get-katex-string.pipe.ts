import {Pipe, PipeTransform} from '@angular/core';
import katex from 'katex';

/**
 * Return string with formatted katex html
 */
@Pipe({
    name: 'getKatexString'
})
export class GetKatexStringPipe implements PipeTransform {
    transform(equation: string): string {
        return katex.renderToString(equation, {
            throwOnError: false
        });
    }
}
