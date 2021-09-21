import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

export class PracticeDifficultyForm {
    /**
     * Creates the difficulty form for practice questions.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            difficulty: new FormControl('')
        });
    }
}
