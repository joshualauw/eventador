interface IStreamRoom {
    id: string;
    participants: (IParticipant & { user_id: IUser })[];
    chats: IStreamChat[];
}

interface IStreamChat {
    id: string;
    username?: string;
    content: string;
    type: "user" | "bot";
}
