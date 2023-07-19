interface IItinenary extends BaseModel {
    day: string;
    schedules: ISchedule[];
    event_id: string;
}

interface ISchedule {
    name: string;
    start_time: string;
    end_time: string;
}
