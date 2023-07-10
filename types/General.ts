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

type UnwrapApiResponse<T> = T extends ApiResponse<infer U> ? U : never;
