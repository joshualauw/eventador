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

namespace IGetAllForm {
    export type Data = ApiResponse<IForm[]>;
}

namespace IGetOneForm {
    export type Data = ApiResponse<IForm>;
}

namespace ICreateForm {
    export type Body = {
        name: string;
    };
    export type Data = ApiResponse<IForm>;
}

namespace IUpdateForm {
    export type Body = {
        name: string;
    };
    export type Data = ApiResponse<IForm>;
}

namespace ISaveForm {
    export type Body = {
        fields: {
            name: string;
            type: string;
            options: string[];
        }[];
    };
    export type Data = ApiResponse<IForm>;
}

namespace IDeleteForm {
    export type Data = ApiResponse<IForm>;
}
