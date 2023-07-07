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
