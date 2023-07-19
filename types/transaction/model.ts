interface ITransaction extends BaseModel {
    trans_date: string;
    status: string;
    amount: number;
    notes: string;
    user_id: string;
    event_id: string;
}
