export interface TokenValue {
    value: number;
    category: number;
    difficulty: string;
    pk: number;
}

export interface NestedTokenValue {
    token_values: TokenValue[];
    children: NestedTokenValue[];
    category_name: string;
}

