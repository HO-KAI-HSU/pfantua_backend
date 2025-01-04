import Vue from 'vue'
import moment, { isDuration } from 'moment'

import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'


Vue.directive('select2', {
    inserted: function (el, binding, vnode) {
        if (binding.expression) {
            var val = window.utils.deepGet(vnode.context, binding.expression);
            if (val) {
                $(`option[value=${val}]`, el).attr('selected', 'selected');
            }
        }
        var sel2 = window.$(el).select2({
            language: 'zh-TW',
            //width: '100%',
            // 最多字元限制
            maximumInputLength: 10,
            // 最少字元才觸發尋找, 0 不指定
            minimumInputLength: 0,
            // 當找不到可以使用輸入的文字
            //tags: true,
        });
        sel2.on("select2:select", function (e) {
            if (binding.expression) {
                var val = $(el).select2('data');
                window.utils.deepSet(vnode.context, val[0].id, binding.expression);
            }
        });
    }
});


Vue.directive('ckeditor', {
    twoWay: true,
    inserted: function (el) {
    },
    bind: function (el, binding, vnode) {
        CKEDITOR.config.dialog_noConfirmCancel = true;
        var type = $(el).attr('ckeditor-type') || 'image';
        console.log(binding.expression + ' ' + type);
        var editor = CKEDITOR.replace(el, {
            height: 500,
            defaultLanguage: 'zh',
            removeButtons: "Image,Flash",
            filebrowserImageUploadUrl: config.host + '/api/backend/image/' + type
        });
        editor.setData(binding.value);
        editor.on('change', function () {
            window.utils.deepSet(vnode.context.$data, editor.getData(), binding.expression);
        });
        //editor.addContentsCss( config.host + "/api/css" );
        el.editor = editor;
    },
    update: function (el, binding, newVnode, oldVnode) {
        if (binding.value != el.editor.getData()) {
            setTimeout(() => {
                el.editor.setData(binding.value);
            }, 1000);
        }
    }
});


Vue.directive('ckeditorInline', {
    twoWay: true,
    inserted: function (el) {
    },
    bind: function (el, binding, vnode) {
        CKEDITOR.config.dialog_noConfirmCancel = true;
        var type = $(el).attr('ckeditor-type') || 'image';
        setTimeout(() => {
            var editor = CKEDITOR.inline(el, {
                defaultLanguage: 'zh',
                extraPlugins: 'uploadimage,dragresize',
                filebrowserImageUploadUrl: config.host + '/api/backend/image/' + type
            });
            editor.setData(binding.value);
            editor.on('change', function () {
                window.utils.deepSet(vnode.context.$data, editor.getData(), binding.expression);
            });
            el.editor = editor;
        });
    },
    update: function (el, binding, newVnode, oldVnode) {
        if (binding.value != el.editor.getData()) {
            el.editor.setData(binding.value);
        }
    }
});

Vue.directive('duallistbox', {
    twoWay: true,
    inserted: function (el) {
    },
    bind: function (el, binding, vnode) {
        setTimeout(() => {
            var list = $(el).bootstrapDualListbox({
                infoText: false,
                moveOnSelect: false
            });
            el.dualist = list;
            $(el).on('change', function () {
                window.utils.deepSet(vnode.context.$data, el.dualist.val(), binding.expression);
            });
            if (vnode) {
                window.utils.deepSet(vnode.context.$data, el.dualist.val(), binding.expression);
            }
        });
    },
    update: function (el, binding, newVnode, oldVnode) {

    }
});

Vue.directive('duallistbox2', {
    twoWay: true,
    inserted: function (el) {
    },
    bind: function (el, binding, vnode) {

    },
    update: function (el, binding, newVnode, oldVnode) {
        setTimeout(() => {
            if (!el.hasDuallistbox2) {
                var list = $(el).bootstrapDualListbox({
                    infoText: false,
                    moveOnSelect: false
                });
                el.dualist = list;
                $(el).on('change', function () {
                    window.utils.deepSet(newVnode.context.$data, el.dualist.val(), binding.expression);
                });
                window.utils.deepSet(newVnode.context.$data, el.dualist.val(), binding.expression);
                el.hasDuallistbox2 = true;
            }
        });
    }
});

Vue.directive('colorPicker', {
    inserted: function (el, binding, vnode) {
        var e = window.$(el);
        var color = window.utils.deepGet(vnode.context.$data, binding.expression);
        window.$('.fa-square', e).css('color', color);
        window.$('input', e).val(color);
        e.colorpicker();
        e.on('colorpickerChange', function (event) {
            color = event.color.toString();
            window.$('.fa-square', e).css('color', color);
            window.$('input', e).val(color);
            window.utils.deepSet(vnode.context.$data, color, binding.expression);
        });

    }
});

Vue.directive('lightbox', {
    bind: function (el, binding, vnode) {
        var cls = 'lb-' + (new Date().getTime()) + '-' + Math.floor(Math.random() * 100+1);
        $(el).addClass(cls);
        var img = $(el).data('img') || 'img-wrap';        
        setTimeout(() => {           
            lightGallery($(el).get()[0], {
                selector: '.' + cls + " ." + img,
                plugins: [lgThumbnail, lgVideo],
                //- videojs: true,
                //- videojsOptions: {
                //-     muted: true,
                //- },
                thumbnail: true,
                licenseKey: "your_license_key",
            });
        }, 1000);
    }
});