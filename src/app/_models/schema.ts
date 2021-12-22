export interface ControlValidators {
    required?: boolean;
}

export interface SchemaType {
    type: string;
    name: string;
    label: string;
    controls?: SchemaType[];
    validators?: ControlValidators;
}

export interface Schema {
    types: SchemaType[];
}
