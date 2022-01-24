export type VariableEditorTypes = 'integer' | 'float' | 'enum' | 'expression' | 'choice';
export interface VariableEditorInteger {
    type: string;
    name: string;
    min: number;
    max: number;
}
export interface VariableEditorFloat {
    type: string;
    name: string;
    min: number;
    max: number;
    precision: number;
}
export interface VariableEditorEnumerator {
    type: string;
    name: string;
    values: Array<string>;
}
export interface VariableEditorExpression {
    type: string;
    name: string;
    expression: string;
}
export interface VariableEditorChoice {
    type: string;
    name: string;
    choice: string;
    values: Array<string>;
}

export interface TestCaseEditor {
    input: string;
    output: string;
}

export interface ParsonsInputFileEditor {
    name: string;
    compile: boolean;
    lines: [];
}

export interface JavaInputFileEditor {
    name: string;
    compile: boolean;
    template: string;
}
