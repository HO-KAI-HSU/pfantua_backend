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
                id="custom-tabs-member-tab"
                data-toggle="pill"
                href="#custom-tabs-member"
                role="tab"
                aria-controls="custom-tabs-member"
                aria-selected="true"
                onclick="window.model.updateMenagementFlag(true)"
                >會員管理</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="custom-tabs-member-statistics-tab"
                data-toggle="pill"
                href="#custom-tabs-member-statistics"
                role="tab"
                aria-controls="custom-tabs-member-statistics"
                aria-selected="false"
                onclick="window.model.updateMemberStatisticFlag(true)"
                >會員統計</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="custom-tabs-member-statistics-ranking-tab"
                data-toggle="pill"
                href="#custom-tabs-member-statistics-ranking"
                role="tab"
                aria-controls="custom-tabs-member-statistics-ranking"
                aria-selected="false"
                onclick="window.model.updateRankingStatisticFlag(true)"
                >會員統計排行</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="custom-tabs-member-register-statistics-tab"
                data-toggle="pill"
                href="#custom-tabs-member-register-statistics"
                role="tab"
                aria-controls="custom-tabs-member-register-statistics"
                aria-selected="false"
                onclick="window.model.updateRegisterStatisticFlag(true)"
                >會員註冊增幅分析</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="row" style="margin-top: 10px">
        <div class="col-12 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="tab-content" id="custom-tabs-two-tabContent">
                <div
                  class="tab-pane fade active show"
                  id="custom-tabs-member"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-member-tab"
                >
                  <div id="tabMembers"></div>
                </div>
                <div
                  class="tab-pane fade"
                  id="custom-tabs-member-statistics"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-member-statistics-tab"
                >
                  <el-date-picker
                    v-model="getStatisticsDates" 
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
                  <div class="member-lesson-summary-container-group" v-show="isShowMemberLessonSummary">
                    <div class="member-lesson-summary-container">
                      <div class="member-lesson-summary-value">
                        {{ memberLessonSummaryLabels.anonymousTotalCount }}  
                      </div>
                      <div class="member-lesson-summary-description">
                        {{ memberLessonSummaryLabels.anonymousTotalCountLabel  }}  
                      </div>
                    </div>
                    <div class="member-lesson-summary-container">
                      <div class="member-lesson-summary-value">
                        {{ memberLessonSummaryLabels.memberTotalCount }}  
                      </div>
                      <div class="member-lesson-summary-description">
                        {{ memberLessonSummaryLabels.memberTotalCountLabel  }}  
                      </div>
                    </div>
                    <div class="member-lesson-summary-container">
                      <div class="member-lesson-summary-value">
                        {{ memberLessonSummaryLabels.anonymousTotalTime }}  
                      </div>
                      <div class="member-lesson-summary-value-transfer">
                        {{ memberLessonSummaryLabels.anonymousTransferTotalTime }}  
                      </div>
                      <div class="member-lesson-summary-description">
                        {{ memberLessonSummaryLabels.anonymousTotalTimeLabel  }}  
                      </div>
                    </div>
                    <div class="member-lesson-summary-container">
                      <div class="member-lesson-summary-value">
                        {{ memberLessonSummaryLabels.memberTotalTime }}  
                      </div>
                      <div class="member-lesson-summary-value-transfer">
                        {{ memberLessonSummaryLabels.memberTransferTotalTime }}  
                      </div>
                      <div class="member-lesson-summary-description">
                        {{ memberLessonSummaryLabels.memberTotalTimeLabel  }}  
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>選擇下載檔案類型</label>
                    <select class="form-control" v-model="selectFileType">
                      <option value="xls">xls</option>
                      <option value="html">html</option>
                      <option value="pdf">pdf</option>
                    </select>
                  </div>
                  <ExcelExport
                    v-show="isShowMemberStatisticsChart"
                    class   = "btn btn-default"
                    :data   = "memberLessonStatisticsExcelDatas"
                    :fields = "memberLessonStatisticsExcelField"
                    :type    = "selectFileType"
                    name    = "會員統計.xls">
                    下載會員統計
                  </ExcelExport>
                  <div id="tabMemberStatistics" v-show="isShowMemberStatisticsChart"></div>
                </div>
                <div
                  class="tab-pane fade"
                  id="custom-tabs-member-statistics-ranking"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-member-statistics-ranking-tab"
                >
                  <el-date-picker
                    v-model="getRaningkDates" 
                    name="name"
                    type="daterange"
                    align="right"
                    unlink-panels range-separator="至"
                    start-placeholder="開始日期"
                    end-placeholder="結束日期"
                    value-format='yyyy-MM-dd'
                    :picker-options="pickerOptions">
                  </el-date-picker>
                  <button type="button" class="btn btn-default" onclick="window.model.getMemberStatisticByDate()">選擇</button>
                </div>
                <div
                  class="tab-pane fade"
                  id="custom-tabs-member-register-statistics"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-member-register-statistics-tab"
                >
                  <div class="form-group">
                    <label>選擇時間類型</label>
                    <select class="form-control" v-model="selectDateType">
                      <option value="1">日</option>
                      <option value="2">週</option>
                      <option value="3">月</option>
                      <option value="4">年</option>
                    </select>
                  </div>
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
                  <button type="button" class="btn btn-default" onclick="window.model.getMemberRegisterCountStatisticByDate()">選擇</button>
                </div>
              </div>
              <div class="member-lesson-summary-container-group" v-show="isShowRegisterCountChart">
                <div class="member-lesson-summary-container">
                  <div class="member-lesson-summary-value">
                    {{ registerCountLabels.dateIntervalRegisterCounts }}  
                  </div>
                  <div class="member-lesson-summary-description">
                    {{ registerCountLabels.dateIntervalRegisterCountsLabel  }}  
                  </div>
                </div>
                <div class="member-lesson-summary-container">
                  <div class="member-lesson-summary-value">
                    {{ registerCountLabels.totalRegisterCounts }}  
                  </div>
                  <div class="member-lesson-summary-description">
                    {{ registerCountLabels.totalRegisterCountsLabel  }}  
                  </div>
                </div>
              </div>
              <br>
              <IEcharts v-show="isShowRegisterCountChart" :option="registerCountBar" :loading="loading" style="width: 1200px; height: 400px" ></IEcharts>
              <br>
              <div v-show="isShowRegisterCountChart" class="form-group">
                <label>選擇下載檔案類型</label>
                <select class="form-control" v-model="selectFileType">
                  <option value="xls">xls</option>
                  <option value="html">html</option>
                  <option value="pdf">pdf</option>
                </select>
              </div>
              <ExcelExport
                v-show="isShowRegisterCountChart"
                class   = "btn btn-default"
                :data   = "memberRegisterCountExcelDatas"
                :fields = "memberRegisterCountExcelField"
                :type   = "selectFileType"
                name    = "會員註冊人數分析.xls">
                下載會員註冊人數分析
              </ExcelExport>
              <div id="tabMembers4" v-show="isShowRegisterCountChart"></div>
              <IEcharts v-show="isShowRankingChart" :option="lessonVisitCountBar" :loading="rankingLoading" style="width: 1200px; height: 600px" ></IEcharts>
              <br><br>
              <div v-show="isShowRankingChart" class="form-group">
                <label>選擇下載檔案類型</label>
                <select class="form-control" v-model="selectFileType">
                  <option value="xls">xls</option>
                  <option value="html">html</option>
                  <option value="pdf">pdf</option>
                </select>
              </div>
              <ExcelExport
                v-show="isShowRankingChart"
                class   = "btn btn-default"
                :data   = "lessonVisitCountExcelDatas"
                :fields = "lessonVisitCountExcelField"
                :type   = "selectFileType"
                name    = "會員課程觀看次數排行.xls">
                下載會員課程觀看次數排行
              </ExcelExport>
              <div id="tabMembers1" v-show="isShowRankingChart"></div>
              <br><br><br><br>
              <IEcharts v-show="isShowRankingChart" :option="lessonVisitTimeBar" :loading="rankingLoading" style="width: 1200px; height: 600px" ></IEcharts>
              <br><br>
              <div v-show="isShowRankingChart" class="form-group">
                <label>選擇下載檔案類型</label>
                <select class="form-control" v-model="selectFileType">
                  <option value="xls">xls</option>
                  <option value="html">html</option>
                  <option value="pdf">pdf</option>
                </select>
              </div>
              <ExcelExport
                v-show="isShowRankingChart"
                class   = "btn btn-default"
                :data   = "lessonVisitTimeExcelDatas"
                :fields = "lessonVisitTimeExcelField"
                :type    = "selectFileType"
                name    = "會員課程觀看時間排行.xls">
                下載會員課程觀看時間排行
              </ExcelExport>
              <div id="tabMembers2" v-show="isShowRankingChart"></div>
              <br><br><br><br>
              <IEcharts v-show="isShowRankingChart" :option="teachPlanDownloadCountBar" :loading="rankingLoading" style="width: 1200px; height: 600px" ></IEcharts>
              <br><br>
              <div v-show="isShowRankingChart" class="form-group">
                <label>選擇下載檔案類型</label>
                <select class="form-control" v-model="selectFileType">
                  <option value="xls">xls</option>
                  <option value="html">html</option>
                  <option value="pdf">pdf</option>
                </select>
              </div>
              <ExcelExport
                v-show="isShowRankingChart"
                class   = "btn btn-default"
                :data   = "teachPlanDownloadCountExcelDatas"
                :fields = "teachPlanDownloadCountExcelField"
                :type    = "selectFileType"
                name    = "教學資源下載數排行.xls">
                下載教學資源下載數排行
              </ExcelExport>
              <div id="tabMembers3" v-show="isShowRankingChart"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
