export enum Filter {
    SINGLE_CHOICE = 'SINGLE_CHOICE',
    DATE_RANGE = 'DATE_RANGE',
    AGE_RANGE = 'AGE_RANGE',
}

export type FilterType =
    | Filter.SINGLE_CHOICE
    | Filter.DATE_RANGE
    | Filter.AGE_RANGE;
