export interface IForm {
    id: string,
    type: string,
    value: string,
    required: boolean,
    placeholder: string,
    valid: boolean,
    pattern: string | RegExp,
    input_title: string
    error: string,
    maxlength: number
}