<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">課程內容管理</h1>
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
    <section class="content" id="doc">
      <div class="container-fluid">
        <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">{{ Title }}</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <form role="form">
              <div class="form-group">
                <label>課程名稱</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="lesson.LessonName"
                />
              </div>
              <div class="form-group">
                <label>課程類別 </label>
                <select
                  class="form-control"
                  required
                  v-model="lesson.LessonCategoryID"
                >
                  <option
                    :value="c.LessonCategoryID"
                    v-for="c in Categories"
                    :key="c.LessonCategoryID"
                  >
                    {{ c.CategoryName }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>課程長度</label>
               <div
                  type="text"
                  class="form-control"
                >
                {{lesson.VideoLength|chhmmss}}
               </div>
              </div>
              <div class="form-group">
                <label>課程簡介</label>
                <textarea
                  rows="8"
                  class="form-control"
                  required
                  v-ckeditor="lesson.Brief"
                />
              </div>
              <div class="form-group">
                <label>課程目標</label>
                <textarea
                  rows="8"
                  class="form-control"
                  required
                  v-ckeditor="lesson.Goal"
                />
              </div>

              <div class="form-group">
                <label>課程對象</label>
                <textarea
                  rows="8"
                  class="form-control"
                  required
                  v-ckeditor="lesson.Target"
                />
              </div>
              <div class="form-group">
                <label>課程習題</label>
                <select
                  class="form-control"
                  required
                  v-model="lesson.HasHomeWork"
                >
                  <option :value="false">無</option>
                  <option :value="true">有</option>
                </select>
              </div>
              <div class="form-group">
                <label>課程圖片上傳</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input
                      type="text"
                      class="form-control"
                      v-model="imagefile.SrcFileName"
                      disabled
                    />
                  </div>
                  <div class="input-group-append">
                    <button
                      class="input-group-text"
                      @click="download(imagefile.Url)"
                    >
                      下載
                    </button>
                    <button
                      class="input-group-text"
                      id="upload-plan-file"
                      data-accept="image/*"
                    >
                      上傳
                    </button>
                  </div>
                </div>
                <div
                  class="progress progress-xxs mb-3"
                  v-if="imagefile.Status > 0"
                >
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    :aria-valuenow="imagefile.Progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="`width: ${imagefile.Progress}%`"
                  ></div>
                </div>
              </div>
              <div class="form-group">
                <label>課程章節標題</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="lesson.ChapterTitle"
                />
              </div>
              <div class="form-group">
                <label>課程章節主題</label>
                <select
                  class="form-control"
                  required
                  v-model="lesson.HasChapterSubject"
                >
                  <option :value="false">無</option>
                  <option :value="true">有</option>
                </select>
              </div>
              <!-- /.card-body -->
            </form>
          </div>
          <div class="card-footer" v-if="!lesson.HasHomeWork">
            <button
              type="button"
              class="btn btn-primary pull-right w150"
              @click="save()"
            >
              儲存
            </button>
          </div>
        </div>
        <div class="card card-primary" v-if="lesson.HasChapterSubject">
          <div class="card-header">
            <h3 class="card-title">課程章節主題</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <ul class="todo-list" style="margin-bottom: 10px">
              <li v-for="(s, i) in subjects" :key="s.ID">
                <div style="display: inline-block; margin-right: 20px">
                  {{ i + 1 }}.
                </div>
                <input
                  type="text"
                  class="form-control"
                  style="width: 90%; display: inline-block"
                  required
                  v-model="s.Name"
                />
                <div style="float: right">
                  <i class="fas fa-trash" @click="removeSubject(s)"></i>
                </div>
              </li>
            </ul>
            <button class="btn btn-success" @click="addSubjects">
              新增章節主題
            </button>
          </div>
        </div>
        <div class="card card-primary" v-if="lesson.HasChapterSubject">
          <div class="card-header">
            <h3 class="card-title">課程章節</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <div
              class="callout callout-info"
              v-for="(c, i) in chapters"
              :id="'chapter-' + (i + 1)"
              :key="i"
            >
              <h5>第{{ i + 1 }}章</h5>
              <button
                type="button"
                class="close"
                style="position: relative; top: -30px"
                @click="removeChapter(c)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <hr />
              <div class="form-horizontal">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">章節主題</label>
                  <div class="col-sm-10">
                    <select
                      class="form-control"
                      required
                      v-model="c.LessonSubjectID"
                    >
                      <option
                        v-for="(s, i) in subjects"
                        :key="s.ID"
                        :value="s.ID"
                      >
                        {{ i + 1 }}. {{ s.Name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">章節標題</label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入問題"
                      required
                      v-model="c.ChapterName"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>課程影片上傳</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        type="text"
                        class="form-control"
                        v-model="c.video.SrcFileName"
                        disabled
                      />
                    </div>
                    <div class="input-group-append">
                      <button
                        class="input-group-text"
                        @click="download(c.video.Url)"
                      >
                        下載
                      </button>
                      <button class="input-group-text" @click="uploadVideo(c)">
                        上傳
                      </button>
                    </div>
                  </div>
                  <div
                    class="progress progress-xxs mb-3"
                    v-if="c.video.Status > 0"
                  >
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      :aria-valuenow="c.video.Progress"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      :style="`width: ${c.video.Progress}%`"
                    ></div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">影片長度</label>
                  <div class="col-sm-10">
                    <div type="text" class="form-control">
                      {{ c.video.VideoLength | chhmmss }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-success" @click="addChapter">
              新增章節
            </button>
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
        <div class="card card-primary" v-else>
          <div class="card-header">
            <h3 class="card-title">課程章節</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <div
              class="callout callout-info"
              v-for="(c, i) in chapters"
              :id="'chapter-' + (i + 1)"
              :key="i"
            >
              <h5>第{{ i + 1 }}章</h5>
              <button
                type="button"
                class="close"
                style="position: relative; top: -30px"
                @click="removeChapter(c)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <hr />
              <div class="form-horizontal">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">章節標題</label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入問題"
                      required
                      v-model="c.ChapterName"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>課程影片上傳</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        type="text"
                        class="form-control"
                        v-model="c.video.SrcFileName"
                        disabled
                      />
                    </div>
                    <div class="input-group-append">
                      <button
                        class="input-group-text"
                        @click="download(c.video.Url)"
                      >
                        下載
                      </button>
                      <button class="input-group-text" @click="uploadVideo(c)">
                        上傳
                      </button>
                    </div>
                  </div>
                  <div
                    class="progress progress-xxs mb-3"
                    v-if="c.video.Status > 0"
                  >
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      :aria-valuenow="c.video.Progress"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      :style="`width: ${c.video.Progress}%`"
                    ></div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">影片長度</label>
                  <div class="col-sm-10">
                    <div type="text" class="form-control">
                      {{ c.video.VideoLength | chhmmss }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-success" @click="addChapter">
              新增章節
            </button>
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

        <div class="card card-secondary" v-if="lesson.HasHomeWork">
          <div class="card-header">
            <h3 class="card-title">課程習題</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <div
              class="callout callout-info"
              v-for="(h, i) in homeworks"
              :key="i"
            >
              <h5>第{{ i + 1 }}題</h5>
              <button
                type="button"
                class="close"
                style="position: relative; top: -30px"
                @click="removeQuestion(h)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <hr />
              <div class="form-horizontal">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">問題</label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入問題"
                      required
                      v-model="h.Question"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">答案選項1</label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入答案選項"
                      required
                      v-model="h.Answers[0]"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">答案選項2</label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入答案選項"
                      v-model="h.Answers[1]"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">答案選項3</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入答案選項"
                    v-model="h.Answers[2]"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">答案選項4</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入答案選項"
                    v-model="h.Answers[3]"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">正解</label>
                <div class="col-sm-10">
                  <select class="form-control" v-model="h.CorrectAnswer">
                    <option
                      v-for="(a, ai) in h.Answers"
                      :key="ai"
                      :value="ai"
                      v-show="a"
                    >
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">答案解析</label>
                <div class="col-sm-10">
                  <textarea
                    rows="4"
                    class="form-control"
                    required
                    v-model="h.Description"
                  />
                </div>
              </div>
            </div>
            <button class="btn btn-success" @click="addQuestion">
              新增問題
            </button>
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
import { max } from "moment";

export default {
  data() {
    return {
      Title: "",
      Categories: [],
      lesson: {
        IsNew: true,
        LessonCategoryID: null,
        LessonName: null,
        ImageUrl: null,
        ChapterTitle: "",
        VideoLength: 0,
        LessonLength: '',
        Brief: null,
        Goal: null,
        Target: null,
        HasHomeWork: false,
        HasChapterSubject: false,
      },
      imagefile: {
        Status: 0,
        CancelToken: null,
        Progress: 0,
        SrcFileName: "",
        Url: "",
        File: null,
      },
      video: {
        Status: 0,
        CancelToken: null,
        Progress: 0,
        SrcFileName: "",
        Url: "",
        File: null,
        VideoLength: 0
      },
      homeworks: [],
      chapters: [],
      subjects: [],
    };
  },
  async mounted() {
    window.model = this;
    this.Categories = await this.$api.getLessonCategories();
    this.lesson.IsNew = this.$route.params.id == "new";
    if (!this.lesson.IsNew) {
      var doc = await this.$api.getLesson(this.$route.params.id);
      this.lesson = $.extend(this.lesson, doc.Lesson);
      this.imagefile.Url = this.lesson.ImageUrl;
      this.imagefile.SrcFileName = this.lesson.ImageUrl;
      if (doc.Lesson.ChapterSubjects) {
        this.subjects = doc.Lesson.ChapterSubjects;
      }

      var homeworks = [];
      doc.HomeWork.Question.forEach((q, i) => {
        homeworks.push({
          Question: q.Question,
          Answers: q.Answers,
          CorrectAnswer: doc.HomeWork.Data[i].CorrectAnswer,
          Description: doc.HomeWork.Data[i].Description,
        });
      });
      this.homeworks = homeworks;

      this.lesson.VideoLength = 0;
      var chapters = [];
      doc.Chapters.forEach((c) => {
        chapters.push(
          $.extend(
            {
              video: {
                Status: 0,
                CancelToken: null,
                Progress: 0,
                SrcFileName: c.VideoUrl,
                Url: c.VideoUrl,
                File: null,
                VideoLength: c.VideoLength,
              },
            },
            c
          )
        );
        this.lesson.VideoLength += c.VideoLength;
      });
      this.chapters = chapters;

      this.Title = "編輯課程";
    } else {
      this.Title = "新增課程";
      this.addChapter();
    }
    this.load();

    this.$nextTick(() => {
      this.fileUpload(
        "#upload-plan-file",
        this.callback(this.imagefile, "/api/backend/UploadLessonImageFile")
      );
    });
  },
  methods: {
    async load() {},
    readVideoLength(file, callback) {
      var video = $(`
            <video controls>
                <source type="video/mp4" src="${URL.createObjectURL(file)}">
            </video>`);
      video.on("loadedmetadata", function (e) {
        var time = parseInt(video[0].duration);
        callback(time);
      });
      video.get(0).load();
    },
    callback(data, url) {
      return (file) => {
        data.Status = 1;
        data.CancelToken = this.$api.getCancelToken();
        data.Progress = 0;
        data.SrcFileName = file.name;
        data.File = file;
        var upload = async () => {
          this.$api.setEnableBlockUI(false);
          var response = await this.$api.upload(
            url,
            file,
            data.CancelToken,
            (progress) => {
              if (progress >= 100) {
                alert("上傳完成", () => {
                  data.Status = 2;
                });
              }
              data.Progress = progress;
            }
          );
          data.Url = response.Item2;
          this.$api.setEnableBlockUI(true);
        };
        if (/.*\.mp4$/g.test(data.SrcFileName)) {
          this.readVideoLength(file, async (length) => {
            data.VideoLength = length;
            upload();
          });
        } else {
          upload();
        }
      };
    },
    async save() {
      if (!this.validate("#doc")) {
        return;
      }

      var homework = {
        Question: [],
        Data: [],
      };

      this.homeworks.forEach((h) => {
        homework.Question.push({
          Question: h.Question,
          Answers: h.Answers,
        });
        homework.Data.push({
          CorrectAnswer: h.CorrectAnswer,
          Description: h.Description,
        });
      });

      this.chapters.forEach((c) => {
        c.VideoUrl = c.video.Url;
        c.VideoLength = c.video.VideoLength;
      });

      if (this.lesson.HasHomeWork && this.homeworks.length == 0) {
        alert("至少要有一個問題");
        return;
      }
      if (this.chapters.length == 0) {
        alert("至少要有一個章節");
        return;
      }

      for (var i in this.chapters) {
        if (this.chapters[i].video && this.chapters[i].video.Status == 1) {
          alert("請等待影片上傳完成");
          return;
        }
      }

      if (this.lesson.HasChapterSubject) {
        this.lesson.ChapterSubjects = this.subjects;
      }

      if (this.lesson.IsNew) {
        if (this.imagefile.Status == 2) {
          this.lesson.ImageUrl = this.imagefile.Url;
        } else {
          alert("請選擇課程圖片");
          return;
        }
        var did = await this.$api.addLesson({
          Lesson: this.lesson,
          HomeWork: homework,
          Chapters: this.chapters,
        });
      } else {
        if (this.imagefile.Status == 2) {
          this.lesson.ImageUrl = this.imagefile.Url;
        }
        await this.$api.updateLesson({
          Lesson: this.lesson,
          HomeWork: homework,
          Chapters: this.chapters,
        });
      }
      alert("儲存完成", () => {
        this.$router.push(`/lessons`);
      });
    },
    download(url) {
      window.open(this.$options.filters.imageCDN(url));
    },
    addQuestion() {
      this.homeworks.push({
        Question: "",
        Answers: ["", "", "", ""],
        CorrectAnswer: 0,
        Description: "",
      });
      this.$nextTick(() => {
        $("html,body").animate({ scrollTop: document.body.scrollHeight }, 1000);
      });
    },
    addQuestion() {
      this.homeworks.push({
        Question: "",
        Answers: ["", "", "", ""],
        CorrectAnswer: 0,
        Description: "",
      });
      this.$nextTick(() => {
        $("html,body").animate({ scrollTop: document.body.scrollHeight }, 1000);
      });
    },
    removeQuestion(q) {
      this.homeworks.remove(q);
    },
    addChapter() {
      this.chapters.push({
        ChapterName: "",
        VideoLength: 0,
        VideoUrl: "",
        video: {
          Status: 0,
          CancelToken: null,
          Progress: 0,
          SrcFileName: "",
          Url: "",
          File: null,
          VideoLength: 0,
        },
      });
      //this.$nextTick(() => {
      //  $("html,body").animate(
      //    { scrollTop: $(`#chapter-${this.chapters.length}`).offset().top() },
      //    1000
      //  );
      //});
    },
    removeChapter(q) {
      this.chapters.remove(q);
    },
    uploadVideo(c) {
      this.startFileUpload(
        this.callback(c.video, "/api/backend/UploadLessonVideoFile"),
        "video/*"
      );
    },
    addSubjects() {
      var maxid = 0;
      this.subjects.forEach((x) => {
        if (x.ID > maxid) {
          maxid = x.ID;
        }
      });
      this.subjects.push({
        ID: maxid + 1,
        Name: "",
      });
    },
    removeSubject(s) {
      this.subjects.remove(s);
    },
  },
};
</script>