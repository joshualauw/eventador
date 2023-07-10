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
