<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">CSS定義</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">CSS定義</li>
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
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">sytle.css</h3>
              </div>
              <div class="card-body">
                  <textarea class="form-control" rows="15" v-model="pc"/></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">rwd.css</h3>
              </div>
              <div class="card-body">
                  <textarea class="form-control" rows="15" v-model="mobile"/>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">custom.js</h3>
              </div>
              <div class="card-body">
                  <textarea class="form-control" rows="15" v-model="custom"/>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-12">
            <button
              class="btn btn-primary pull-right"
              style="margin-bottom: 10px"
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
      mobile: "",
      pc: "",
      custom: ''
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      var cfg = await this.$api.getCss();
      this.mobile = cfg.mobile;
      this.pc = cfg.pc;
      this.custom = cfg.custom;
    },
    async save() {
      await this.$api.updateCss({
          PC: this.pc,
          Mobile : this.mobile,
          Custom : this.custom
      });
      alert("儲存完成");
    },
  },
};
</script>