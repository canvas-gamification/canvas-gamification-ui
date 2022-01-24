export type VariableEditorTypes = 'integer' | 'float' | 'enum' | 'expression' | 'choice';
export interface VariableIntegerEditor {
    type: string;
    name: string;
    min: number;
    max: number;
}
export interface VariableFloatEditor {
    type: string;
    name: string;
    min: number;
    max: number;
    precision: number;
}
export interface VariableEnumeratorEditor {
    type: string;
    name: string;
    values: Array<string>;
}
export interface VariableExpressionEditor {
    type: string;
    name: string;
    expression: string;
}
export interface VariableChoiceEditor {
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
