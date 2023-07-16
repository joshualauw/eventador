interface IBudget {
    _id: string;
    name: string;
    limit: number;
    expenses: IExpense[];
    event_id: string;
    createdAt: string;
    updatedAt: string;
}

interface IExpense {
    name: string;
    amount: number;
}

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
