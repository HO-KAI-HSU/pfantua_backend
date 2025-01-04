<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">會員管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">會員管理</li>
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
    <section class="content" id="member">
      <div class="container-fluid" v-if="member">
        <div class="card card-info">
          <div class="card-header">會員基本資訊</div>
          <!-- /.card-header -->
          <!-- form start -->
          <form role="form">
            <div class="card-body">
              <div class="form-group row">
                <label class="col-sm-1 col-form-label">姓名</label>
                <div class="col-sm-5">
                  <input
                    type="text"
                    class="form-control"
                    v-model="member.Name"
                  />
                </div>
                <label class="col-sm-1 col-form-label">Email</label>
                <div class="col-sm-5">
                  <input
                    type="text"
                    class="form-control"
                    v-model="member.Email"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-1 col-form-label">手機</label>
                <div class="col-sm-5">
                  <input
                    type="text"
                    class="form-control"
                    v-model="member.Mobile"
                  />
                </div>
                <label class="col-sm-1 col-form-label">身份</label>
                <div class="col-sm-5">
                  <select class="form-control" v-model="member.Type">
                    <option :value="0">一般會員</option>
                    <option :value="1">教師</option>
                    <option :value="2">學生</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-1 col-form-label">學校</label>
                <div class="col-sm-5">
                  <input
                    type="text"
                    class="form-control"
                    v-model="member.School"
                  />
                </div>
                <label class="col-sm-1 col-form-label">班級</label>
                <div class="col-sm-5">
                  <input
                    type="text"
                    class="form-control"
                    v-model="member.Class"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-1 col-form-label">狀態</label>
                <div class="col-sm-5 input-and-button">
                  <template v-if="member.Status == 0">
                    <div class="form-control">啟用</div>
                    <button class="btn btn-danger" @click="deactive">
                      停權
                    </button>
                  </template>
                  <template v-else>
                    <div class="form-control">停權</div>
                    <button class="btn btn-warning" @click="active">
                      啟用
                    </button>
                  </template>
                </div>
                <label class="col-sm-1 col-form-label">註冊時間</label>
                <div class="col-sm-5">
                  <div class="form-control">
                    {{ member.CreateTime | dateTimeFormat }}
                  </div>
                </div>
                <label class="col-sm-1 col-form-label">密碼最後更新時間</label>
                <div class="col-sm-5">
                  <div class="form-control">
                    {{ member.LastUpdatePasswordTime | dateTimeFormat }}
                  </div>
                </div>
              </div>
            </div>
            <!-- /.card-body -->
          </form>
          <div class="card-footer">
            <button
              type="button"
              class="btn btn-primary pull-right w150"
              @click="save()"
            >
              儲存
            </button>
            <button
              type="button"
              class="btn btn-danger pull-right w150"
              @click="reset()"
              style="margin-right: 20px"
            >
              重設密碼
            </button>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="card card-secondary">
          <div class="card-header">觀看紀錄</div>
          <div class="card-body">
            <div id="tabItems"></div>
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
      member: null,
    };
  },
  async mounted() {
    window.model = this;
    this.load();
  },
  methods: {
    async load() {
      var response = await this.$api.getMember(this.$route.params.id);
      this.member = response.Member;
      var map = {};
      response.Lessons.forEach((l) => (map[l.LessonID] = l));
      var cols = [
        {
          title: "時間",
          data: "LessonVisitCreateTime",
          render: window.Filter.dateTimeFormat,
          width: 200,
        },
        {
          title: "課程",
          data: "LessonName",
        },
        {
          title: "總觀看時間",
          data: "LessonTotalVisitTime",
          render: window.utils.toHhMmSs,
          width: 90,
        },
      ];
      this.createDataTable("#tabItems", cols, response.Lessons, {
        order: [[0, "desc"]],
      });
    },
    async save() {
      if (!this.validate("form")) {
        return;
      }
      await this.$api.updateMember(this.member);
      alert("儲存完成");
    },
    deactive() {
      confirm("請問確定要停權此帳號嗎？", async () => {
        this.member.Status = 1;
        await this.$api.updateMember(this.member);
        alert("操作完成");
        this.load();
      });
    },
    active() {
      confirm("請問確定要啟用此帳號嗎？", async () => {
        this.member.Status = 0;
        await this.$api.updateMember(this.member);
        alert("操作完成");
        this.load();
      });
    },
    generatePassword() {
      var length = 8,
        charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    },
    copy(input) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(input).then(
          () => {
            console.log("Copied to clipboard successfully.");
          },
          (err) => {
            console.log("Failed to copy the text to clipboard.", err);
          }
        );
      } else if (window.clipboardData) {
        window.clipboardData.setData("Text", input);
      }
    },
    reset() {
      confirm("請問確定要重設密碼嗎？", async () => {
        var password = this.generatePassword();
        await this.$api.updateMemberPassword({
          MemberID: this.member.MemberID,
          Password: password,
        });
        this.copy(password);
        alert("已經將密碼重設並複製到剪貼簿，新密碼為：" + password);
        this.load();
      });
    },
  },
};
</script>