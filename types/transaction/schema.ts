namespace IGetEventReport {
    export type Data = ApiResponse<{
        participant_count: number;
        itinenary_count: number;
        budget_count: number;
        revenue: number;
        transactions: ITransaction[];
    }>;
}
