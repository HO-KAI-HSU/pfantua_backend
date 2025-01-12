<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Banner管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">Banner管理</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content" id="tabs">
      <div class="container-fluid">
        <div class="row" v-if="false">
          <div class="col-12 col-sm-1">選擇分類</div>
          <div class="col-12 col-sm-11">
            <select class="form-control" v-model="type">
              <option value="0">首頁大廣告</option>
              <option value="4">手機板首頁大廣告</option>
              <option value="1">頂部廣告</option>
              <option value="2">首頁底部廣告</option>
              <option value="3">右邊浮動廣告</option>
            </select>
          </div>
        </div>
        <div class="row" style="margin-top: 10px">
          <div class="col-12 col-sm-12">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title" style="padding-top: 10px">Banner</h3>
                <button
              class="btn btn-default"
              style="float: right"
              @click="showAdd()"
            >
              新增
            </button>
              </div>
              <div class="card-body">
                <div id="tabItems"></div>
              </div>
              <div class="card-footer" v-if="false">
                <button class="btn btn-primary" @click="updateSort()">
                  儲存排序
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->

    <!-- 廣告Dialog -->
    <b-modal
      id="mlItem"
      :title="mlItemTitle"
      ok-title="儲存"
      cancel-title="取消"
      @ok="mlDialogOK"
      v-if="currentItem"
      ok-only
    >
      <div class="card-body">
        <div class="form-group">
          <label>標題</label>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入標題"
            v-model="currentItem.BannerName"
            required
          />
        </div>
        <div class="form-group">
          <label>網址</label>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入連結的網址"
            v-model="currentItem.TargetUrl"
          />
        </div>
        <div class="form-group">
          <label>圖片</label>
          <div id="mlBannerImage" class="image-box">
            <img :src="currentItem.ImageUrl | imageCDN" />
            <div class="change-btn">更換</div>
          </div>
        </div>
        <div class="form-group">
          <label>啟用</label>
          <select class="form-control" v-model="currentItem.IsActive">
            <option :value="true">啟用</option>
            <option :value="false">停用</option>
          </select>
        </div>
      </div>
    </b-modal>
    <!-- 廣告Dialog -->
  </div>
</template>
<script>
import $ from "jquery";
var allbanner = [];
export default {
  data() {
    return {
      type: null,
      items: [],
      mlItemTitle: "",
      currentItem: {
        BannerName: "",
        BannerType: "0",
        ImageUrl: "",
        TargetUrl: "",
        Sort: 0,
        IsActive: true,
        CreateTime: ""
      },
      Image: null,
    };
  },
  mounted() {
    window.model = this;
    this.type = "0";
    this.load();
  },
  methods: {
    async load() {
      allbanner = (await this.$api.getBanners()).groupBy((b) => b.BannerType);
      this.loadBanner();
    },
    async loadBanner() {
      if (this.type == null || !allbanner) return;
      this.items = allbanner[parseInt(this.type)];
      var cols = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        {
          title: "圖片",
          data: "ImageUrl",
          render: function (data, type, row, meta) {
            return `<a href="${
              row["TargetUrl"]
            }" target="_blank"><img src="${window.Filter.imageCDN(
              data
            )}" alt="" style="max-width: 200px;"/></a>`;
          },
        },
        {
          title: "Banner標題",
          data: "BannerName",
          render: function (data, type, row, meta) {
            if (!data) {
              return "";
            }
            return `<p>${data}</p>`;
          },
        },
        {
          title: "啟用",
          data: "IsActive",
          render: function (data) {
            if (data == "1") {
              return '<span class="badge badge-success">發布</span>';
            }
            return '<span class="badge badge-warning">隱藏</span>';
          },
        },
        {
          title: "功能",
          data: "BannerID",
          width: 180,
          render: function (data, type, row, meta) {
            return (
              '<button type="button" class="btn btn-info" onclick="window.model.editItem(' +
              data +
              ')">編輯</button>&nbsp;' +
              (row["IsActive"] == "1"
                ? '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ', 0)">隱藏</button>'
                : '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ', 1)">上架</button>') +
              '<button type="button" class="btn btn-danger" onclick="window.model.delItem(' +
              data +
              ')">刪除</button>'
            );
          },
        },
      ];

      //this.items.sort((a, b) => a.Sort - b.Sort);
      this.createDataTable("#tabItems", cols, this.items, {
        bSort: false,
        paging: false,
      });
    },
    showAdd() {
      this.mlItemTitle = "新增Banner";
      this.currentItem = {
        BannerName: "",
        ImageUrl: "",
        StartTime: "",
        EndTime: "",
        IsActive: true,
        CreateTime: "",
        Sort: 0,
        BannerType: this.type,
        TargetUrl: "",
        CreateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      this.Image = null;
      this.$bvModal.show("mlItem");
      setTimeout(() => {
        this.imageUpload(".image-box", (f) => (this.Image = f));
      });
    },
    editItem(id) {
      this.mlItemTitle = "修改Banner";
      this.items.forEach((i) => {
        if (i.BannerID == id) {
          this.currentItem = i;
        }
      });
      this.currentItem.StartTime = moment(this.currentItem.StartTime).format(
        "YYYY-MM-DD"
      );
      this.currentItem.EndTime = moment(this.currentItem.EndTime).format(
        "YYYY-MM-DD"
      );
      this.currentItem.IsActive = this.currentItem.IsActive == "1" ? true : false;
      this.Image = null;
      this.$bvModal.show("mlItem");
      setTimeout(() => {
        this.imageUpload(".image-box", (f) => (this.Image = f));
      });
    },
    async delItem(id) {
      $.each(this.items, (i, r) => {
        if (r.BannerID == id) {
          this.currentItem = r;
        }
      });
      if (this.currentItem) {
        confirm("請問要刪除廣告：" + this.currentItem.BannerName, async (r) => {
          await this.$api.deleteBanner(this.currentItem.BannerID);
          this.load();
        });
      }
    },
    async updateSort() {
      var data = [];
      var first = null;
      $(".document-sort").each((idx, i) => {
        var e = $(i);
        if (e.val()) {
          data.push({
            BannerID: e.data("id"),
            Sort: parseInt(e.val()),
          });
        } else {
          if (!first) {
            first = e;
          }
        }
      });
      if (first) {
        first.focus();
        return;
      }

      await this.$api.updateBannerSort({
        Data: data,
      });
      this.load();
    },
    async mlDialogOK(e) {
      e.preventDefault();
      if (!this.validate("#mlItem")) {
        return;
      }
      if (this.Image) {
         var response = await this.$api.upload(
          '/pfantua/public/backend/api/uploadImage/banner',
          this.Image
        );
        this.currentItem.ImageUrl =  response.Item2;
        this.currentItem.IsActive = this.currentItem.IsActive ? "1" : "0";
      }
      if (!this.currentItem.ImageUrl) {
        alert("請選擇圖片");
        return;
      }
      try {
        if (this.currentItem.BannerID) {
          await this.$api.updateBanner(this.currentItem.BannerID, this.currentItem);
        } else {
          this.currentItem.BannerID = await this.$api.createBanner(
            this.currentItem
          );
        }
        this.$bvModal.hide("mlItem");
        this.load();
      } catch (ex) {
        console.log(ex);
      }
      return;
    },
    async updateItemPublishStatus(id, isActive) {
      var item = {
        IsActive: isActive,
      };
      await this.$api.updateBannerStatus(id, item);
      this.load();
    },
  },
  watch: {
    type() {
      this.loadBanner();
    },
  },
};
</script>