<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">院長遴選管理</h1>
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
                id="custom-tabs-collageHeadElection-tab"
                data-toggle="pill"
                href="#custom-tabs-collageHeadElection"
                role="tab"
                aria-controls="custom-tabs-collageHeadElection"
                aria-selected="true"
                >院長遴選管理</a
              >
            </li>
          </ul>
          <button v-if="collageHeadElectionMgtFlag" class="btn btn-success pull-right" @click="create">
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
                  id="custom-tabs-collageHeadElection"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-collageHeadElection-tab">
                  <div id="tabCollageHeadElections"></div>
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
      collageHeadElectionMgtFlag: true,
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
        { title: "院長遴選標題", data: "Title" },
        { title: "遴選年分", data: "Year" },
        {
          title: "發布狀態",
          data: "IsActive",
          render: function (data) {
            if (data =="1") {
              return '<span class="badge badge-success">發布</span>';
            }
            return '<span class="badge badge-warning">隱藏</span>';
          },
        },
        {
          title: "功能",
          data: "CollageHeadElectionID",
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
      var response = await this.$api.getCollageHeadElections();
      var catMap = {};
      this.createDataTable("#tabCollageHeadElections", cols, response, {
      });
      this.items = response;
    },
    create() {
      this.$router.push("/collageHeadElection/new");
    },
    editItem(id){
      this.$router.push("/collageHeadElection/" + id);
    },
    async deleteItem(id) { 
      $.each(this.items, (i, r) => {
        if (r.CollageHeadElectionID == id) {
          this.currentItem = r;
        }
      }); 
      if (this.currentItem) {
        confirm("請問要刪除此院長遴選?", async (r) => {
          await this.$api.deleteCollageHeadElection(id);
          this.load();
        });
      }
    },
    async updateItemPublishStatus(id, isActive) {  
      var item = {
        IsActive: isActive,
      };    
      await this.$api.updateCollageHeadElectionStatus(id, item);
      this.load();
    }
  },
};
</script>