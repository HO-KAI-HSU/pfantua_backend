<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">法規章程管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">法規章程管理</li>
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
                      id="custom-tabs-two-regulation-tab"
                      data-toggle="pill"
                      href="#custom-tabs-two-regulation"
                      role="tab"
                      aria-controls="custom-tabs-two-regulation"
                      aria-selected="true"
                      >法規章程管理</a>
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
                    id="custom-tabs-two-regulation"
                    role="tabpanel"
                    aria-labelledby="custom-tabs-two-regulation-tab"
                  >
                    <div id="tabRegulations" v-auth="'Regulation'"></div>
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
    <div class="card card-info">
      <div class="card-body">
        <form role="form">
          <div class="form-group">
            <label>法規章程標題</label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入標題"
              v-model="currentItem.Title"
              required/>
          </div>
          <div class="form-group">
            <label>法規章程檔案上傳</label>
            <div class="input-group">
              <div class="custom-file">
                <input
                  type="text"
                  class="form-control"
                  v-model="docfile.SrcFileName"
                  disabled
                />
              </div>
              <div class="input-group-append">
                <button
                  class="input-group-text"
                  @click="download(docfile.Url)">
                  下載
                </button>
                <button
                  class="input-group-text"
                  id="upload-plan-file"
                  data-accept="application/*, text/*">
                  上傳
                </button>
              </div>
            </div>
            <div
              class="progress progress-xxs mb-3"
              v-if="docfile.Status > 0">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                :aria-valuenow="docfile.Progress"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="`width: ${docfile.Progress}%`"
              ></div>
            </div>
          </div>
        </form>
        <div class="form-group">
          <label>啟用</label>
          <select class="form-control" v-model="currentItem.IsActive">
            <option :value="true">啟用</option>
            <option :value="false">停用</option>
          </select>
        </div>
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
      mlItemTitle: "",
      currentItem: {
        RegulationID: 1,
        Title: "",
        FileUrl: "",
        IsActive: true
      },
      docfile: {
        Status: 0,
        CancelToken: null,
        Progress: 0,
        SrcFileName: "",
        Url: "",
        File: null,
      },
    };
  },
  async mounted() {
    window.model = this;
    this.load();

    this.$nextTick(() => {
      this.fileUpload(
        "#upload-plan-file",
        this.callback(this.docfile, "/pfantua/public/backend/api/uploadFile/regulation")
      );
    });
  },
  methods: {
    callback(data, url) {
      return (file) => {
        data.Status = 1;
        data.CancelToken = this.$api.getCancelToken();
        data.Progress = 0;
        data.SrcFileName = file.name;
        data.File = file;
        var upload = async () => {
          this.$api.setEnableBlockUI(false);
          var response = await this.$api.upload(
            url,
            file,
            data.CancelToken,
            (progress) => {
              if (progress >= 100) {
                alert("上傳完成", () => {
                  data.Status = 2;
                });
              }
              data.Progress = progress;
            }
          );
          data.Url = response.Item2;
          this.$api.setEnableBlockUI(true);
        };
        if (/.*\.mp4$/g.test(data.SrcFileName)) {
          this.readVideoLength(file, async (length) => {
            data.VideoLength = length;
            upload();
          });
        } else {
          upload();
        }
      };
    },
    async load() {
      this.loadRegulation();
    },
    async loadRegulation() {
      var cols = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        {
          title: "法規章程標題",
          data: "Title",
        },
        {
          title: "啟用",
          data: "IsActive",
          render: function (data) {
            if (data == "1") {
              return '<span class="badge badge-success">啟用</span>';
            }
            return '<span class="badge badge-warning">停用</span>';
          },
        },
        {
          title: "功能",
          data: "RegulationID",
          width: 180,
          render: function (data) {
            return (
              '<button type="button" class="btn btn-info" onclick="window.model.editItem(' +
              data +
              ')">編輯</button>&nbsp;' +
              (row["IsActive"] == "1"
                ? '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ')">隱藏</button>'
                : '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ')">上架</button>') +
              '<button type="button" class="btn btn-danger" onclick="window.model.delItem(' +
              data +
              ')">刪除</button>'
            );
          },
        },
      ];
      this.items = await this.$api.getRegulations(this.$route.params.id);
      this.createDataTable("#tabRegulations", cols, this.items, {
        bSort: false,
        paging: false,
      });
    },
    showAdd() {
      this.mlItemTitle = "新增法規章程內容";
      this.currentItem = {
        RegulationID: 1,
        Title: "",
        FileUrl: "",
        IsActive: true
      };
      this.$bvModal.show("mlItem");
    },
    editItem(id) {
      this.mlItemTitle = "修改法規章程內容";
      this.items.forEach((i) => {
        if (i.RegulationID == id) {
          this.currentItem = i;
        }
      });
      this.currentItem.IsActive = this.currentItem.IsActive == "1" ? true : false;
      this.$bvModal.show("mlItem");
      this.docfile.Url = this.currentItem.FileUrl;
      this.docfile.SrcFileName = this.currentItem.FileUrl;
    },
    async delItem(id) {
      $.each(this.items, (i, r) => {
        if (r.RegulationID == id) {
          this.currentItem = r;
        }
      });
      if (this.currentItem) {
        confirm("請問要刪除法規章程：" + this.currentItem.Title, async (r) => {
          await this.$api.deleteRegulation(this.currentItem.RegulationID);
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
      this.currentItem.FileUrl = this.docfile.Url;
      if (!this.validate("#mlItem")) {
        return;
      }
      try {
        this.currentItem.IsActive = this.currentItem.IsActive ? "1" : "0";
        if (this.currentItem.RegulationID) {
          await this.$api.updateRegulation(this.currentItem.RegulationID, this.currentItem);
        } else {
          this.currentItem.RegulationID = await this.$api.createRegulation(
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
  },
  watch: {
    type() {
      this.loadRegulation();
    },
  },
};
</script>