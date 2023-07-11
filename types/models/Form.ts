interface IForm {
    _id: string;
    name: string;
    fields: IFormField[];
    responses: IFormResponse[];
    event_id: string;
    createdAt: string;
    updatedAt: string;
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
