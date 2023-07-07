interface IUser {
    _id: string;
    username: string;
    password: string;
    role: "admin" | "user";
    profile?: string;
    preferences: {
        theme: "dark" | "light";
        notifications: "user:following" | "user:new_event" | "user:transaction" | "user:event_join"[];
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
