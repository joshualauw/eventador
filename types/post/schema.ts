namespace IGetAllPost {
    export type Query = { tag?: string; sortBy?: string };
    export type Data = ApiResponse<(IPost & { user_id: IUser; is_liked?: boolean })[]>;
}

namespace IGetOnePost {
    export type Data = ApiResponse<IPost & { user_id: IUser; is_liked: boolean }>;
}

namespace IGetTags {
    export type Data = ApiResponse<
        {
            name: string;
            post_count: number;
        }[]
    >;
}

namespace ICreatePost {
    export type Body = { tags: string[]; content: string; link?: IPostLink; image: File | null };
    export type Data = ApiResponse<IPost>;
}

namespace IUpdatePost {
    export type Body = { tags: string[]; content: string; link?: IPostLink; image: File | null };
    export type Data = ApiResponse<IPost>;
}

namespace IDeletePost {
    export type Data = ApiResponse<IPost>;
}

namespace ILikePost {
    export type Data = ApiResponse<IPost>;
}

namespace IGetOneComment {
    export type Data = ApiResponse<IComment>;
}

namespace ICreateComment {
    export type Body = { content: string };
    export type Data = ApiResponse<IComment>;
}

namespace IUpdateComment {
    export type Body = { content: string };
    export type Data = ApiResponse<IComment>;
}

namespace IDeleteComment {
    export type Data = ApiResponse<IComment>;
}

namespace ILikeComment {
    export type Data = ApiResponse<IComment>;
}

namespace IReportPost {
    export type Body = { content: string };
    export type Data = ApiResponse<IReport>;
}
