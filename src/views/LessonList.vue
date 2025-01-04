<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">課程管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">課程管理</li>
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
                id="custom-tabs-lesson-tab"
                data-toggle="pill"
                href="#custom-tabs-lesson"
                role="tab"
                aria-controls="custom-tabs-lesson"
                aria-selected="true"
                onclick="window.model.updateLessonMgtFlag(true)"
                >課程管理</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="custom-tabs-lesson-statistics-tab"
                data-toggle="pill"
                href="#custom-tabs-lesson-statistics"
                role="tab"
                aria-controls="custom-tabs-lesson-statistics"
                aria-selected="false"
                onclick="window.model.updateLessonMgtFlag(false)"
                >課程統計</a
              >
            </li>
          </ul>
          <button v-if="lessonMgtFlag" class="btn btn-success pull-right" @click="create">
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
                  id="custom-tabs-lesson"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-lesson-tab"
                >
                  <div id="tabLessons"></div>
                  <!-- <div id="tabRoles" v-auth="'Role'"></div> -->
                </div>
                <div
                  class="tab-pane fade"
                  id="custom-tabs-lesson-statistics"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-lesson-statistics-tab"
                >
                  <!-- <DateIntervalPicker></DateIntervalPicker> -->
                  <el-date-picker
                    v-model="getDates" 
                    name="name"
                    type="daterange"
                    align="right"
                    unlink-panels range-separator="至"
                    start-placeholder="開始日期"
                    end-placeholder="結束日期"
                    value-format='yyyy-MM-dd'
                    :picker-options="pickerOptions">
                  </el-date-picker>
                  <br><br>
                  <div class="form-group">
                    <label>選擇下載檔案類型</label>
                    <select class="form-control" v-model="selectFileType">
                      <option value="xls">xls</option>
                      <option value="html">html</option>
                      <option value="pdf">pdf</option>
                    </select>
                  </div>
                  <ExcelExport
                    class   = "btn btn-default"
                    :data   = "lessonStatisticsExcelDatas"
                    :fields = "lessonStatisticsExcelField"
                    :type    = "selectFileType"
                    name    = "課程統計.xls">
                    下載課程統計
                  </ExcelExport>
                  <div id="tabLessonStatistics"></div>
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
import DateIntervalPicker from "../components/DateIntervalPicker.vue";
import ExcelExport from "../components/ExcelExport.vue";
export default {
  components: {
    DateIntervalPicker,
    ExcelExport
  },
  data() {
    return {
      selectFileType: 'xls',
      lessonStatisticsExcelField : {
        課程名稱 : 'LessonName',
        觀看次數 : 'TotalCount',
        '觀看時間(秒)' : 'TotalTime',
        完課人數 : 'DoneCount',
      },
      lessonStatisticsExcelDatas : [],
      lessonMgtFlag: true,
      items: [],
      currentItem: '',
      getDates: '',
      pickerOptions: {
        shortcuts: [{
            text: '最近一週',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近30天',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近90天',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
      },
    };
  },
  mounted() {
    window.model = this;
    this.load();
  },
  watch: {
    getDates(val) {
      var sDate = (val == null ? "" : val[0]);
      var eDate = (val == null ? "" : val[1]);
      this.lessonStatistics(sDate, eDate);
    }
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
        { title: "課程名稱", data: "LessonName" },
        {
          title: "課程類別",
          data: "Category",
          render: function (data, type, row, meta) {
            return data.CategoryName;
          },
        },
        {
          title: "課程簡介",
          data: "Brief",
          render: function (data, type, row, meta) {
            if (!data || data.length < 50) {
              return data;
            }
            data = $(data).text();
            return data.substr(0, Math.min(data.length, 50)) + "...";
          },
        },
        {
          title: "上下架狀態",
          data: "Active",
          render: function (data) {
            if (data) {
              return '<span class="badge badge-success">上架</span>';
            }
            return '<span class="badge badge-warning">隱藏</span>';
          },
        },
        {
          title: "建立時間",
          data: "CreateTime",
          render: window.Filter.dateFormat,
        },
        {
          title: "功能",
          data: "LessonID",
          width: 180,
          render: function (data, type, row, meta) {
            return (
              '<button type="button" class="btn btn-default" onclick="window.model.editItem(' +
              data +
              ')">編輯</button>'
              +(row["Active"]
                ? '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ')">隱藏</button>'
                : '<button type="button" class="btn btn-default" onclick="window.model.updateItemPublishStatus(' +
                  data +
                  ')">上架</button>')
              + '<button type="button" class="btn btn-default" onclick="window.model.deleteItem(' +
                  data +
              ')">刪除</button>'                  
            );
          },
        },
      ];

      this.lessonStatistics("", "");
      var categories = await this.$api.getLessonCategories();
      var response = await this.$api.getLessons();
      var catMap = {};
      categories.forEach((c) => (catMap[c.LessonCategoryID] = c));
      response.forEach((t) => {
        t.Category = catMap[t.LessonCategoryID];
      });
      this.createDataTable("#tabLessons", cols, response, {
      });
      this.items = response;
    },
    updateLessonMgtFlag(flag) {
      this.lessonMgtFlag = flag;
    },
    create() {
      this.$router.push("/lesson/new");
    },
    editItem(id) {
      this.$router.push("/lesson/" + id);
    },
    async deleteItem(id) { 
      $.each(this.items, (i, r) => {
        if (r.LessonID == id) {
          this.currentItem = r;
        }
      });
      if (this.currentItem) {
        confirm("請問要刪除此課程?", async (r) => {
          await this.$api.deleteLesson(id);
          this.load();
        });
      }
    },
    async updateItemPublishStatus(id) {
      await this.$api.updateLessonPublishStatus(id);
      this.load();
    },
    async lessonStatistics(start, end) {
      var lessonStatisticsCols = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { title: "課程名稱", data: "LessonName" },
        { title: "觀看次數", data: "TotalCount" },
        { title: "觀看時間(時:分:秒)", data: "TotalTime",
          render: function (data, type, row, meta) {
            return data + "(" + window.utils.toHhMmSs(data) + ")";
          },
        },
        { title: "完課人數", data: "DoneCount" },
      ];
      var statisticsResponse = await this.$api.getLessonStatistics(start, end);
      this.lessonStatisticsExcelDatas = statisticsResponse;
      this.createDataTable("#tabLessonStatistics", lessonStatisticsCols, statisticsResponse, {
      });
    },

  },
};
</script>