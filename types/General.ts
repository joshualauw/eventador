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

type UnwrapApiResponse<T> = T extends ApiResponse<infer U> ? U : never;
