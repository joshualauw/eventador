interface IParticipant {
    _id: string;
    type: IParticipantType;
    role: string;
    access: IAccess[];
    joinedDate: string;
    refundable: boolean;
    is_banned: boolean;
    user_id: string;
    event_id: string;
    createdAt: string;
    updatedAt: string;
}

type IAccess = "budget" | "form" | "itinenary" | "sponsor";

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

namespace IApplyRoleParticipant {
    export type Body = {
        role: string;
    };
    export type Data = ApiResponse<IParticipant>;
}

namespace IGrantAccessParticipant {
    export type Body = {
        access: string[];
    };
    export type Data = ApiResponse<IParticipant>;
}

namespace IBanParticipant {
    export type Data = ApiResponse<IParticipant>;
}

namespace IEmailCertificate {
    export type Body = { certificate: File | null };
    export type Data = ApiResponse<IParticipant>;
}
