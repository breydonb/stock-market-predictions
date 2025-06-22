import { writable } from "svelte/store";

let initial: 'light' | 'dark' = 'light'

if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    initial = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    
}

export const theme = writable<'light' | 'dark'>(initial);

theme.subscribe((value) => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('dark', value === 'dark');
    localStorage.setItem('theme', value);
});