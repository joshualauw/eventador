interface ISponsor extends BaseModel {
    name: string;
    logo?: string;
    funds: number;
    description: string;
    event_id: string;
}
