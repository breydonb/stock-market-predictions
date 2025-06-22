import type { ResourceState } from "$lib/types/ResourceState";

export function createApiState<T>(overrides: Partial<ResourceState<T>> = {}): ResourceState<T> {
    return {
        data: null,
        loading: false,
        error: null,
        ...overrides
    }
}