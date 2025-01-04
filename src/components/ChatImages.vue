<template>
  <div v-lightbox data-img="image-wrapper" :key="m.messageID">
    <template
      v-if="
        m.body.mediaCount > 0 && (!m.body.media || m.body.media.length == 0)
      "
    >
      <div class="blocked-content-view">
        <div class="blocked-content"><i class="icon-blocked"></i></div>
        <div class="control-area">
          <div class="display-media-num d-flex">
            <div class="img-num">{{ m.body.imageCount | comma }}</div>
            <div class="video-num">{{ m.body.videoCount | comma }}</div>
          </div>
          <div
            class="btn btn-sm btn-block btn-primary mg-bottom-16"
            @click="unlock(m)"
          >
            {{ m.body.price | comma }}點 解鎖內容
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="image-view row-1" v-if="m.body.mediaCount == 1">
        <ChatImage :media="m.body.media[0]" />
      </div>
      <div
        class="image-view row-2"
        v-if="m.body.mediaCount == 2 || m.body.mediaCount >= 4"
      >
        <ChatImage :media="m.body.media[0]" />
        <ChatImage :media="m.body.media[1]" />
      </div>
      <div class="image-view row-2" v-if="m.body.mediaCount >= 4">
        <ChatImage :media="m.body.media[2]" />
        <ChatImage :media="m.body.media[3]" :count="m.body.mediaCount" />
        <template v-if="m.body.mediaCount > 4">
        <ChatImage v-for="img in  $root.$options.filters.skip(m.body.media,4)" :key="img.url" :media="img" :hide="true"/>
        </template>
      </div>
      <div class="image-view row-3" v-if="m.body.mediaCount == 3">
        <div class="top d-flex">
          <ChatImage :media="m.body.media[0]" />
          <ChatImage :media="m.body.media[1]" />
        </div>
        <div class="bottom d-flex">
          <ChatImage :media="m.body.media[2]" />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import ChatImage from "../components/ChatImage";
export default {
  components: {
    ChatImage,
  },
  props: ["m"],
  methods: {
    unlock(msg) {
      showUnlockChatMessage(msg, (newMsg) => {
        this.m.body = JSON.parse(newMsg).body;
      });
    },
  },
};
</script>