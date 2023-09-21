namespace IGetAllForm {
    export type Data = ApiResponse<IForm[]>;
    export type Query = { open?: boolean };
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
        is_open: boolean;
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

namespace ISubmitResponse {
    export type Body = { email: string; answers: { name: string; value: any }[] };
    export type Data = ApiResponse<IForm>;
}
