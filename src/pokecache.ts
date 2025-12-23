type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(timerInterval: number) {
        this.#interval = timerInterval;
        this.#startReapLoop();
    }

    #reap() {
        // Loop cache and delete entries older than interval
        for (const [k, v] of this.#cache) {
            if ((Date.now() - v.createdAt) > this.#interval) {
                this.#cache.delete(k);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    add<T>(key: string, val: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        return this.#cache.get(key)?.val;
    }
}