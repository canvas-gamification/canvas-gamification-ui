/* eslint-disable */
import {mergeAttributes, Node} from '@taiga-ui/addon-editor/node_modules/@tiptap/core';
import {Injector} from '@angular/core';
import {TuiNodeViewRenderer} from '@taiga-ui/addon-editor/extensions/tiptap-node-view';
import {InlineMathComponent} from '@app/components/editor/inline-math/inline-math.component';

export interface InlineMath {
    equation: string;
}

export const createInlineMathEditorExtension = (injector: Injector): Node => {
    const INLINE_MATH_PARSE_META = [{tag: 'editor-inline-math'}];
    const DEFAULT_MATH_ATTRS = {
        equation: {
            default: '',
            keepOnSplit: false
        }
    };

    return Node.create({
        name: 'editor_inline_math',
        group: 'inline math',
        content: 'text*',
        inline: true,
        atom: true,
        code: true,

        parseHTML() {
            return INLINE_MATH_PARSE_META;
        },

        addAttributes() {
            return DEFAULT_MATH_ATTRS;
        },

        renderHTML({ HTMLAttributes }: Record<string, any>) {
            return ['editor-inline-math', mergeAttributes(HTMLAttributes)];
        },

        addNodeView() {
            return TuiNodeViewRenderer(InlineMathComponent, {injector});
        },
    });
};
