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
    reports: IReport[];
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
