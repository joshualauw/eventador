namespace IGetAllDiscussion {
    export type Data = ApiResponse<(IDiscussion & { user_id: IUser; participant_id: IParticipant })[]>;
    export type Query = {
        participant_id: string;
        type: string;
    };
}

namespace IGetOneDiscussion {
    export type Data = ApiResponse<IDiscussion>;
}

namespace ICreateDiscussion {
    export type Body = {
        content: string;
        participant_id: string;
        is_announcement: boolean;
    };
    export type Data = ApiResponse<IDiscussion>;
}

namespace IUpdateDiscussion {
    export type Body = {
        content: string;
        is_announcement: boolean;
    };
    export type Data = ApiResponse<IDiscussion>;
}

namespace IDeleteDiscussion {
    export type Data = ApiResponse<IDiscussion>;
}
