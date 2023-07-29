interface IReport extends BaseModel {
    content: string;
    user_id: string;
}

type IReportDetail = IReport & { user_id: IUser };
