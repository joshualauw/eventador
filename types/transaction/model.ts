interface ITransaction extends BaseModel {
    trans_date: string;
    status: string;
    amount: number;
    notes: string;
    user_id: string;
    event_id: string;
}

interface IBudgetTransaction {
    budget_details: {
        name: string;
        limit: number;
        spent: number;
        remaining: number;
    }[];
    total_spent: number;
    gross_profit: number;
    net_profit: number;
}

interface ISponsorTransaction {
    sponsor_details: {
        name: string;
        funds: number;
    }[];
    total_funds: number;
    gross_profit: number;
    net_profit: number;
}

interface IMonthlyTransaction {
    week: {
        start: string;
        end: string;
    };
    monthly_transactions: ITransaction[];
}
