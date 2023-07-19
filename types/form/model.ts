interface IForm extends BaseModel {
    name: string;
    fields: IFormField[];
    responses: IFormResponse[];
    event_id: string;
}

interface IFormField {
    name: string;
    type: string;
    options: string[];
}

interface IFormResponse {
    email: string;
    anwers: string[];
}
