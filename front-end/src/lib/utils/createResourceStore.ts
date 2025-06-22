import { get, writable } from 'svelte/store';
import type { ResourceState } from "$lib/types/ResourceState";

export function createResourceStore<T>(){
    const store = writable(new Map<string, ResourceState<T>>);
    async function fetchResource( key: string, fetcher: () => Promise<T>, forceRefresh = false ): Promise<ResourceState<T>>{
        const current = get(store);
        const existing = current.get(key);

        if(!forceRefresh && existing?.data && !existing.error) return existing;

        store.update((map) => {
            const updated = new Map(map);
            updated.set(key, { loading: true, error: null, data: existing?.data ?? null});
            return updated;
        });

        let data: T | null = null;

        try {
            data = await fetcher();
            store.update((map) => {
                const updated = new Map(map);
                updated.set(key, { loading: false, error: null, data});
                return updated;
            });
        } catch (e:unknown) {
            const error = e instanceof Error ? e.message : String(e);
            store.update((map) => {
                const updated = new Map(map);
                updated.set(key, { loading: false, error, data: existing?.data ?? null});
                return updated;
            });
        }
        return { loading: false, error: null, data: existing?.data ?? null };
    }

    return {
        subscribe: store.subscribe,
        fetchResource
    }
}