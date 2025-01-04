<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">系統設定</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">系統設定</li>
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
            <h3 class="card-title">系統設定</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <form role="form">
              <div class="form-group">
                <label>YouTube網址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="setting.YouTube"
                />
              </div>
              <div class="form-group">
                <label>Facebook網址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="setting.Facebook"
                />
              </div>
              <div class="form-group">
                <label>Instagram網址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="setting.Instagram"
                />
              </div>
              <div class="form-group">
                <label>Podcast網址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="setting.Podcast"
                />
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
      setting: {
        YouTube: "",
        Facebook: "",
        Instagram: "",
        Podcast:""
      },
    };
  },
  async mounted() {
    this.load();
  },
  methods: {
    async load() {
      var response = await this.$api.getSetting();
      if (response) {
        this.setting = JSON.parse(response);
      }
    },
    async save() {
      await this.$api.updateSetting({
        Content: JSON.stringify(this.setting),
      });
      alert("儲存完成", () => this.load());
    },
  },
};
</script>