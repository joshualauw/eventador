export function errorHandler(error: any) {
    const err = error as { data: ApiError };
    console.error(err);
    return err.data;
}
