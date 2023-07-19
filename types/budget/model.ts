interface IBudget extends BaseModel {
    name: string;
    limit: number;
    expenses: IExpense[];
    event_id: string;
}

interface IExpense {
    name: string;
    amount: number;
}
