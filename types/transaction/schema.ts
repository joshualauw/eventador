namespace IGetAllTransaction {
    export type Data = ApiResponse<(ITransaction & { user_id: IUser })[]>;
}

namespace IGetTransactionReport {
    export type Data = ApiResponse<{
        participant_count: number;
        itinenary_count: number;
        budget_count: number;
        revenue?: number;
        budget_transactions: IBudgetTransaction;
        sponsor_transactions: ISponsorTransaction;
        monthly_transactions: IMonthlyTransaction[];
        weekly_transactions: ITransaction[];
    }>;
}

namespace IGetTimeRangedReport {
    export type Query = {
        start_date: string;
        end_date: string;
    };
    export type Data = ApiResponse<ITransaction[]>;
}
