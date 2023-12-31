import {TokenUseOption} from '@app/_models/token_use_option'

export interface TokenUse {
    option: TokenUseOption;
    num_used: number;
}

export interface TokenFilterParameters {
    page: number,
    page_size: number,
    student_name: string,
    event_name: string
}
