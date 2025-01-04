import $ from 'jquery'
import Vue from 'vue'

function readURL(input, img) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            img.attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

Vue.prototype.fileUpload = (el, callback) => {
    console.log("fileUpload");
    console.log(el);
    var e = $(el);
    var accept = '';
    if (e.data('accept')) {
        accept = `accept="${e.data('accept')}"`;
    }
    var flp = $(`<input type="file" ${accept} style="display:none"/>`);
    e.parent().append(flp);
    flp.change(() => {
        console.log("fileUpload 觸發");
        var input = flp.get()[0];
        var file = input.files[0];
        if (callback) {
            callback(file);
        }
    });
    e.click(ev => {
        ev.preventDefault();
        flp.click();
    });
}

Vue.prototype.startFileUpload = (callback, accept) => {
    if (accept) {
        accept = `accept="${accept}"`;
    }
    var flp = $(`<input type="file" ${accept} style="display:none"/>`);
    $('html body').parent().append(flp);
    flp.change(() => {
        console.log("startFileUpload 觸發");
        var input = flp.get()[0];
        var file = input.files[0];
        if (callback) {
            callback(file);
        }
    });
    flp.click();
}

Vue.prototype.fileUploadBase64 = (el, callback) => {
    var flp = $('<input type="file" style="display:none"/>');
    var e = $(el);
    e.parent().append(flp);
    flp.change(() => {
        if (callback) {
            var input = flp.get()[0];
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    callback(input.files[0], e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }

        }
    });
    e.click(ev => {
        ev.preventDefault();
        flp.click();
    });
}

Vue.prototype.imageUpload = (el, callback) => {
    var flp = $('<input type="file" style="display:none" accept="image/*"/>');
    var e = $(el);
    e.parent().append(flp);
    var img = $('img:first', e);
    flp.change(() => {
        var input = flp.get()[0];
        var file = input.files[0];
        readURL(input, img);
        if (callback) {
            callback(file);
        }
    });
    e.click(ev => {
        ev.preventDefault();
        flp.click();
    });
}