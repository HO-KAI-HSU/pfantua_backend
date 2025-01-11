<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">相關資源管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">相關資源管理</li>
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
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card card-primary card-outline card-tabs">
              <div class="card-header p-0 pt-1 border-bottom-0">
                <ul
                  class="nav nav-tabs"
                  id="custom-tabs-two-tab"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="custom-tabs-two-relatedresource-tab"
                      data-toggle="pill"
                      href="#custom-tabs-two-relatedresource"
                      role="tab"
                      aria-controls="custom-tabs-two-relatedresource"
                      aria-selected="true"
                      >相關資源管理</a>
                  </li>
                </ul>
                <button
                  class="btn btn-success"
                  v-auth="'AccountCreate'"
                  style="
                    float: right;
                    position: relative;
                    right: 10px;
                    top: -43px;
                  "
                  @click="showAdd()"
                >
                  新增
                </button>
              </div>
              <div class="card-body">
                <div class="tab-content" id="custom-tabs-two-tabContent">
                  <div
                    class="tab-pane fade active show"
                    id="custom-tabs-two-relatedresource"
                    role="tabpanel"
                    aria-labelledby="custom-tabs-two-relatedresource-tab"
                  >
                    <div id="tabRelatedResources" v-auth="'RelatedResource'"></div>
                  </div>
                </div>
              </div>
              <!-- /.card -->
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
          <label>相關資源標題</label>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入標題"
            v-model="currentItem.Title"
            required/>
        </div>
        <div class="form-group">
          <label>相關資源類型</label>
          <select
            class="form-control"
            required
            v-model="currentItem.RelatedResourceCategoryID">
            <option
              :value="c.RelatedResourceCategoryID"
              v-for="c in Categories"
              :key="c.RelatedResourceCategoryID">
              {{ c.Name }}
            </option>
          </select>
        </div> 
        <div class="form-group">
          <label>相關資源連結</label>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入連結"
            v-model="currentItem.RelatedResourceUrl"/>
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
export default {
  data() {
    return {
      type: null,
      items: [],
      Categories: [],
      mlItemTitle: "",
      currentItem: {
        RelatedResourceCategoryID: 1,
        Title: "",
        RelatedResourceUrl: "",
        IsActive: true
      }
    };
  },
  mounted() {
    window.model = this;
    this.load();
  },
  methods: {
    async load() {
      this.loadRelatedResource();
    },
    async loadRelatedResource() {
      var cols = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        {
          title: "相關資源標題",
          data: "Title",
        },
        {
          title: "相關資源類型",
          data: "Category",
          render: function (data, type, row, meta) {
            return data.Name;
          },
        },
        {
          title: "相關資源連結",
          data: "RelatedResourceUrl",
        },
        {
          title: "發布狀態",
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
          data: "RelatedResourceID",
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
      this.items = await this.$api.getRelatedResources();
      this.Categories = await this.$api.getRelatedResourceCategories();
      var catMap = {};
      this.Categories.forEach((c) => (catMap[c.RelatedResourceCategoryID] = c));
      this.items.forEach((t) => {
        t.Category = catMap[t.RelatedResourceCategoryID];
      });
      this.createDataTable("#tabRelatedResources", cols, this.items, {
        bSort: false,
        paging: false,
      });
    },
    showAdd() {
      this.mlItemTitle = "新增相關資源內容";
      this.currentItem = {
        RelatedResourceCategoryID: 1,
        Title: "",
        RelatedResourceUrl: "",
        IsActive: true
      };
      this.Image = null;
      this.$bvModal.show("mlItem");
      setTimeout(() => {
        this.imageUpload(".image-box", (f) => (this.Image = f));
      });
    },
    editItem(id) {
      this.mlItemTitle = "修改相關資源內容";
      this.items.forEach((i) => {
        if (i.RelatedResourceID == id) {
          this.currentItem = i;
        }
      });
      this.currentItem.IsActive = this.currentItem.IsActive == "1" ? true : false;
      this.$bvModal.show("mlItem");
    },
    async delItem(id) {
      $.each(this.items, (i, r) => {
        if (r.RelatedResourceID == id) {
          this.currentItem = r;
        }
      });
      if (this.currentItem) {
        confirm("請問要刪除相關資源：" + this.currentItem.Title, async (r) => {
          await this.$api.deleteRelatedResource(this.currentItem.RelatedResourceID);
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
      this.load();
    },
    async mlDialogOK(e) {
      e.preventDefault();
      if (!this.validate("#mlItem")) {
        return;
      }
      try {
        this.currentItem.IsActive = this.currentItem.IsActive ? "1" : "0";
        if (this.currentItem.RelatedResourceID) {
          await this.$api.updateRelatedResource(this.currentItem.RelatedResourceID, this.currentItem);
        } else {
          this.currentItem.RelatedResourceID = await this.$api.createRelatedResource(
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
      await this.$api.updateRelatedResourceStatus(id, item);
      this.loadRelatedResource();
    }
  },
  watch: {
    type() {
      this.loadRelatedResource();
    },
  },
};
</script>