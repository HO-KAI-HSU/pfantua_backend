<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">學院內容管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">學院內容管理</li>
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
                <label>學院照片上傳</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input
                      type="text"
                      class="form-control"
                      v-model="imagefile.SrcFileName"
                      disabled
                    />
                  </div>
                  <div class="input-group-append">
                    <button
                      class="input-group-text"
                      @click="download(imagefile.Url)">
                      下載
                    </button>
                    <button
                      class="input-group-text"
                      id="upload-plan-file"
                      data-accept="image/*">
                      上傳
                    </button>
                  </div>
                </div>
                <div class="progress progress-xxs mb-3"
                  v-if="imagefile.Status > 0">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    :aria-valuenow="imagefile.Progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="`width: ${imagefile.Progress}%`"
                  ></div>
                </div>
              </div>
              <div class="form-group">
                <label>學院簡介</label>
                <textarea
                  rows="8"
                  class="form-control"
                  required
                  v-ckeditor="CollageInfo.Collage.CollageIntroduction"/>
              </div>
              <div class="form-group">
                <label>學院歷史</label>
                <textarea
                  rows="8"
                  class="form-control"
                  required
                  v-ckeditor="CollageInfo.Collage.CollageHistory"/>
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
            <h3 class="card-title">院長資訊編輯</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <div
              class="callout callout-info"
              v-for="(c, i) in CollageInfo.CollageHeadHistorys"
              :id="'head-' + (i + 1)"
              :key="i"
            >
              <h5>第{{ i + 1 }}章</h5>
              <button
                type="button"
                class="close"
                style="position: relative; top: -30px"
                @click="removeHead(c)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <hr />
              <div class="form-horizontal">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">院長選擇</label>
                  <select
                    class="form-control"
                    required
                    v-model="c.CollageColleagueCode">
                    <option
                      :value="d.CollageColleagueCode"
                      v-for="d in CollageColleagues"
                      :key="d.CollageColleagueCode">
                      {{ d.Name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 col-form-label">年分</label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入年分"
                      required
                      v-model="c.Year"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-success" @click="addHead">
              新增院長編輯框
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
import $ from "jquery";
export default {
  data() {
    return {
      Title: "",
      CollageColleagues: [],
      CollageInfos: [],
      CollageHeadHistorys: [],
      CollageInfo : {
        Collage : {
          CollageID: "",
          CollageCode: "",
          CollageIntroduction: "",
          CollageHistory: "",
          CollageImageUrl : ""
        },
        CollageHeadHistorys : []
      },
      imagefile: {
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
    this.CollageColleagues = await this.$api.getCollageColleagues();
    this.CollageInfo = await this.$api.getCollageInfo();
    this.Title = "編輯學院內容";
    this.imagefile.Url = this.CollageInfo.Collage.CollageImageUrl;
    this.imagefile.SrcFileName = this.CollageInfo.Collage.CollageImageUrl;

    this.$nextTick(() => {
      this.fileUpload(
        "#upload-plan-file",
        this.callback(this.imagefile, "/pfantua/public/backend/api/uploadImage/collage")
      );
    });
  },
  methods: {
    addHead() {
      this.CollageInfo.CollageHeadHistorys.push({
        CollageColleagueCode: "",
        Year: "",
      });
    },
    removeHead(q) {
      this.CollageInfo.CollageHeadHistorys.remove(q);
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
    async save() {
      if (!this.validate("#doc")) {
        return;
      }
        var collageId = this.CollageInfo.Collage.CollageID;
        this.CollageInfo.Collage.CollageImageUrl = this.imagefile.Url;
        await this.$api.updateCollageInfo(collageId, this.CollageInfo);
      alert("儲存完成", () => {
        this.$router.push(`/collageInfo`);
      });
    }
  },
};
</script>