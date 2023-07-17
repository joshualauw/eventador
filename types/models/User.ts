interface IUser {
    _id: string;
    username: string;
    password: string;
    email: string;
    role: "admin" | "user";
    profile?: string;
    preferences: IUserPreferences;
    notifications: IUserNotification;
    phone_number: string;
    balance: number;
    verify_code?: string;
    is_banned: boolean;
    is_premium: boolean;
    is_verified: boolean;
    is_deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

type IUserNotify = "user:following" | "user:new_event" | "user:transaction" | "user:event_join";
type IUserNotifyType = "info" | "success" | "warning" | "error";
interface IUserPreferences {
    theme: "dark" | "light";
    notifications: IUserNotify[];
}

interface IUserNotification {
    type: IUserNotifyType;
    message: string;
    callbackUrl?: string;
    time: string;
}

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
