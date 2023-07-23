interface ITransaction extends BaseModel {
    trans_date: string;
    status: string;
    amount: number;
    notes: string;
    user_id: string;
    event_id: string;
}

interface IHighestTransaction {
    _id: string; //date
    revenue: number;
}

interface IMonthlyTransaction {
    week: {
        start: string;
        end: string;
    };
    monthly_transactions: ITransaction[];
}
