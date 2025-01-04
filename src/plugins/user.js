import storage from './storage'

const UserKey = 'NPMBackendUser';
export default {

    updateHandler: [],

    user: storage.get(UserKey),

    addOnUpdateHandler(callback) {
        for (var k in this.updateHandler) {
            if (this.updateHandler[k] == callback) {
                return;
            }
        }
        this.updateHandler.push(callback);

        callback(this);
    },

    removeOnUpdateHandler(callback) {
        this.updateHandler.remove(callback);
    },

    raiseOnUpdate() {
        this.updateHandler.forEach(handler => {
            handler(this);
        });
    },

    setUser(result){
        this.user = result;
        storage.set(UserKey, result);
        this.raiseOnUpdate();
    },

    login(userName, password) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await $api.login(userName, password);
                this.user = result;
                storage.set(UserKey, result);
                resolve(result);

                this.raiseOnUpdate();
            } catch (e) {
                reject(e);
            }
        });
    },

    logout(){
        storage.remove(UserKey);
        this.user = null;
        this.raiseOnUpdate();
    }
}