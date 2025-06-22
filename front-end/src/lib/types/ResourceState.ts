export type ResourceState<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    lastFetched?: number;
} 