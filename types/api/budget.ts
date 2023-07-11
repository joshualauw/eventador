namespace IGetBudget {
    export type Data = ApiResponse<IBudget[]>;
}

namespace ICreateBudget {
    export interface Body {
        name: string;
        limit: number;
    }

    export type Data = ApiResponse<IBudget>;
}

namespace IUpdateBudget {
    export interface Body {
        name: string;
        limit: number;
        expenses: IExpense[];
    }

    export type Data = ApiResponse<IBudget>;
}

namespace IGetOneBudget {
    export type Data = ApiResponse<IBudget>;
}

namespace IDeleteBudget {
    export type Data = ApiResponse<IBudget>;
}
