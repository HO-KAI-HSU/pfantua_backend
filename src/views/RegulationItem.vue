<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">法規章程內容管理</h1>
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
    <section class="content" id="doc">
      <div class="container-fluid">
        <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">{{ Title }}</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <form role="form">
              <div class="form-group">
                <label>法規章程標題</label>
                <input
                  type="text"
                    class="form-control"
                    required
                    placeholder="請輸入法規章程標題，最多100個字"
                    maxlength="100"
                    v-model="regulation.Title"/>
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
                      @click="download(docfile.Url)"
                    >
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
              <div class="form-group">
                <label>發布狀態</label>
                <select class="form-control" v-model="regulation.IsActive">
                  <option :value="true">發布</option>
                  <option :value="false">隱藏</option>
                </select>
              </div>
              <!-- /.card-body -->
            </form>
          </div>
          <div class="card-footer">
            <button
              type="button"
              class="btn btn-primary pull-right w150"
              @click="save()"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- /.content -->
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      IsNew: "",
      Title: "",
      RegulationList: [],
      regulation: {
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
    this.IsNew = (this.$route.params.id == "new");
    if (!this.IsNew) {
      this.RegulationList = await this.$api.getRegulation(this.$route.params.id);
      this.regulation = this.RegulationList[0];
      this.regulation.IsActive = this.regulation.IsActive == "1" ? true : false;
      this.docfile.Url = this.regulation.FileUrl;
      this.docfile.SrcFileName = this.regulation.FileUrl;
      this.Title = "編輯法規章程內容";
    } else {
      this.Title = "新增法規章程內容";
    }

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
    async save() {
      if (!this.validate("#doc")) {
        return;
      }
      this.regulation.FileUrl = this.docfile.Url;
      this.regulation.IsActive = this.regulation.IsActive ? "1" : "0";
      if (this.IsNew) {
        var did = await this.$api.createRegulation(this.regulation);
      } else {
        await this.$api.updateRegulation(this.$route.params.id, this.regulation);
      }
      alert("儲存完成", () => {
        this.$router.push(`/regulations`);
      });
    },
    async updateItemPublishStatus(id, isActive) {  
      var item = {
        IsActive: isActive,
      };    
      await this.$api.updateRegulationStatus(id, item);
      this.loadRegulation();
    }
  },
};
</script>