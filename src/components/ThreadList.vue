<template>
  <div
    class="post-list"
  >
    <div style="background-color: #f9f6f600;text-align: center;" v-if="!AllLoaded" @click="load">載入更多</div>
    <Threads v-for="t in Threads" :key="t.ThreadID" :Thread="t" :EnableGOTO="true" :NewWindow="true" />
  </div>
</template>
<script>
import Threads from "./Threads";

var tmap = {};
var memberMap = {};
export default {
  components: {
    Threads,
  },
  props: {
    Loader: { type: Function },
  },
  data() {
    return {
      Threads: [],
      AllLoaded: false
    };
  },
  async mounted() {
    this.reload();
    window.updateThread = (thread) => {
      for (var i in this.Threads) {
        if (this.Threads[i].ThreadID == thread.ThreadID) {
          $.extend(this.Threads[i], thread);
          break;
        }
      }
    };
  },
  methods: {
    async load() {
      var start = new Date().getTime();
      this.Threads.forEach((t) => {
        if (t.PostTime < start) {
          start = t.PostTime;
        }
      });
      var response = await this.Loader(start);
      var threads = response.Threads;
      if (threads.length > 0) {
        response.Members.forEach((m) => (memberMap[m.MemberID] = m));
        var fmap = {};
        var lmap = {};
        threads.forEach((t) => {
          t.IsFavorite = fmap[t.ThreadID];
          t.IsLike = lmap[t.ThreadID];
          t.Author = memberMap[t.MemberID];
          if (!tmap[t.ThreadID]) {
            tmap[t.ThreadID] = t;
            this.Threads.push(t);
          }
        });
      }else{
        this.AllLoaded = true;
      }
    },
    reload() {
      tmap = {};
      memberMap = {};
      this.Threads = [];
      this.load();
    },
  },
};
</script>
