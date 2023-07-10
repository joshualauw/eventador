interface IDiscussion {
    _id: string;
    content: string;
    is_announcement: boolean;
    participant_id: string;
    createdAt: Date;
    updatedAt: Date;
}
