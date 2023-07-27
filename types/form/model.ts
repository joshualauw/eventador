interface IForm extends BaseModel {
    name: string;
    fields: IFormField[];
    responses: IFormResponse[];
    is_open: boolean;
    event_id: string;
}

interface IFormField {
    name: string;
    type: string;
    options: string[];
}

interface IFormResponse {
    email: string;
    answers: string[];
}
