<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">學院同仁內容管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">學院同仁管理</li>
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
                <label>學院同仁代號</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="請輸入最新消息標題，最多100個字"
                  maxlength="10"
                  v-model="currentItem.CollageColleagueCode"/>
              </div>
              <div class="form-group">
                <label>學院同仁名字</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder=""
                  maxlength="10"
                  v-model="currentItem.Name"/>
              </div>
              <div class="form-group">
                <label>學院同仁職位</label>
                <select class="form-control" v-model="currentItem.PositionType">
                  <option value="professor">教授</option>
                  <option value="associate-professor">副教授</option>
                  <option value="assistant-professor">助理教授</option>
                  <option value="lecturer">講師</option>
                  <option value="administrative-staff">行政人員</option>
                  <option value="assistant">助理</option>
                </select>
              </div>
              <div class="form-group">
                <label>學院同仁單位</label>       
                <div class="row">
                  <div class="check-container">
                    <div v-for="(CollageDepartment, index) in CollageDepartments">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="radio2"
                          @change="rbRoleAllChanged"
                          :key="CollageDepartment.CollageDepartmentCode"
                          :value="CollageDepartment.CollageDepartmentCode"
                          v-model="currentItem.CollageDepartmentCodeArray"
                        />
                        <label class="form-check-label">{{ CollageDepartment.Name }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>學院同仁圖照片上傳</label>
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
                <label>學院同仁信箱</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder=""
                  maxlength="10"
                  v-model="currentItem.Email"/>
              </div>
              <div class="form-group">
                <label>學院同仁電話</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder=""
                  maxlength="10"
                  v-model="currentItem.Phone"/>
              </div>
              <div class="form-group">
                <label>學院同仁抬頭</label>
                <textarea
                  rows="8"
                  class="form-control"
                  required
                  v-ckeditor="currentItem.Title"/>
              </div>
              <div class="form-group">
                <label>學院同仁簡介</label>
                <textarea
                  rows="8"
                  class="form-control"
                  required
                  v-ckeditor="currentItem.Content"/>
              </div>
              <!-- /.card-body -->
            </form>
          </div>
          <div class="card-footer">
            <button
              type="button"
              class="btn btn-primary pull-right w150"
              @click="save()">
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
      CollageDepartments: [],
      CollageColleagues: [],
      currentItem: {
        CollageColleagueID: 1,
        CollageCode: "C001",
        CollageColleagueCode: "",
        CollageDepartmentCodeArray: [],
        CollageDepartmentCodes: "",
        Name: "",
        Email:"",
        Phone:"",
        Title: "",
        Content: "",
        ImageUrl : "",
        PositionType : "",
        IsActive : true
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
    this.CollageDepartments = await this.$api.getCollageDepartments();
    this.IsNew = (this.$route.params.id == "new");
    if (!this.IsNew) {
      this.CollageColleagues = await this.$api.getCollageColleague(this.$route.params.id);
      this.currentItem = this.CollageColleagues[0];
      this.currentItem.CollageDepartmentCodeArray = this.currentItem.CollageDepartmentCodes != null ?
        this.currentItem.CollageDepartmentCodes.split(",") : "";
      this.currentItem.IsActive = this.currentItem.IsActive == "1" ? true : false;
      this.imagefile.Url = this.currentItem.ImageUrl;
      this.imagefile.SrcFileName = this.currentItem.ImageUrl;
      this.Title = "編輯學院同仁內容";
    } else {
      this.Title = "新增學院同仁內容";
    }

    this.$nextTick(() => {
      this.fileUpload(
        "#upload-plan-file",
        this.callback(this.imagefile, "/pfantua/public/backend/api/uploadImage/collageColleague")
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
    rbRoleAllChanged(e) {
      var t = $(e.target);
      var p = t.parent().parent();
      $(".lv2 input", p).prop("checked", t.prop("checked"));
      $.each($(".lv2 input", p), (i, e) => {
        e.dispatchEvent(new Event("change"));
      });
    },
    async save() {
      if (!this.validate("#doc")) {
        return;
      }

      this.currentItem.IsActive = this.currentItem.IsActive ? "1" : "0";
      this.currentItem.ImageUrl = this.imagefile.Url;
      this.currentItem.CollageDepartmentCodes = this.currentItem.CollageDepartmentCodeArray.length > 0 ? 
        this.currentItem.CollageDepartmentCodeArray.join(",") : "";
        
      if (this.IsNew) {
        await this.$api.createCollageColleague(this.currentItem);
      } else {
        await this.$api.updateCollageColleague(this.$route.params.id, this.currentItem);
      }
      alert("儲存完成", () => {
        this.$router.push(`/collageColleagues`);
      });
    }
  },
};
</script>