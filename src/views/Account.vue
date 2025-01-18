<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">帳號及權限管理</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">帳號及權限管理</li>
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
            <div class="card card-primary card-outline card-tabs">
              <div class="card-header p-0 pt-1 border-bottom-0">
                <ul
                  class="nav nav-tabs"
                  id="custom-tabs-two-tab"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="custom-tabs-two-home-tab"
                      data-toggle="pill"
                      href="#custom-tabs-two-home"
                      role="tab"
                      aria-controls="custom-tabs-two-home"
                      aria-selected="true"
                      >群組管理</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="custom-tabs-two-profile-tab"
                      data-toggle="pill"
                      href="#custom-tabs-two-profile"
                      role="tab"
                      aria-controls="custom-tabs-two-profile"
                      aria-selected="false"
                      >帳號管理</a
                    >
                  </li>
                </ul>
                <button
                  class="btn btn-success"
                  v-auth="'AccountCreate'"
                  style="
                    float: right;
                    position: relative;
                    right: 10px;
                    top: -43px;
                  "
                  @click="showAdd()"
                >
                  新增
                </button>
              </div>
              <div class="card-body">
                <div class="tab-content" id="custom-tabs-two-tabContent">
                  <div
                    class="tab-pane fade active show"
                    id="custom-tabs-two-home"
                    role="tabpanel"
                    aria-labelledby="custom-tabs-two-home-tab"
                  >
                    <div id="tabRoles" v-auth="'Role'"></div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="custom-tabs-two-profile"
                    role="tabpanel"
                    aria-labelledby="custom-tabs-two-profile-tab"
                  >
                    <div id="tabAccounts"></div>
                  </div>
                </div>
              </div>
              <!-- /.card -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->

    <b-modal
      id="mlRole"
      :title="mlRoleTitle"
      ok-title="儲存"
      cancel-title="取消"
      @ok="mlRoleOK"
      v-if="currentRole"
    >
      <div class="card-body">
        <div class="form-group">
          <label>群組名稱</label>
          <input
            type="text"
            class="form-control"
            placeholder="群組名稱"
            v-model="currentRole.RoleName"
          />
        </div>
        <div class="form-group">
          <label>狀態</label>
          <div class="row">
            <div class="col-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radio1"
                  :value="true"
                  v-model="currentRole.Enable"
                />
                <label class="form-check-label">啟用</label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radio1"
                  :value="false"
                  v-model="currentRole.Enable"
                />
                <label class="form-check-label">停用</label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>權限設定</label>
          <div class="row">
            <div class="check-container">
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Account"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">帳號及權限管理</label>
                </div>
              </div>
              <div class="lv2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="AccountCreate"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">帳號新增</label>
                </div>
              </div>
              <div class="lv2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="AccountDelete"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">帳號刪除</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Role"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">權限管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Banner"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">Banner管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="News"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">最新消息管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="CollageInfo"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">關於本院管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="CollageColleague"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">師資陣容管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="CollageColleague"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">師資陣容管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="CollageDepartment"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">系所單位管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="CollageCourse"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">學院課程管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="ActivityHistory"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">活動集錦管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Regulation"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">法規章程管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="RelatedResource"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">相關資源管理</label>
                </div>
              </div> 
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="CollageHeadElection"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">院長遴選管理</label>
                </div>
              </div> 
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="SystemLog"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">系統紀錄管理</label>
                </div>
              </div> 
              <!--TODO 2023-12-10 Hidden-->
              <!-- <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Document"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">文章管理</label>
                </div>
              </div> -->
              <!-- <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="TechPlan"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">教學資源管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Lesson"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">課程管理</label>
                </div>
              </div> -->
              <!--TODO 2023-12-10 Hidden-->
              <!-- <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Category"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">商品類別管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Product"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">商品管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Brand"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">品牌管理</label>
                </div>
              </div> -->
              <!-- <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Banner"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">廣告管理</label>
                </div>
              </div> -->
              <!--TODO 2023-12-10 Hidden-->
              <!-- <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Event"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">活動管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Coupon"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">折價券管理</label>
                </div>
              </div> -->
              <!-- <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Member"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">會員管理</label>
                </div>
              </div>
              <div class="lv2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="MemberEdit"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">會員資料修改</label>
                </div>
              </div> -->
              <!--TODO 2023-12-10 Hidden-->
              <!-- <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Order"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">訂單管理</label>
                </div>
              </div>
               <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="ExpensiveNotify"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">買貴通報管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="SendPoint"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">發送故宮線上學校幣</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="PointSendLog"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">車麗屋幣發送紀錄</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="HomeBrick"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">首頁管理 / 區塊管理</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Store"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">營業據點管理</label>
                </div>
              </div> -->
              <!-- <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="Css"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">CSS定義</label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="radio2"
                    @change="rbRoleAllChanged"
                    value="SystemConfig"
                    v-model="currentRole.Functions"
                  />
                  <label class="form-check-label">系統設定</label>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="mlAccount"
      :title="mlAccountTitle"
      ok-title="儲存"
      cancel-title="取消"
      @ok="mlAccountOK"
      v-if="currentAccount"
    >
      <div class="card-body">
        <div class="form-group">
          <label>帳號</label>
          <input
            type="text"
            class="form-control"
            placeholder="帳號"
            v-model="currentAccount.UserName"
          />
        </div>
        <div class="form-group" v-if="!currentAccount.AccountID">
          <label>密碼</label>
          <input
            type="password"
            class="form-control"
            placeholder="密碼"
            v-model="currentAccount.Password"
          />
        </div>
        <div class="form-group" v-if="currentAccount.AccountID > 0">
          <label>密碼</label>
          <input
            type="password"
            class="form-control"
            placeholder="(不修改密碼時請留空白)"
            v-model="currentAccount.Password"
          />
        </div>
        <div class="form-group">
          <label>姓名</label>
          <input
            type="text"
            class="form-control"
            placeholder="姓名"
            v-model="currentAccount.Name"
          />
        </div>
        <!-- <div class="form-group">
          <label>信箱</label>
          <input
            type="text"
            class="form-control"
            placeholder="信箱"
            v-model="currentAccount.Email"
          />
        </div> -->
        <div class="form-group">
          <label>所屬群組</label>
          <select class="form-control" v-model="currentAccount.RoleID" v-if="currentAccount.RoleID < 2">
            <option v-for="r in roles" :key="r.RoleID" :value="r.RoleID" >
              {{ r.RoleName }}
            </option>
          </select>
          <select class="form-control" v-model="currentAccount.RoleID" v-if="currentAccount.RoleID >= 2">
            <option disabled="disabled" v-for="r in roles" :key="r.RoleID" :value="r.RoleID" >
              {{ r.RoleName }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>狀態</label>
          <div class="row">
            <div class="col-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radio1"
                  :value="true"
                  v-model="currentAccount.IsActive"
                />
                <label class="form-check-label">啟用</label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radio1"
                  :value="false"
                  v-model="currentAccount.IsActive"
                />
                <label class="form-check-label">停用</label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>最後登入時間</label>
          <div class="form-control">
            {{ currentAccount.LastLoginTime | dateTimeFormat }}
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import $ from "jquery";
import "datatables.net";
import user from "../plugins/user";

export default {
  name: "Account",
  data() {
    return {
      currentRole: {
        RoleName: "",
        Enable: true,
        Functions: [],
      },
      currentAccount: {
        UserName: "",
        Name: "",
        Password: "",
        RoleID: "",
        Enable: true,
      },
      mlRoleTitle: "",
      mlAccountTitle: "",
      roles: [],
      accounts: [],
    };
  },
  mounted() {
    window.model = this;
    this.load();
  },
  methods: {
    async load() {
      this.roles = await this.$api.getRoles();
      var cols = [
        { title: "群組名稱", data: "RoleName" },
        {
          title: "狀態",
          data: "Enable",
          render: function (data) {
            if (data) {
              return '<span class="badge badge-success">啟用</span>';
            }
            return '<span class="badge badge-danger">停用</span>';
          },
        },
        {
          title: "功能",
          data: "RoleID",
          render: function (data) {
            return (
              '<button type="button" class="btn btn-primary" onclick="window.model.editRole(' +
              data +
              ')"><i class="fas fa-pen"></i></button>' +
              '<button type="button" class="btn btn-default" onclick="window.model.deleteRole(' +
              data +
              ')"><i class="far fa-trash-alt"></i></button>'
            );
          },
        },
      ];

      this.createDataTable("#tabRoles", cols, this.roles);

      var _this = this;
      this.accounts = await this.$api.getAccounts();
      cols = [
        { title: "帳號", data: "UserName" },
        { title: "姓名", data: "Name" },
        { title: "信箱", data: "Email" },
        {
          title: "所屬群組",
          data: "RoleID",
          render(data) {
            for (var k in _this.roles) {
              if (_this.roles[k].RoleID == data) {
                return _this.roles[k].RoleName;
              }
            }
            return data;
          },
        },
        {
          title: "啟用狀態",
          data: "IsActive",
          render: function (data, type, row, meta) {
            if (data == "1") {
              return '<span class="badge badge-success">啟用</span>';
            }
            return '<span class="badge badge-danger">停用</span>';
          },
        },
        { 
          title: "最後登入時間",
          data: "LastLoginTime",
          render: window.Filter.dateTimeFormat,
         },
        {
          title: "功能",
          data: "UserID",
          render: function (data, type, row, meta) {
            return (
              '<button type="button" class="btn btn-primary" onclick="window.model.editAccount(' +
              data +
              ')"><i class="fas fa-pen"></i></button>' + (
                user.user.roleId == 1 && user.user.roleId != row.RoleID ?
              '<button type="button" class="btn btn-default" onclick="window.model.deleteAccount(' +
              data +
              ')"><i class="far fa-trash-alt"></i></button>' : '')
            );
          },
        },
      ];
      this.createDataTable("#tabAccounts", cols, this.accounts);
    },
    showAdd() {
      var bv = $("#tabs .nav-link:first").hasClass("active");
      if (bv) {
        this.mlRoleTitle = "新增群組";
        this.currentRole = {
          RoleName: "",
          Enable: true,
          Functions: [],
        };
        this.currentRole.Enable = this.currentRole.Enable == "1" ? true : false;
        this.$bvModal.show("mlRole");
      } else {
        this.mlAccountTitle = "新增帳號";
        this.currentAccount = {
          UserName: "",
          Name: "",
          Password: "",
          RoleID: "",
          IsActive: true,
        };
        this.currentAccount.IsActive = this.currentAccount.IsActive == "1" ? true : false;
        this.$bvModal.show("mlAccount");
      }
    },
    editRole(id) {
      this.mlRoleTitle = "修改群組";
      $.each(this.roles, (i, r) => {
        if (r.RoleID == id) {
          this.currentRole = r;
        }
      });
      this.currentRole.Functions = this.currentRole.Function.split(",");
      this.currentRole.Enable = this.currentRole.Enable == "1" ? true : false;
      this.$bvModal.show("mlRole");
    },
    async deleteRole(id) {
      $.each(this.roles, (i, r) => {
        if (r.RoleID == id) {
          this.currentRole = r;
        }
      });
      if (this.currentRole) {
        confirm("請問要刪除群組：" + this.currentRole.RoleName, async (r) => {
          await this.$api.deleteRole(this.currentRole.RoleID);
          this.load();
        });
      }
    },
    async mlRoleOK(e) {
      e.preventDefault();
      if (!this.validate("#mlRole")) {
        return;
      }

      this.currentRole.Function = this.currentRole.Functions.join(",");
      this.currentRole.Enable = this.currentRole.Enable ? "1" : "0";
      try {
        if (this.currentRole.RoleID) {
          await this.$api.updateRole(this.currentRole.RoleID, this.currentRole);
        } else {
          await this.$api.createRole(this.currentRole);
        }
        this.$bvModal.hide("mlRole");
        this.load();
      } catch (ex) {
        console.log(ex);
      }
      return;
    },
    editAccount(id) {
      this.mlAccountTitle = "修改帳號";
      $.each(this.accounts, (i, r) => {
        if (r.UserID == id) {
          this.currentAccount = r;
        }
      });
      this.currentAccount.IsActive = this.currentAccount.IsActive == "1" ? true : false;
      this.$bvModal.show("mlAccount");
    },
    async deleteAccount(id) {
      $.each(this.accounts, (i, r) => {
        if (r.UserID == id) {
          this.currentAccount = r;
        }
      });
      if (this.currentAccount) {
        confirm("請問要刪除帳號：" + this.currentAccount.Name, async (r) => {
          await this.$api.deleteAccount(this.currentAccount.UserID);
          this.load();
        });
      }
    },
    async mlAccountOK(e) {
      e.preventDefault();
      if (!this.validate("#mlAccount")) {
        alert("所有欄位皆為必填");
        return;
      }
      try {
        this.currentAccount.IsActive = this.currentAccount.IsActive ? "1" : "0";
        if (this.currentAccount.UserID) {
          await this.$api.updateAccount(this.currentAccount.UserID, this.currentAccount);
        } else {
          await this.$api.createAccount(this.currentAccount);
        }
        this.$bvModal.hide("mlAccount");
        this.load();
      } catch (ex) {
        console.log(ex);
        var error = ex.data;
        if (error.Status == 4) {
          alert("此帳號已存在");
        } else if (error.Status == 16) {
          alert("不能與前三次密碼相同");
        } else if (error.Status == 17) {
          alert("密碼至少八位，並需要包含大小寫英文字母與數字");
        }
      }
      return;
    },
    rbRoleAllChanged(e) {
      var t = $(e.target);
      var p = t.parent().parent();
      $(".lv2 input", p).prop("checked", t.prop("checked"));
      $.each($(".lv2 input", p), (i, e) => {
        e.dispatchEvent(new Event("change"));
      });
    },
  },
};
</script>

<style scoped>
.check-container {
  height: 200px;
  width: 100%;
  overflow: auto;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-shadow: inset 0 0 0 transparent;
  padding: 0.375rem 0.75rem;
}
.check-container .lv2 {
  margin-left: 30px;
}
</style>