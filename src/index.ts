class EventHub {
    private cache: { [key: string]: any[] } = {}
    on(eventName: string, fn: (...args: unknown[]) => void) {
        this.cache[eventName] = this.cache[eventName] || [];
        this.cache[eventName].push(fn);
    }
    emit(eventName: string, data?: unknown) {
        (this.cache[eventName] || []).forEach((fn: (arg0: unknown) => any) => fn(data));
    }
    off(eventName: string, fn: (arg0: unknown) => void) {
        const array = this.cache[eventName] || [];
        const index = array.findIndex(item => item === fn);
        index > -1 && array.splice(index, 1);
    }
}

export default EventHub;

