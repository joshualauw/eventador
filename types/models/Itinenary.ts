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

namespace IGetAllItinenary {
    export type Data = ApiResponse<IItinenary[]>;
}

namespace IGetOneItinenary {
    export type Data = ApiResponse<IItinenary>;
}

namespace ICreateItinenary {
    export type Body = { day: string };
    export type Data = ApiResponse<IItinenary>;
}

namespace IUpdateItinenary {
    export type Body = {
        day: string;
        schedules: {
            name: string;
            start_time: string;
            end_time: string;
        }[];
    };
    export type Data = ApiResponse<IItinenary>;
}

namespace IDeleteItinenary {
    export type Data = ApiResponse<IItinenary>;
}
