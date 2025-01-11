<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">學院同仁管理</h1>
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
                id="custom-tabs-collageColleague-tab"
                data-toggle="pill"
                href="#custom-tabs-collageColleague"
                role="tab"
                aria-controls="custom-tabs-collageColleague"
                aria-selected="true"
                >學院同仁管理</a>
            </li>          
          </ul>
          <button v-if="collageColleagueMgtFlag" class="btn btn-success pull-right" @click="create">
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
                  id="custom-tabs-collageColleague"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-collageColleague-tab">
                  <div id="tabCollageColleagues"></div>
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
      disable: false,     
      loading: false,
      collageColleagueMgtFlag: true,
      collageDepartments: [],
      collageColleagues: [],
      currentItem: '',
    }
  },
  mounted() {
    window.model = this;
    this.load();
  },
  watch: {
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
        {
          title: "學院同仁代號",
          data: "CollageColleagueCode"
        },
        {
          title: "學院同仁名字", 
          data: "Name"
        },
        {
          title: "信箱", 
          data: "Email"
        },
        {
          title: "電話", 
          data: "Phone"
        },
        {
          title: "是否為院長",
          data: "IsHead",
          render: function (data, type, row, meta) {
            if (data == "1") {
              return '<span class="badge badge-success">是</span>';
            }
            return '<span class="badge badge-danger">否</span>';
          },
        },
        {
          title: "啟用狀態",
          data: "IsActive",
          render: function (data, type, row, meta) {
            if (data == "1") {
              return '<span class="badge badge-success">啟用</span>';
            }
            return '<span class="badge badge-warning">隱藏</span>';
          },
        },
        {
          title: "功能",
          data: "CollageColleagueID",
          width: 180,
          render: function (data, type, row, meta) {
            return (
              '<button type="button" class="btn btn-default" onclick="window.model.editItem(' +
                  data +
              ')">編輯</button>' +
              (row["IsActive"] == "1"
                ? '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ', 0)">隱藏</button>'
                : '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ', 1)">上架</button>') +
              '<button type="button" class="btn btn-default" onclick="window.model.deleteItem(' +
                  data +
              ')">刪除</button>'
            );
          },
        },
      ];  
      this.collageDepartments = await this.$api.getCollageDepartments();
      this.collageColleagues = await this.$api.getCollageColleagues();
      var map = {};

      this.collageDepartments.forEach((c) => (map[c.CollageDepartmentCode] = c));
      this.collageColleagues.forEach((i) => {
        this.$log.info('test', i.collageDepartmentCodes);
      });

      this.createDataTable("#tabCollageColleagues", cols, this.collageColleagues, {
      });
    },

    async create() {
      this.$router.push("/collageColleague/new");
    },
    async editItem(id) {
      this.$router.push(`/collageColleague/${id}`);
    },
    async deleteItem(id) {
      $.each(this.items, (i, r) => {
        if (r.CollageColleagueID == id) {
          this.currentItem = r;
        }
      });
      if (this.currentItem) {
          confirm("請問要刪除此同仁?", async (r) => {
          await this.$api.deleteCollageColleague(id);
          this.load();
        });
      }
    },
    async updateItemPublishStatus(id, isActive) {
      var item = {
        IsActive: isActive,
      };
      await this.$api.updateCollageColleagueStatus(id, item);
      this.load();
    },
  }
};

</script>