interface FetchOptions {
    method?: "POST" | "PUT" | "GET" | "PATCH" | "DELETE";
    body?: any;
    query?: any;
    headers?: any;
}

interface ApiResponse<T> {
    data: T;
    message: string;
}

interface ApiError {
    status: number;
    message: string;
    errors?: string[];
    stack: string;
}

interface OSMResponse {
    display_name: string;
    lat: string;
    lon: string;
}

interface BaseModel {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

interface AgoraOptions {
    appId: string;
    channel: string;
    token: string;
    uid: string;
    role: "host" | "audience";
}

interface IPusherNotifyPayload {
    message: string;
    callbackUrl: string | undefined;
    type: "error" | "info" | "success" | "warning";
    time: Date;
}

type UnwrapApiResponse<T> = T extends ApiResponse<infer U> ? U : never;
