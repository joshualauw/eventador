interface IDiscussion extends BaseModel {
    content: string;
    is_announcement: boolean;
    participant_id: string;
}
