interface IUser {
    _id: string;
    username: string;
    password: string;
    email: string;
    role: "admin" | "user";
    profile?: string;
    preferences: {
        theme: "dark" | "light";
        notifications: ("user:following" | "user:new_event" | "user:transaction" | "user:event_join")[];
    };
    notifications: {
        type: "info" | "success" | "warning" | "error";
        message: string;
        callbackUrl: string;
        time: Date;
    };
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
