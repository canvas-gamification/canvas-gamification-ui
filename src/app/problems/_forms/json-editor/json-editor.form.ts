import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form";
import {JavaInputFilesForm} from "@app/problems/_forms/json-editor/java-input-files.form";
import {ParsonsInputFilesForm} from "@app/problems/_forms/json-editor/parsons-input-files.form";
import {TestCasesForm} from "@app/problems/_forms/json-editor/test-cases.form";

export type JSONValueTypes = 'variables' | 'java_input_files' | 'parsons_input_files' | 'test_cases';
export type VariableTypes = 'integer' | 'float' | 'enum' | 'expression' | 'choice';
export type JavaInputFileTypes = 'file';
export type ParsonsInputFileTypes = 'file';
export type TestCaseTypes = 'test case';

export class JsonEditorForm {
    static createVariablesForm(valuesName: JSONValueTypes): FormGroup {
        const form = new FormGroup({});
        form.addControl(valuesName, new FormArray([]));
        return form;
    }

    static getTypes(valuesName: JSONValueTypes): VariableTypes[] | JavaInputFileTypes[] | ParsonsInputFileTypes[] | TestCaseTypes[] {
        if (valuesName === 'variables') return ['integer', 'float', 'enum', 'expression', 'choice'] as VariableTypes[];
        if (valuesName === 'java_input_files') return ['file'] as JavaInputFileTypes[];
        if (valuesName === 'parsons_input_files') return ['file'] as ParsonsInputFileTypes[];
        if (valuesName === 'test_cases') return ['test case'] as TestCaseTypes[];
        return undefined;
    }

    static getNewType(valuesName: JSONValueTypes, type: VariableTypes | JavaInputFileTypes | ParsonsInputFileTypes | TestCaseTypes): FormGroup {
        if (valuesName === 'variables') return VariablesForm.getNewVariableForm(type as VariableTypes);
        if (valuesName === 'java_input_files') return JavaInputFilesForm.getNewJavaInputFileForm();
        if (valuesName === 'parsons_input_files') return ParsonsInputFilesForm.getNewParsonsInputFileForm();
        if (valuesName === 'test_cases') return TestCasesForm.getNewTestCaseForm();
        return undefined;
    }

    static getNewValueControl(valuesName: JSONValueTypes, value: string | number): FormControl {
        let valueControl;
        if (valuesName === 'variables') valueControl = VariablesForm.createValuesControl();
        else if (valuesName === 'parsons_input_files') valueControl = ParsonsInputFilesForm.createLinesControl();
        else throw SyntaxError;
        valueControl?.setValue(value);
        return valueControl;
    }
}
