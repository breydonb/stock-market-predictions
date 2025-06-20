import type { ILogger } from "$lib/types/ILogger";

export class Logger implements ILogger{
    getTimestamp(): string {
        return new Date().toISOString();
    }
    private timestamp = new Date().toISOString();
    info (message: string, ...args: unknown[]) {
        console.log(`[INFO] ${message} @ ${this.getTimestamp()}`,...args);
    }

    error (message: string, ...args: unknown[]) {
        console.error(`[INFO] ${message} @ ${this.getTimestamp()}`,...args);
    }
    
    warn (message: string, ...args: unknown[]) {
        console.warn(`[INFO] ${message} @ ${this.getTimestamp()}`,...args);
    }
}