import storage from './storage'

const IpKey = 'UserIp';

export default {

    updateHandler: [],
    ipInfo: storage.get(IpKey),

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

    getIpInfo() {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await $api.getMemberIpInfo();
                console.log(result);
                this.ipInfo = result;
                storage.set(IpKey, result);
                resolve(result);
                this.raiseOnUpdate();
            } catch (e) {
                reject(e);
            }
        });
    }
}