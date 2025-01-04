<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">最新消息管理</h1>
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
                id="custom-tabs-news-tab"
                data-toggle="pill"
                href="#custom-tabs-news"
                role="tab"
                aria-controls="custom-tabs-news"
                aria-selected="true"
                >最新消息管理</a>
            </li>          
          </ul>
          <button v-if="newsMgtFlag" class="btn btn-success pull-right" @click="create">
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
                  id="custom-tabs-news"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-news-tab">
                  <div id="tabNews"></div>
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
      newsMgtFlag: true,
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
          title: "圖片",
          data: "ImageUrl",
          render: function (data, type, row, meta) {
            return `<a href="${
              row["TargetUrl"]
            }" target="_blank"><img src="${window.Filter.imageCDN(
              data
            )}" alt="" style="max-width: 200px;"/></a>`;
          },
        },
        { 
          title: "最新消息日期", 
          data: "NewsTime",
          render: window.Filter.dateFormat, 
        },
        {
          title: "最新消息標題", 
          data: "Title" 
        },
        {
          title: "最新消息分類", 
          data: "Category",
          render: function (data, type, row, meta) {
            return data.Name;
          },
        },
        {
          title: "狀態",
          data: "IsActive",
          render: function (data, type, row, meta) {
            if (data == "1") {
              return '<span class="badge badge-success">啟用</span>';
            }
            return '<span class="badge badge-danger">停權</span>';
          },
        },
        {
          title: "功能",
          data: "NewsID",
          width: 180,
          render: function (data, type, row, meta) {
            return (
              '<button type="button" class="btn btn-default" onclick="window.model.editItem(' +
                  data +
              ')">編輯</button>' +
              '<button type="button" class="btn btn-default" onclick="window.model.deleteItem(' +
                  data +
              ')">刪除</button>'
            );
          },
        },
      ];  
      var categories = await this.$api.getNewsCategories();
      var response = await this.$api.getNewsList();
      var catMap = {};
      categories.forEach((c) => (catMap[c.NewsCategoryID] = c));
      response.forEach((t) => {
        t.Category = catMap[t.NewsCategoryID];
      });
      this.createDataTable("#tabNews", cols, response, {
      });
    },

    async create() {
      this.$router.push("/news/new");
    },
    async editItem(id) {
      this.$router.push(`/news/${id}`);
    },
    async deleteItem(id) {
      $.each(this.items, (i, r) => {
        if (r.NewsID == id) {
          this.currentItem = r;
        }
      });
      if (this.currentItem) {
          confirm("請問要刪除此最新消息?", async (r) => {
          await this.$api.deleteNews(id);
          this.load();
        });
      }
    }
  }
};

</script>