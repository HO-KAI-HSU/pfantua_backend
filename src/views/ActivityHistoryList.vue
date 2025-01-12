<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">活動花絮管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">活動花絮管理</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- <RankCharts v-if="ShowTechPlanRankCharts" :xValues="ChartsXValues" :yValues="ChartsYValues"/> -->

    <!-- Main content -->
    <section class="content" id="tabs">
      <div class="row">
        <div class="col-12 col-sm-12">
          <ul
            class="nav nav-tabs"
            id="custom-tabs-two-tab"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                id="custom-tabs-activityHistory-tab"
                data-toggle="pill"
                href="#custom-tabs-activityHistory"
                role="tab"
                aria-controls="custom-tabs-activityHistory"
                aria-selected="true"
                >活動花絮管理</a
              >
            </li>
          </ul>
          <button v-if="activityHistoryMgtFlag" class="btn btn-success pull-right" @click="create">
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
                  id="custom-tabs-activityHistory"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-activityHistory-tab">
                  <div id="tabActivityHistories"></div>
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
  data() {
    return {
      activityHistoryMgtFlag: true,
    };
  },
  mounted() {
    window.model = this;
    this.load();
  },
  methods: {
    async load() {
      var cols = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { title: "活動花絮標題", data: "Title" },
        {
          title: "發布狀態",
          data: "IsActive",
          render: function (data) {
            if (data == "1") {
              return '<span class="badge badge-success">發布</span>';
            }
            return '<span class="badge badge-warning">隱藏</span>';
          },
        },
        {
          title: "功能",
          data: "ActivityID",
          width: 180,
          render: function (data, type, row, meta) {
            return (
              '<button type="button" class="btn btn-default" onclick="window.model.editItem(' +
              data +
              ')">編輯</button>'
              + (row["IsActive"] == "1"
                ? '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ', 0)">隱藏</button>'
                : '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ', 1)">發布</button>')
              + '<button type="button" class="btn btn-default" onclick="window.model.deleteItem(' +
                  data +
              ')">刪除</button>'
            );
          },
        },
      ];
      var response = await this.$api.getActivityHistories();
      var catMap = {};
      this.createDataTable("#tabActivityHistories", cols, response, {
      });
      this.items = response;
    },
    create() {
      this.$router.push("/activityHistory/new");
    },
    editItem(id){
      this.$router.push("/activityHistory/" + id);
    },
    async deleteItem(id) { 
      $.each(this.items, (i, r) => {
        if (r.ActivityID == id) {
          this.currentItem = r;
        }
      }); 
      if (this.currentItem) {
        confirm("請問要刪除此活動花絮?", async (r) => {
          await this.$api.deleteActivityHistory(id);
          this.load();
        });
      }
    },
    async updateItemPublishStatus(id, isActive) {  
      var item = {
        IsActive: isActive,
      };    
      await this.$api.updateActivityHistoryStatus(id, item);
      this.load();
    }
  },
};
</script>