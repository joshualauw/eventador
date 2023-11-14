interface ITransaction extends BaseModel {
    trans_date: string;
    status: string;
    amount: number;
    notes: string;
    user_id: string;
    event_id: string;
}

interface IBudgetDetail {
    name: string;
    limit: number;
    spent: number;
    remaining: number;
}
interface IBudgetTransaction {
    budget_details: IBudgetDetail[];
    total_spent: number;
    gross_profit: number;
    net_profit: number;
}
interface ISponsorDetail {
    name: string;
    funds: number;
}

interface ISponsorTransaction {
    sponsor_details: ISponsorDetail[];
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

interface IPageView {
    _id: string;
    label: string;
    time: string;
}