import IEcharts from 'vue-echarts-v3'
import ExcelExport from "../components/ExcelExport.vue";

// import ECharts.js modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
export default {
  components: {
    IEcharts,
    ExcelExport,
  },
  data() {
    return {
      disable: false,
      memberRegisterCountExcelField : {
        日期 : 'Title',
        註冊人數 : 'Count',
        '增幅率(%)' : 'GrowthRate',
        '當前註冊總人數' : 'TotalRegisterCount',
      },
      memberRegisterCountExcelDatas : [],
      memberLessonStatisticsExcelField : {
        姓名: 'MemberName',
        學校: 'School',
        課程觀看次數: 'TotalCount',
        '課程觀看總時間(秒)' : 'TotalTime',
      },
      memberLessonStatisticsExcelDatas : [],
      lessonVisitCountExcelField : {
        姓名: 'MemberName',
        學校: 'School',
        課程觀看次數: 'TotalCount',
      },
      lessonVisitCountExcelDatas : [],
      lessonVisitTimeExcelField : {
        姓名: 'MemberName',
        學校: 'School',
        '課程觀看總時間(秒)' : 'TotalTime',
      },
      lessonVisitTimeExcelDatas : [],
      teachPlanDownloadCountExcelField : {
        姓名: 'MemberName',
        學校: 'School',
        教學資源下載數: 'TotalCount',
      },
      teachPlanDownloadCountExcelDatas : [],
      isShowRegisterCountChart:false,
      isShowRankingChart: false,
      isShowMemberStatisticsChart: false,
      loading: false,
      rankingLoading: false,
      registerCountBar: {
          title: {
              text: '會員註冊人數'
          },
          tooltip: {},
          grid: {
            top: 90,
            bottom: 0,
            left: 50,
            right: '15%',
            containLabel: true,
          },
          xAxis: [
            {
              data: []
            },
            {
              data: []
            }
          ],
          yAxis: [
            {
              name: "單位（人數）",
              position: 'left',
            },
            {
              name: "單位（%）",
              position: 'right',
            }
          ],
          series: [
            {
              name: '人數',
              barWidth: 20,
              type: 'bar',
              yAxisIndex: 0,
              data: []
            },
            {
              name: '增幅率(%)',
              type: 'line',
              data: [],
              markpoint: {
                data : [
                  {
                      name: '最大值',
                      type: 'max',
                      itemStyle: {
                        color: '#2E90D1'
                      }
                  }, 
                ]
              },
              yAxisIndex: 1,
              label:{
                show: true
              }
            }
        ]
      },
      lessonVisitCountBar: {
        title: {
            text: '會員課程觀看次數排行'
        },
        tooltip: {},
        grid: {
          top: 90,
          bottom: 0,
          left: 50,
          right: '15%',
          containLabel: true,
        },
        xAxis: [
          {
            inverse: false,
            data: []
          }
        ],
        yAxis: [
          {
            name: "單位（次數）",
          }
        ],
        series: [
          {
            realtimeSort: true,
            name: '觀看次數',
            barWidth: 30,
            type: 'bar',
            data: [].sort((a,b)=>{
                return a.name > b.name ? 1 : -1;
            }),
            markpoint: {
              data : [
                {
                    name: '最大值',
                    type: 'max',
                    itemStyle: {
                      color: '#2E90D1'
                    }
                }, 
              ]
            },
            label:{
              show: true
            }
          }
        ]
      },
      lessonVisitTimeBar: {
        title: {
          text: '會員課程觀看總時間排行'
        },
        tooltip: {},
        grid: {
          top: 90,
          bottom: 0,
          left: 50,
          right: '15%',
          containLabel: true,
        },
        xAxis: [
          {
            inverse: false,
            data: []
          }
        ],
        yAxis: [
          {
            name: "單位（秒數）",
          }
        ],
        series: [
          {
            realtimeSort: true,
            name: '觀看總時間(秒)',
            barWidth: 30,
            type: 'bar',
            data: [],
            markpoint: {
              data : [
                {
                    name: '最大值',
                    type: 'max',
                    itemStyle: {
                      color: '#2E90D1'
                    }
                }, 
              ]
            },
            label:{
              show: true
            }
          }
        ]
      },
      teachPlanDownloadCountBar: {
        title: {
            text: '教學資源下載數排行',
        },
        tooltip: {},
        grid: {
          top: 90,
          bottom: 0,
          left: 50,
          right: '15%',
          containLabel: true,
        },
        xAxis: [
          {
            inverse: false,
            data: []
          }
        ],
        yAxis: [
          {
            name: "單位（次數）",
          }
        ],
        series: [
          {
            realtimeSort: true,
            name: '下載次數',
            
            barWidth: 30,
            type: 'bar',
            data: [],
            markpoint: {
              data : [
                {
                    name: '最大值',
                    type: 'max',
                    itemStyle: {
                      color: '#2E90D1'
                    }
                }, 
              ]
            },
            label:{
              show: true
            }
          }
        ]
      },
      memberLessonSummaryLabels: {
        anonymousTotalCount : 0,
        anonymousTotalCountLabel : "非登入會員觀看總次數",
        anonymousTotalTime : 0,
        anonymousTransferTotalTime : "",
        anonymousTotalTimeLabel : "非登入會員觀看總時間(秒)",
        memberTotalCount : 0,
        memberTotalCountLabel : "會員觀看總次數",
        memberTotalTime : 0,
        memberTransferTotalTime : "",
        memberTotalTimeLabel : "會員觀看總時間(秒)",
      },
      registerCountLabels: {
        dateIntervalRegisterCountsLabel : '從 {0} 到 {1} 註冊人數',
        dateIntervalRegisterCounts : 0,
        totalRegisterCountsLabel : '截至 {1} 為止總註冊人數',
        totalRegisterCounts : 0,
      },
      dateRegisterCountList: [],
      selectStatisticsSdate: '',
      selectStatisticsEdate: '',
      selectRankingSdate: '',
      selectRankingEdate: '',
      selectEdate: '',
      selectSdate: '',
      selectDateType: 1,
      selectFileType: 'xls',
      selectDwonloadType: 1,
      getDates: [],
      getStatisticsDates: [],
      getRaningkDates: [],
      pickerOptions: {
        shortcuts: [{
            text: '最近一週',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近30天',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近90天',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
      },
      teachPlanMgtFlag: true,
      items: [],
      ShowTechPlanRankCharts: true,
    };
  },
  mounted() {
    window.model = this;
    this.load();
  },
  watch: {
    async getDates(val) {
      this.selectSdate = (val == null ? "" : val[0]);
      this.selectSdate = (val == null ? "" : val[1]);
    },
    async getStatisticsDates(val) {
      var sDate = (val == null ? "" : val[0]);
      var eDate = (val == null ? "" : val[1]);
      this.initMemberLessonStatisticsBarChart(sDate, eDate);
    },
    async getRaningkDates(val) {
      this.selectRankingSdate = (val == null ? "" : val[0]);
      this.selectRankingEdate = (val == null ? "" : val[1]);
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
        { title: "姓名", data: "Name" },
        { title: "Email", data: "Email" },
        { title: "手機", data: "Mobile" },
        {
          title: "身份",
          data: "Type",
          render: function (data, type, row, meta) {
            if (data == 0) {
              return "一般會員";
            } else if (data == 1) {
              return "教師";
            }
            return "學生";
          },
        },
        {
          title: "狀態",
          data: "Status",
          render: function (data, type, row, meta) {
            if (data == 0) {
              return '<span class="badge badge-success">啟用</span>';
            }
            return '<span class="badge badge-danger">停權</span>';
          },
        },
        { title: "學校", data: "School" },
        { title: "班級", data: "Class" },
        {
          title: "功能",
          data: "MemberID",
          width: 180,
          render: function (data, type, row, meta) {
            return (
              '<button type="button" class="btn btn-default" onclick="window.model.editItem(' +
              data +
              ')">編輯</button>'
              /* +(row["Active"]
                ? '<button type="button" class="btn btn-default" onclick="window.model.delItem(' +
                  data +
                  ')">停用</button>'
                : "")*/
            );
          },
        },
      ];  
      var response = await this.$api.getMembers();
      this.createDataTable("#tabMembers", cols, response, {
      });
    },
    updateMenagementFlag() {
      this.isShowRankingChart = false;
      this.isShowRegisterCountChart = false;
      this.isShowMemberStatisticsChart = false;
      this.isShowMemberLessonSummary = false;
      this.loading = false;
      this.statisticsLoading = false;
      this.rankingLoading = false;
    },
    updateRegisterStatisticFlag(flag) {
      this.isShowRankingChart = false;
      this.isShowRegisterCountChart = true;
      this.isShowMemberStatisticsChart = false;
      this.isShowMemberLessonSummary = false;
      this.loading = flag;
      this.getRegisterCountsByDate(this.selectSdate, this.selectEdate, 1);
      this.initRegisterCountBarChart(this.selectSdate, this.selectEdate, 1);
      this.loading = false;
    },
    updateMemberStatisticFlag(flag) {
      this.isShowRankingChart = false;
      this.isShowRegisterCountChart = false;
      this.isShowMemberStatisticsChart = true;
      this.isShowMemberLessonSummary = true;
      this.statisticsLoading = flag;
      this.initMemberLessonStatisticsBarChart(this.selectStatisticsSdate, this.selectStatisticsEdate);
      this.statisticsLoading = false;
    },
    updateRankingStatisticFlag(flag) {
      this.isShowRankingChart = true;
      this.isShowRegisterCountChart = false;
      this.isShowMemberStatisticsChart = false;
      this.isShowMemberLessonSummary = false;
      this.rankingLoading = flag;
      this.initLessonVisitCountBarChart(this.selectRankingSdate, this.selectRankingEdate);
      this.initLessonVisitTimeBarChart(this.selectRankingSdate, this.selectRankingEdate);
      this.initTeachPlanDownloadCountBarChart(this.selectRankingSdate, this.selectRankingEdate);
      this.rankingLoading = false;
    },

    async initRegisterCountBarChart(startDate, endDate, dateType) {
      var colRegisterCounts = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { title: "日期", data: "Title" },
        { title: "註冊人數", data: "Count" },
        { title: "增幅率(%)", data: "GrowthRate" },
        { title: "當前註冊總人數", data: "TotalRegisterCount" },
      ];
      var datas = await this.$api.getMemberRegisterStatistics(startDate, endDate, dateType);
      this.memberRegisterCountExcelDatas = datas.MemberRegisterStatistics;
      this.createDataTable("#tabMembers4", colRegisterCounts, datas.MemberRegisterStatistics, {
        "searching": false, 
        "paging": false,
      });
      var chartsXValues = [];
      var chartsX1Values = [];
      var chartsYValues = [];
      this.registerCountLabels.dateIntervalRegisterCounts = 0;
      datas.MemberRegisterStatistics.forEach((d) => {
        chartsYValues.push(d.Title);
        chartsXValues.push(d.Count);
        chartsX1Values.push(d.GrowthRate);
        this.registerCountLabels.dateIntervalRegisterCounts = this.registerCountLabels.dateIntervalRegisterCounts + d.Count;
      });
      this.registerCountLabels.dateIntervalRegisterCountsLabel = '從 ' + datas.StartDate + ' 到 ' + datas.EndDate + ' 註冊人數';
      this.registerCountLabels.totalRegisterCountsLabel = '截至 ' + datas.EndDate + ' 為止總註冊人數';
      this.registerCountBar.xAxis[0].data = chartsYValues;
      this.registerCountBar.series[0].data = chartsXValues;
      this.registerCountBar.series[1].data = chartsX1Values;
    },
    async getRegisterCountsByDate(startDate, endDate, dateType) {
      var registerCount = await this.$api.getMemberRegisterCounts(startDate, endDate, dateType);
      this.registerCountLabels.totalRegisterCounts = 0;
      this.registerCountLabels.totalRegisterCounts = registerCount.RegisterCounts;
      this.dateRegisterCountList = registerCount.DateRegisterCounts;
    },
    async initMemberLessonStatisticsBarChart(startDate, endDate) {
      var colMemberTotalCounts = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { title: "姓名", data: "MemberName" },
        { title: "學校", data: "School" },
        { title: "課程觀看次數", data: "TotalCount" },
        { title: "課程觀看總時間(時:分:秒)", data: "TotalTime",
          render: function (data, type, row, meta) {
            return data + "(" + window.utils.toHhMmSs(data) + ")";
          },
        },
        {
          title: "功能",
          data: "MemberID",
          width: 180,
          render: function (data, type, row, meta) {
            if (row['MemberID'] == 0) {
              return "";
            } else {
              return (
                '<button type="button" class="btn btn-default" onclick="window.model.editItem(' +
                data +
                ')">編輯</button>'
              );
            }
          },
        },
      ];
      var datas = await this.$api.getMemberLessonStatistics(startDate, endDate);
      this.memberLessonStatisticsExcelDatas = datas.MemberLessonStatisticList;
      this.createDataTable("#tabMemberStatistics", colMemberTotalCounts, datas.MemberLessonStatisticList, {
        "searching": false, 
        "paging": false,
      });
      this.memberLessonSummaryLabels.anonymousTotalCount = datas.AnonymousTotalCount;
      this.memberLessonSummaryLabels.anonymousTotalTime = datas.AnonymousTotalTime;
      this.memberLessonSummaryLabels.anonymousTransferTotalTime = "(" + window.utils.toHhMmSs(datas.AnonymousTotalTime) + ") 時:分:秒";
      this.memberLessonSummaryLabels.memberTotalCount = datas.MemberTotalCount;
      this.memberLessonSummaryLabels.memberTotalTime = datas.MemberTotalTime;
      this.memberLessonSummaryLabels.memberTransferTotalTime = "(" + window.utils.toHhMmSs(datas.MemberTotalTime) + ") 時:分:秒";
    },
    async initLessonVisitCountBarChart(startDate, endDate) {
      var colMemberTotalCounts = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { title: "姓名", data: "MemberName" },
        { title: "學校", data: "School" },
        { title: "課程觀看次數", data: "TotalCount" },
        {
          title: "功能",
          data: "MemberID",
          width: 180,
          render: function (data, type, row, meta) {
            if (row['MemberID'] == 0) {
              return "";
            } else {
              return (
                '<button type="button" class="btn btn-default" onclick="window.model.editItem(' +
                data +
                ')">編輯</button>'
              );
            }
          },
        },
      ];
      var datas = await this.$api.getMemberLessonStatisticsRanking(startDate, endDate, "Count");
      this.lessonVisitCountExcelDatas = datas;
      this.createDataTable("#tabMembers1", colMemberTotalCounts, datas, {
        "searching": false, 
        "paging": false,
      });
      var chartsXValues = [];
      var chartsYValues = [];

      datas.forEach((d) => {
        chartsYValues.push(d.MemberName);
        chartsXValues.push(d.TotalCount);
      });
      this.lessonVisitCountBar.xAxis[0].data = chartsYValues;
      this.lessonVisitCountBar.series[0].data = chartsXValues;
    },
    async initLessonVisitTimeBarChart(startDate, endDate) {
      var colMemberTotalTimes = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { title: "姓名", data: "MemberName" },
        { title: "學校", data: "School" },
        { title: "課程觀看總時間(時:分:秒)", data: "TotalTime",
          render: function (data, type, row, meta) {
            return data + "(" + window.utils.toHhMmSs(data) + ")";
          },
        },
        {
          title: "功能",
          data: "MemberID",
          width: 180,
          render: function (data, type, row, meta) {
            if (row['MemberID'] == 0) {
              return "";
            } else {
              return (
                '<button type="button" class="btn btn-default" onclick="window.model.editItem(' +
                data +
                ')">編輯</button>'
              );
            }
          },
        },
      ];
      var datas = await this.$api.getMemberLessonStatisticsRanking(startDate, endDate, "Time");
      this.lessonVisitTimeExcelDatas = datas;
      this.createDataTable("#tabMembers2", colMemberTotalTimes, datas, {
        "searching": false, 
        "paging": false,
      });
      var chartsXValues = [];
      var chartsYValues = [];

      datas.forEach((d) => {
        chartsYValues.push(d.MemberName);
        chartsXValues.push(d.TotalTime);
      });
      this.lessonVisitTimeBar.xAxis[0].data = chartsYValues;
      this.lessonVisitTimeBar.series[0].data = chartsXValues;
    },
    async initTeachPlanDownloadCountBarChart(startDate, endDate) {
      var colsTeachPlanTotalDownloadCounts = [
        {
          title: "#",
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { title: "姓名", data: "MemberName" },
        { title: "學校", data: "School" },
        { title: "教學資源下載數", data: "TotalCount" },
        {
          title: "功能",
          data: "MemberID",
          width: 180,
          render: function (data, type, row, meta) {
            if (row['MemberID'] == 0) {
              return "";
            } else {
              return (
                '<button type="button" class="btn btn-default" onclick="window.model.editItem(' +
                data +
                ')">編輯</button>'
              );
            }
          },
        },
      ];
      var datas = await this.$api.getMemberTeachPlanStatistics(startDate, endDate);
      this.teachPlanDownloadCountExcelDatas = datas;
      this.createDataTable("#tabMembers3", colsTeachPlanTotalDownloadCounts, datas, {
        "searching": false, 
        "paging": false,
      });
      var chartsXValues = [];
      var chartsYValues = [];

      datas.forEach((d) => {
        chartsYValues.push(d.MemberName);
        chartsXValues.push(d.TotalCount);
      });
      this.teachPlanDownloadCountBar.xAxis[0].data = chartsYValues;
      this.teachPlanDownloadCountBar.series[0].data = chartsXValues;
    },


    editItem(id) {
      this.$router.push(`/member/${id}`);
    },
    getMemberRegisterCountStatisticByDate() {
      if (this.selectDateType == "") {
        alert("請輸入日期與時間類型");
        return;
      }
      this.isShowRankingChart = false;
      this.isShowRegisterCountChart = true;
      this.loading = true;
      this.initRegisterCountBarChart(this.selectSdate, this.selectEdate, this.selectDateType);
      this.getRegisterCountsByDate(this.selectSdate, this.selectEdate, this.selectDateType);
      this.loading = false;
    },
    getMemberStatisticByDate() {
      this.rankingLoading = true;
      console.log(this.selectRankingSdate);
      console.log(this.selectRankingEdate);
      this.initLessonVisitCountBarChart(this.selectRankingSdate, this.selectRankingEdate);
      this.initLessonVisitTimeBarChart(this.selectRankingSdate, this.selectRankingEdate);
      this.initTeachPlanDownloadCountBarChart(this.selectRankingSdate, this.selectRankingEdate);
      this.rankingLoading = false;
    },
    getMemberStatisticCsvByDate() {
      if (this.selectDwonloadType == "") {
        alert("請輸入下載類型");
        return;
      } else if (this.selectDwonloadType == 1) {
        this.$api.getMemberLessonStatisticsCsv(this.selectRankingSdate, this.selectRankingEdate, "Count"); 
      } else if (this.selectDwonloadType == 2) {
        this.$api.getMemberLessonStatisticsCsv(this.selectRankingSdate, this.selectRankingEdate, "Time"); 
      } else if (this.selectDwonloadType == 3) {
        this.$api.getMemberTeachPlanStatisticsCsv(this.selectRankingSdate, this.selectRankingEdate);
      }
    },
  },
};

</script>