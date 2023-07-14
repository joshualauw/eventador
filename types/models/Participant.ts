interface IParticipant {
    _id: string;
    type: IParticipantType;
    role: string;
    access: string[];
    joinedDate: string;
    refundable: boolean;
    is_banned: boolean;
    user_id: string;
    event_id: string;
    createdAt: string;
    updatedAt: string;
}

interface IInvitation {
    _id: string;
    email: string;
    type: string;
    code: string;
    event_id: string;
    createdAt: string;
    updatedAt: string;
}

type IParticipantType = "reguler" | "organizer" | "invited" | "owner";

namespace IGetAllParticipant {
    export type Data = ApiResponse<(IParticipant & { user_id: IUser })[]>;
}

namespace IGetOneParticipant {
    export type Data = ApiResponse<IParticipant & { user_id: IUser }>;
}

namespace IInviteParticipant {
    export type Body = {
        link: string;
        email: string;
        description: string;
        is_organizer: boolean;
    };
    export type Data = ApiResponse<IInvitation>;
}

namespace IApplyInvite {
    export type Body = {
        code: string;
    };
    export type Data = ApiResponse<IParticipant>;
}

namespace IRegisterParticipant {
    export type Data = ApiResponse<IParticipant>;
}
