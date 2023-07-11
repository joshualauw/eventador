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
