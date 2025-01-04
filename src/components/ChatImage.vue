<template>
  <a
    :key="img.url"
    v-if="img"
    class="image-wrapper"
    :class="{ 'type-is-video': img.type == 'video', 'more-img': count > 4 , 'hidden': hide}"
    :href="img.type == 'image' ? $root.$options.filters.ivCDN(img.url) : ''"
    :data-link="img.url | imageCDN"
    :data-video="img.Data.Video"
    :data-poster="img.Data.Poster"
  >
    <button
      class="btn-play-video"
      type="button"
      v-if="img.type == 'video'"
    ></button>
    <img :src="img.url | ivCDN" alt="" />
    <div class="num" v-if="count > 4">+{{ count - 4 }}</div>
  </a>
</template>
<script>
export default {
  props: ["media", "count", "hide"],
  data() {
    return {
      img: null,
    };
  },
  mounted() {
    var img = this.media;
    img.Data = {
      Video: null,
      Poster: "",
    };
    if (img.type == "video") {
      img.Data.Video = JSON.stringify({
        source: [
          {
            src: this.$root.$options.filters.imageCDN(img.url),
            type: "video/mp4",
          },
        ],
        attributes: {
          preload: false,
          playsinline: true,
          controls: true,
        },
      });
      img.Data.Poster = this.$root.$options.filters.ivCDN(img.url);
    }
    this.img = img;
  },
};
</script>