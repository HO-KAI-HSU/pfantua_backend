<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">最新消息內容管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">最新消息管理</li>
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
                <label>最新消息標題</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="請輸入最新消息標題，最多100個字"
                  maxlength="100"
                  v-model="news.Title"/>
              </div>
              <div class="form-group">
                <label>最新消息分類</label>
                <select
                  class="form-control"
                  required
                  v-model="news.NewsCategoryID">
                  <option
                    :value="c.NewsCategoryID"
                    v-for="c in Categories"
                    :key="c.NewsCategoryID">
                    {{ c.Name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>最新消息發布時間</label>
                <el-date-picker
                  v-model="news.NewsTime"
                  type="year"
                  placeholder="Pick a Data"
                  value-format='yyyy-MM-dd'
                />
              </div>
              <div class="form-group">
                <label>最新消息圖片上傳</label>
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
                      @click="download(imagefile.Url)"
                    >
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
                <div
                  class="progress progress-xxs mb-3"
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
                <label>最新消息連結</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  maxlength="100"
                  v-model="news.TargetUrl"/>
              </div>
              <div class="form-group">
                <label>最新消息內容</label>
                <textarea
                  rows="8"
                  class="form-control"
                  required
                  v-ckeditor="news.Content"/>
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
      Categories: [],
      NewsList: [],
      news: {
        NewsCategoryID: 1,
        Title: "",
        Content: "",
        ImageUrl : "",
        TargetUrl : "",
        IsActive : true,
        NewsTime: "",
        CreateTime: ""
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
    this.Categories = await this.$api.getNewsCategories();
    this.IsNew = (this.$route.params.id == "new");
    if (!this.IsNew) {
      this.NewsList = await this.$api.getNews(this.$route.params.id);
      this.news = this.NewsList[0];
      this.news.IsActive = this.news.IsActive == "1" ? true : false;
      this.imagefile.Url = this.news.ImageUrl;
      this.imagefile.SrcFileName = this.news.ImageUrl;
      this.Title = "編輯最新消息";
    } else {
      this.Title = "新增最新消息";
    }

    this.$nextTick(() => {
      this.fileUpload(
        "#upload-plan-file",
        this.callback(this.imagefile, "/pfantua/public/backend/api/uploadImage/news")
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
      this.news.ImageUrl = this.imagefile.Url;
      this.news.IsActive = this.news.IsActive ? "1" : "0";
      if (this.IsNew) {
        var result = await this.$api.createNews(this.news);
      } else {
        var result = await this.$api.updateNews(this.$route.params.id, this.news);
      }
      console.log(result);
      alert("儲存完成", () => {
        this.$router.push(`/news`);
      });
    }
  },
};
</script>