<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">活動花絮內容管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">活動花絮內容管理</li>
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
                <label>活動花絮標題</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="請輸入活動花絮標題，最多100個字"
                  maxlength="100"
                  v-model="activityHistory.Activity.Title"/>
              </div>
              <div class="form-group">
                <label>發布狀態</label>
                <select class="form-control" v-model="activityHistory.Activity.IsActive">
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
        <div class="card card-primary">
          <div class="card-header">
            <h3 class="card-title">活動花絮圖片編輯</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <div
              class="callout callout-info"
              v-for="(activityImageFile, i) in activityImageFiles"
              :id="'activityimage-' + (i + 1)"
              :key="i">
              <h5>第{{ i + 1 }}張</h5>
              <button
                type="button"
                class="close"
                style="position: relative; top: -30px"
                @click="removeActivityImage(activityImageFile)">
                <span aria-hidden="true">×</span>
              </button>
              <hr />
              <div class="form-group">
                <label class="col-sm-2 col-form-label">活動花絮圖片標題</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題 (最多100個字)"
                    required
                    v-model="activityImageFile.Name"
                  />
                </div>
              </div>
              <div class="form-group">
                <label>活動花絮圖片上傳</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input
                      type="text"
                      class="form-control"
                      v-model="activityImageFile.Imagefile.SrcFileName"
                      disabled
                    />
                  </div>
                  <div class="input-group-append">
                    <button
                      class="input-group-text"
                      @click="download(activityImageFile.Imagefile.Url)">
                      下載
                    </button>
                    <button
                      class="input-group-text"
                      :id="'upload-plan-file-' + '1-' + i"
                      data-accept="image/*"
                      @click="checkActiveImageIndex(1, i)">
                      上傳
                    </button>
                  </div>
                </div>
                <div class="progress progress-xxs mb-3"
                  v-if="activityImageFile.Imagefile.Status > 0">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    :aria-valuenow="activityImageFile.Imagefile.Progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="`width: ${activityImageFile.Imagefile.Progress}%`"
                  ></div>
                </div>
              </div>
            </div>
            <button class="btn btn-success" @click="addActivityImage">
              新增圖片編輯框
            </button>
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
        <div class="card card-primary">
          <div class="card-header">
            <h3 class="card-title">活動花絮影片連結編輯</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <div
              class="callout callout-info"
              v-for="(activityVideoFile, i) in activityVideoFiles"
              :id="'activityvideo-' + (i + 1)"
              :key="i" >
              <h5>第{{ i + 1 }}個</h5>
              <button
                type="button"
                class="close"
                style="position: relative; top: -30px"
                @click="removeActivityVideo(activityVideoFile)">
                <span aria-hidden="true">×</span>
              </button>
              <hr />
              <div class="form-group">
                <label class="col-sm-2 col-form-label">活動花絮影片標題</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題 (最多100個字)"
                    required
                    v-model="activityVideoFile.Name"
                  />
                </div>
              </div>
              <div class="form-group">
                <label>活動花絮影片圖示上傳</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input
                      type="text"
                      class="form-control"
                      v-model="activityVideoFile.Imagefile.SrcFileName"
                      disabled
                    />
                  </div>
                  <div class="input-group-append">
                    <button
                      class="input-group-text"
                      @click="download(activityVideoFile.Imagefile.Url)">
                      下載
                    </button>
                    <button
                      class="input-group-text"
                      :id="'upload-plan-file-' + '2-' + i"
                      data-accept="image/*"
                      @click="checkActiveVideoIndex(2, i)">
                      上傳
                    </button>
                  </div>
                </div>
                <div class="progress progress-xxs mb-3"
                  v-if="activityVideoFile.Imagefile.Status > 0">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    :aria-valuenow="activityVideoFile.Imagefile.Progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="`width: ${activityVideoFile.Imagefile.Progress}%`"
                  ></div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 col-form-label">活動花絮影片連結</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入連結"
                    required
                    v-model="activityVideoFile.VideoUrl"
                  />
                </div>
              </div>
            </div>
            <button class="btn btn-success" @click="addActivityVideo">
              新增影片編輯框
            </button>
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
export default {
  data() {
    return {
      MAX_FILE_SIZE: 10 * 1000 * 1000,
      IsNew: true,
      Title: "",
      activityHistory: {
        Activity: {
          Title: "",
          IsActive: true,
        }
      },
      activityImageFiles: [],
      activityVideoFiles: [],
      activeImageIndex: 0,
      activeVideoIndex: 0,
      activityType: 1,
      activityEl: null
    };
  },
  async mounted() {
    window.model = this;
    this.IsNew = this.$route.params.id == "new";
    if (!this.IsNew) {
      this.activityHistory = await this.$api.getActivityHistory(this.$route.params.id);
      this.activityHistory.Activity.IsActive = this.activityHistory.Activity.IsActive == "1" ? true : false;
      this.activityHistory.ImageFiles.forEach((file) => {
        this.activityImageFiles.push({
          Name: file.Name,
          Imagefile: {
            Status: 0,
            CancelToken: null,
            Progress: 0,
            SrcFileName: file.ImageUrl,
            Url: file.ImageUrl,
            File: null,
          }
        });
      });
      this.activityHistory.VideoFiles.forEach((file) => {
        this.activityVideoFiles.push({
          Name: file.Name,
          VideoUrl: file.VideoUrl,
          Imagefile: {
            Status: 0,
            CancelToken: null,
            Progress: 0,
            SrcFileName: file.ImageUrl,
            Url: file.ImageUrl,
            File: null,
          }
        });
      });
      this.Title = "編輯活動花絮內容";
    } else {
      this.Title = "新增活動花絮內容";
    }
    this.load();
  },
  methods: {
    async load() {},
    async save() {
      if (!this.validate("#doc")) {
        return;
      }
      this.activityHistory.Activity.IsActive = this.activityHistory.Activity.IsActive ? "1" : "0";
      this.activityHistory.ImageFiles = this.activityImageFiles.map((file) => {
        return {
          Name: file.Name,
          ImageUrl: file.Imagefile.Url
        };
      });
      this.activityHistory.VideoFiles = this.activityVideoFiles.map((file) => {
        return {
          Name: file.Name,
          VideoUrl: file.VideoUrl,
          ImageUrl: file.Imagefile.Url
        };
      });
      if (this.IsNew) {
        await this.$api.createActivityHistory(this.activityHistory);
      } else {
        await this.$api.updateActivityHistory(this.$route.params.id, this.activityHistory);
        console.log(this.activityHistory);
      }
      alert("儲存完成", () => {
        this.$router.push(`/activityHistories`);
      });
    },
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
    download(url) {
      window.open(this.$options.filters.imageCDN(url));
    },
    addActivityImage() {
      this.activityImageFiles.push({
        Name: "",
        Imagefile: {
          Status: 0,
          CancelToken: null,
          Progress: 0,
          SrcFileName: "",
          Url: "",
          File: null,
        }
      });
    },
    addActivityVideo() {
      this.activityVideoFiles.push({
        Name: "",
        VideoUrl: "",
        Imagefile: {
          Status: 0,
          CancelToken: null,
          Progress: 0,
          SrcFileName: "",
          Url: "",
          File: null,
        }
      });
    },

    removeActivityImage(q) {
        confirm("請問要刪除此檔案?", async (r) => {
          this.activityImageFiles.remove(q);
        });
    },
    removeActivityVideo(q) {
        confirm("請問要刪除此檔案?", async (r) => {
          this.activityVideoFiles.remove(q);
        });  
    },
    checkActiveImageIndex(type, index) {
      console.log("ActiveImageIndex : " + index);
      this.activeImageIndex = index;
      this.activityType = type;
      this.$nextTick(() => {
        console.log(this.activeImageIndex);
        console.log(this.activeVideoIndex);
        console.log(this.activityType);     
        this.fileUpload(     
          "#upload-plan-file-" + this.activityType + "-" + this.activeImageIndex,
          this.callback(this.activityImageFiles[this.activeImageIndex].Imagefile, "/pfantua/public/backend/api/uploadImage/activityHistoryImage")
        );
      });
    },
    checkActiveVideoIndex(type, index) {
      console.log("ActiveVideoIndex : " + index);
      this.activeVideoIndex = index;
      this.activityType = type;
      this.$nextTick(() => {
      console.log(this.activeImageIndex);
      console.log(this.activeVideoIndex);
      console.log(this.activityType);     
      this.fileUpload(     
        "#upload-plan-file-" + this.activityType + "-" + this.activeVideoIndex,
        this.callback(this.activityVideoFiles[this.activeVideoIndex].Imagefile, "/pfantua/public/backend/api/uploadImage/activityHistoryVideo")
      );
    });
    }, 
  },
};
</script>