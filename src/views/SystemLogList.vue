<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">系統紀錄管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">系統紀錄管理</li>
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
      <div class="row" style="margin-top: 10px">
        <div class="col-12 col-sm-12">
          <ul
            class="nav nav-tabs"
            id="custom-tabs-two-tab"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                id="custom-tabs-systemLog-tab"
                data-toggle="pill"
                href="#custom-tabs-systemLog"
                role="tab"
                aria-controls="custom-tabs-systemLog"
                aria-selected="true"
                >系統紀錄管理</a>
            </li>          
          </ul>
          <button v-if="regulationMgtFlag" class="btn btn-success pull-right" @click="create">
            新增
          </button>  
        </div>
      </div>
      <div class="row" style="margin-top: 10px">
        <div class="col-12 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="tab-content" id="custom-tabs-two-tabContent">
                <div
                  class="tab-pane fade active show"
                  id="custom-tabs-systemLog"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-systemLog-tab">
                  <div id="tabSystemLogs"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      systemLogMgtFlag: true,
    }
  },
  mounted() {
    window.model = this;
    this.loadSystemLog();
  },
  watch: {
  },
  methods: {
    async loadSystemLog() {
      var cols = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        {
          title: "操作帳號",
          data: "Account",
        },
        {
          title: "操作畫面代號",
          data: "Action",
        },
        {
          title: "操作內容",
          data: "Content"
        },
        {
          title: "操作時間",
          data: "CreateTime"
        },
      ];
      this.items = await this.$api.getSystemLogs();
      this.createDataTable("#tabSystemLogs", cols, this.items, {
        bSort: false,
        paging: false,
      });
    }
  }
};

</script>