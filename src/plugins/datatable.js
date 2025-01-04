import $ from "jquery";
import "datatables.net";
import Vue from 'vue'

Vue.prototype.createDataTable = function (container, cols, data, option) {
    var opt = $.extend({
        pageLength: 100,
        columns: cols,
        language: this.$lang.datatable,
        data: data,
        //order: [[0, "desc"]],
        dom: "Bfrtip",
        fixedHeader: {
            header: false,
            footer: false
        },
        buttons: []
    }, option);
    $(container).empty();
    var table = $("<table></table>");
    $(container).append(table);
    table.addClass("table table-striped table-bordered");
    table.css("width", "100%");
    return table.DataTable(opt);
}