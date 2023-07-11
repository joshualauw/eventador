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
