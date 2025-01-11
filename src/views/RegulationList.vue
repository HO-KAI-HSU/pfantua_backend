<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">法規章程管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">法規章程管理</li>
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
                id="custom-tabs-regulation-tab"
                data-toggle="pill"
                href="#custom-tabs-regulation"
                role="tab"
                aria-controls="custom-tabs-regulation"
                aria-selected="true"
                >法規章程管理</a>
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
                  id="custom-tabs-regulation"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-regulation-tab">
                  <div id="tabRegulations"></div>
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
      regulationMgtFlag: true,
    }
  },
  mounted() {
    window.model = this;
    this.loadRegulation();
  },
  watch: {
  },
  methods: {
    async loadRegulation() {
      var cols = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        {
          title: "法規章程標題",
          data: "Title",
        },
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
          data: "RegulationID",
          width: 180,
          render: function (data, type, row, meta) {
            return (
              '<button type="button" class="btn btn-info" onclick="window.model.editItem(' +
              data +
              ')">編輯</button>&nbsp;' +
              (row["IsActive"] == "1"
                ? '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ', 0)">隱藏</button>'
                : '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ', 1)">上架</button>') +
              '<button type="button" class="btn btn-danger" onclick="window.model.delItem(' +
              data +
              ')">刪除</button>'
            );
          },
        },
      ];
      this.items = await this.$api.getRegulations(this.$route.params.id);
      this.createDataTable("#tabRegulations", cols, this.items, {
        bSort: false,
        paging: false,
      });
    },
    async create() {
      this.$router.push("/regulation/new");
    },
    async editItem(id) {
      this.$router.push(`/regulation/${id}`);
    },
    async deleteItem(id) {
      $.each(this.items, (i, r) => {
        if (r.RegulationID == id) {
          this.currentItem = r;
        }
      });
      if (this.currentItem) {
        confirm("請問要刪除法規章程：" + this.currentItem.Title, async (r) => {
          await this.$api.deleteRegulation(this.currentItem.RegulationID);
          this.loadRegulation();
        });
      }
    },
    async updateItemPublishStatus(id, isActive) {  
      var item = {
        IsActive: isActive,
      };    
      await this.$api.updateRegulationStatus(id, item);
      this.loadRegulation();
    }
  }
};

</script>