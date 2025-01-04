import storage from './storage'
import Vue from 'vue'

const CartKey = 'Car1Cart';
var oc = storage.get(CartKey);
if (!oc) {
    oc = [];
}
export default {

    updateHandler: [],

    cart: oc,

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

    async add(productID, count) {
        var found = false;
        for (var k in this.cart) {
            var p = this.cart[k];
            if (p.ProductID == productID) {
                p.Count += count;
                found = true;
                break;
            }
        }
        if (!found) {
            var p = await window.$api.getCartProduct([productID]);
            var pd = p.Product;
            pd.Stock = p.Stock.Stock;
            pd.Tags = p.Tag;
            pd.Count = count;
            pd.Gift = p.Gift;
            this.cart.push(pd);
        }
        storage.set(CartKey, this.cart);
        this.raiseOnUpdate();
    },
    upadteCount(productID, count) {
        var p = this.get(productID);
        if (p) {
            p.Count = count;
        }
        storage.set(CartKey, this.cart);
        this.raiseOnUpdate();
    },
    remove(productID){
        var p = this.get(productID);
        if(p){
            this.cart.remove(p);
            storage.set(CartKey, this.cart);
            this.raiseOnUpdate();
        }
    },
    get(productID) {
        for (var k in this.cart) {
            var p = this.cart[k];
            if (p.ProductID == productID) {
                return p;
            }
        }
        return null;
    },
    getCart() {
        return JSON.parse(JSON.stringify(this.cart))
    },
    clear() {
        this.cart = [];
        storage.remove(CartKey);
        this.raiseOnUpdate();
    }
}