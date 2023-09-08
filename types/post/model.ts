interface IPost extends BaseModel {
    user_id: string;
    image?: string;
    content: string;
    likes: string[];
    link?: IPostLink;
    comments: DetailComment[];
    reports: IReport[];
    tags: string[];
}

interface IPostLink {
    id: string;
    banner: string;
    name: string;
    url: string;
}

interface IComment extends BaseModel {
    content: string;
    user_id: string;
    likes: string[];
}

type DetailComment = IComment & { user_id: IUser; is_liked?: boolean };
