interface IItinenary {
    _id: string;
    day: string;
    schedules: ISchedule[];
    event_id: string;
    createdAt: string;
    updatedAt: string;
}

interface ISchedule {
    name: string;
    start_time: string;
    end_time: string;
}
