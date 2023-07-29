namespace IGetAdminStats {
    export type Data = ApiResponse<{ total_events: number; total_posts: number; total_users: number; revenue: number }>;
}

namespace IGetAdminTransaction {
    export type Data = ApiResponse<(ITransaction & { user_id: IUser })[]>;
}

namespace IGetAdminUsers {
    export type Data = ApiResponse<(IUser & { reports: IReportDetail[] })[]>;
}

namespace IGetAdminPosts {
    export type Data = ApiResponse<(IPost & { reports: IReportDetail[] })[]>;
}

namespace IGetAdminEvents {
    export type Data = ApiResponse<(IEvent & { reports: IReportDetail[] })[]>;
}

namespace iDisableEvent {
    export type Data = ApiResponse<IEvent>;
}

namespace ISuspendPost {
    export type Data = ApiResponse<IPost>;
}

namespace IBanUser {
    export type Data = ApiResponse<IUser>;
}
