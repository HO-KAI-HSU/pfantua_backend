export default {
    storage : sessionStorage,

    set(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    },

    get(key) {
        var value = this.storage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    },

    remove(key) {
        this.storage.removeItem(key);
    },

    clear() {
        this.storage.clear();
    }
}