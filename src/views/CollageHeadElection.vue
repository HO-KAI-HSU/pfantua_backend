<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">院長遴選內容管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">院長遴選管理</li>
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
                <label>院長遴選標題</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="請輸入院長遴選標題，最多100個字"
                  maxlength="100"
                  v-model="collageHeadElection.Title"/>
              </div>
              <div class="form-group">
                <label>院長遴選年分</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder=""
                  maxlength="10"
                  v-model="collageHeadElection.Year"/>
              </div>
              <div class="form-group">
                <label>院長遴選簡介</label>
                <textarea
                  rows="8"
                  class="form-control"
                  required
                  v-ckeditor="collageHeadElection.Content"/>
              </div>
              <div class="form-group">
                <label>檔案上傳</label>
                <div class="input-group">
                  <div class="drag-area" @dragover="fileDragover" @drop="fileDrop">
                    <div class="uploader-tips" id="upload-drag-plan-file">
                      <span>將文件拖曳至此</span>
                    </div>
                  </div>
                  <div class="filebox">
                    <p v-if="FileList.length < 1">暫無檔案</p>
                    <ol>
                        <li v-for="(item, index) in FileList" :key="index">
                          {{item.FileName}}
                            <button
                            class="btn btn-default"
                            @click="download(item.FileUrl)"
                            >
                              下載
                            </button>
                            <button
                            class="btn btn-default"
                            @click="fileRemove(index)"
                            >
                              移除
                            </button>
                        </li>
                    </ol>
                  </div>
                </div>
                <div
                  class="progress progress-xxs mb-3"
                  v-if="docfile.Status > 0"
                >
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
      MAX_FILE_SIZE: 4 * 1000 * 1000,
      list:[],
      FileList: [],
      IsNew: true,
      Title: "",
      collageHeadElection: {
        Title: "",
        Content: "",
        IsActive: true,
      },
      docfile: {
        Status: 0,
        CancelToken: null,
        Progress: 0,
        SrcFileName: "",
        Url: "",
        File: null,
      }
    };
  },
  async mounted() {
    window.model = this;
    this.IsNew = this.$route.params.id == "new";
    if (!this.IsNew) {
      this.list = await this.$api.getCollageHeadElection(this.$route.params.id);
      this.collageHeadElection = this.list[0];
      this.collageHeadElection.IsActive = this.collageHeadElection.IsActive == "1" ? true : false;
      this.collageHeadElection.CollageHeadElectionFiles.forEach((file) => {
        this.FileList.push({
          FileName: file.Name,
          FileUrl: file.Url,
        });
      });
      this.Title = "編輯院長遴選";
    } else {
      this.Title = "新增院長遴選";
    }
    this.load();
  },
  methods: {
    async load() {},
    async save() {
      if (!this.validate("#doc")) {
        return;
      }
      this.collageHeadElection.CollageHeadElectionFiles = [];
      await this.FileList.forEach((file) => {
        this.collageHeadElection.CollageHeadElectionFiles.push({
          Name: file.FileName,
          Url: file.FileUrl,
        });
      });

      this.collageHeadElection.IsActive = this.collageHeadElection.IsActive ? "1" : "0";
      if (this.IsNew) {
        await this.$api.createCollageHeadElection(this.collageHeadElection);
      } else {
        await this.$api.updateCollageHeadElection(this.$route.params.id, this.collageHeadElection);
        console.log(this.collageHeadElection);
      }
      alert("儲存完成", () => {
        this.$router.push(`/collageHeadElections`);
      });
    },
    uploadDragFile(file, callback) {
      callback(file);
    },
    callback(data, url, type) {
      console.log('callback');
      return async (file) => {
        data.Status = 1;
        data.CancelToken = this.$api.getCancelToken();
        data.Progress = 0;
        data.SrcFileName = file.name;
        data.File = file;
        this.$api.setEnableBlockUI(false);
        var response = await this.$api.upload(
          url,
          file,
          data.CancelToken,
          (progress) => {
            if (progress >= 100) {
              alert("上傳完成", () => {
                data.Status = 2;
                data.Progress = 0;
              });
              return;
            }
            data.Progress = progress;
          }
        );
        data.Url = response.Item2;
        if (type === "collageHeadElectionFile") {
          this.FileList.push({
            FileName: file.name,
            FileUrl: response.Item2,
          });
        }
        this.$api.setEnableBlockUI(true);
      };
    },
    download(url) {
      window.open(this.$options.filters.imageCDN(url));
    },
    fileRemove(index) {
        confirm("請問要刪除此檔案?", async (r) => {
          this.FileList.splice(index, 1);
        });  
    },
    fileDragover (e) {
      e.preventDefault()
    },
    fileDrop (e) {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      console.log('拖曳放開滑鼠時')

      if (!file) return
      if (file.size > this.MAX_FILE_SIZE) {
        alert('文件大小不能超過4MB');
        return;
      }
      this.uploadDragFile(file, 
        this.callback(this.docfile, "/pfantua/public/backend/api/uploadFile/collageHeadElection", "collageHeadElectionFile")
      );
    },
  },
};
</script>