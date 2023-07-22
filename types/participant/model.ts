interface IParticipant extends BaseModel {
    type: IParticipantType;
    role?: string;
    access: IAccess[];
    joinedDate: string;
    refundable: boolean;
    is_banned: boolean;
    user_id: string;
    event_id: string;
}

type IAccess = "budget" | "form" | "itinenary" | "sponsor";

interface IInvitation extends BaseModel {
    email: string;
    type: string;
    code: string;
    event_id: string;
}

type IParticipantType = "reguler" | "organizer" | "invited" | "owner";
