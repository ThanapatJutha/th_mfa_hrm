/**
 * Shared API response envelope types.
 * All backend responses are expected to conform to ApiResponse<T>.
 */

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export interface ApiError {
    message: string;
    code: string;
    statusCode: number;
}
