<template>
  <div>
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item d-none d-sm-inline-block">
          <a class="nav-link" style="cursor: default" href="javascript:void(0)"
            >{{ user.name }} 您好</a
          >
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <a @click="logout()" class="nav-link" style="cursor: pointer">登出</a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="/" class="brand-link">
        <img src="./assets/logo.png" class="brand-image" style="opacity: 0.8" />
        <span class="brand-text font-weight-light" style="height: 30px"
          >管理後台</span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false">
            <li class="nav-item" v-auth="'Account'">
              <router-link to="/account" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>帳號及權限管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'Banner'">
              <router-link to="/banner" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>Banner管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'News'">
              <router-link to="/news" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>最新消息管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'CollageInfo'">
              <router-link to="/collageInfo" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>關於本院管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'CollageColleague'">
              <router-link to="/collageColleagues" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>師資陣容(院辦同仁)管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'CollageDepartment'">
              <router-link to="/collagedepartment" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>系所單位管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'CollageCourse'">
              <router-link to="/collageCourse" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>學院課程管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'ActivityHistory'">
              <router-link to="/activityHistories" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>活動集錦管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'Regulation'">
              <router-link to="/regulations" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>法規章程管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'RelatedResource'">
              <router-link to="/relatedResources" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>相關資源管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'CollageHeadElection'">
              <router-link to="/collageHeadElections" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>院長遴選管理</p>
              </router-link>
            </li>
            <li class="nav-item" v-auth="'SystemLog'">
              <router-link to="/systemLogs" class="nav-link">
                <i class="nav-icon fas fa-table"></i>
                <p>系統紀錄管理</p>
              </router-link>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <router-view />
    </div>
    <!-- /.content-wrapper -->
    <!-- <footer class="main-footer">
      <strong>
        Copyright &copy; 2014-2019
        <a href="http://adminlte.io">AdminLTE.io</a>.
      </strong>
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.0.4
      </div>
    </footer>-->

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
  </div>
</template>
<script>
import user from "./plugins/user";
import "./plugins/auth";

if (!user.user || !user.user.t) {
  window.location.href = "login.html";
}

export default {
  data() {
    return {
      user: user.user,
    };
  },
  methods: {
    logout() {
      confirm("請問是否要登出?", (r) => {
        user.logout();
        window.location.href = "login.html";
      });
    },
  },
};
</script>
