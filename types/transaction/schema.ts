namespace IGetAllTransaction {
    export type Data = ApiResponse<(ITransaction & { user_id: IUser })[]>;
}

namespace IGetTransactionReport {
    export type Data = ApiResponse<{
        participant_count: number;
        itinenary_count: number;
        budget_count: number;
        revenue?: number;
        highest_transaction?: IHighestTransaction;
        monthly_transactions: IMonthlyTransaction[];
        latest_transaction?: ITransaction;
        today_transactions: ITransaction[];
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
