namespace IRegister {
    export interface Body {
        username: string;
        email: string;
        password: string;
        confirm_password: string;
    }
    export type Data = ApiResponse<Omit<IUser, "password">>;
}

namespace IActivate {
    export interface Body {
        email: string;
        code: string;
    }
}

namespace IResetPass {
    export type Body = { email: string; password: string; confirm_password: string; token: string };
}

namespace ILogin {
    export interface Body {
        email: string;
        password: string;
    }

    export type Data = ApiResponse<Omit<IUser, "password"> & { token: string }>;
}

namespace ISavePersonal {
    export interface Body {
        profile: File | null;
        username: string;
        email: string;
        phone_number: string;
    }

    export type Data = ApiResponse<IUser>;
}

namespace ISavePreferences {
    export interface Body {
        theme: "light" | "dark";
        notifications: string[];
    }
    export type Data = ApiResponse<IUser>;
}

namespace IGetNotifications {
    export type Data = ApiResponse<IUserNotification[]>;
}

namespace IChangePassword {
    export type Body = { old_password: string; new_password: string; confirm_password: string };
    export type Data = ApiResponse<IUser>;
}

namespace IGetFollowableUsers {
    export type Query = {
        followed: boolean;
        keyword: string;
    };
    export type Data = ApiResponse<(IUser & { is_followed: boolean; followers_count: number; events_count: number })[]>;
}

namespace IGetOneUser {
    export type Data = ApiResponse<{
        user: IUser & {
            followers: (IUser & { followers: string[]; followings: string[] })[];
            followings: (IUser & { followers: string[]; followings: string[] })[];
            is_followed: boolean;
        };
        userPosts: (IPost & { user_id: IUser })[];
        userEvents: Pick<
            IEvent,
            "_id" | "name" | "price" | "banner" | "location" | "capacity" | "category" | "start_date"
        >[];
    }>;
}

namespace IPremiumUser {
    export type Data = ApiResponse<IUser>;
}

namespace IFollowUser {
    export type Data = ApiResponse<IUser>;
}

namespace ITopUp {
    export type Body = { amount: number };
    export type Data = ApiResponse<string>;
}

namespace IWithdraw {
    export type Body = { amount: number };
    export type Data = ApiResponse<string>;
}

namespace IResendVerificationCode {
    export type Body = { email: string };
    export type Data = ApiResponse<string>;
}

namespace IResendPasswordToken {
    export type Body = { email: string };
    export type Data = ApiResponse<string>;
}
