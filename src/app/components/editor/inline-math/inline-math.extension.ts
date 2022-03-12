/* eslint-disable */
import {Attribute, Node, NodeViewRenderer} from '@taiga-ui/addon-editor/node_modules/@tiptap/core';

import '@benrbray/prosemirror-math/style/math.css';
import 'katex/dist/katex.min.css';
import {Injector} from '@angular/core';
import {DOMOutputSpec, NodeSpec} from 'prosemirror-model';
import {TuiNodeViewRenderer} from '@taiga-ui/addon-editor/extensions/tiptap-node-view';
import {InlineMathComponent} from '@app/components/editor/inline-math/inline-math.component';
import katex from 'katex';

export interface InlineMath {
    equation: string;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        inlineMathEditor: {
            setInlineMath: (mathConfigs: InlineMath) => ReturnType;
        }
    }
}

export const createInlineMathEditorExtension = (injector: Injector): Node => {
    const INLINE_MATH_PARSE_META = [{tag: 'math-inline'}]
    const DEFAULT_MATH_ATTRS = {
        equation: {
            default: '',
            keepOnSplit: false
        }
    }

    return Node.create({
        name: 'math_inline',
        group: 'inline math',
        content: 'text*',
        inline: true,
        atom: true,
        code: true,

        parseHTML(): NodeSpec['parseDOM'] {
            return INLINE_MATH_PARSE_META;
        },

        addAttributes(): Record<keyof InlineMath, Attribute> {
            return DEFAULT_MATH_ATTRS;
        },

        renderHTML({ HTMLAttributes }: Record<string, any>): DOMOutputSpec {
            console.log(HTMLAttributes);
            console.log(HTMLAttributes.equation);
            console.log(katex.renderToString(HTMLAttributes.equation, {
                throwOnError: false
            }));
            return katex.renderToString(HTMLAttributes.equation, {
                throwOnError: false
            });
        },

        addNodeView(): NodeViewRenderer {
            console.log(injector);
            return TuiNodeViewRenderer(InlineMathComponent, {injector});
        },
    });
}
