<template>
  <div class="post-item" v-if="t"  @click="gothread">
    <div class="post-item-header">
      <a
        class="post-user"
        href="javascript:;"
      >
        <div class="pos-r">
          <div class="user-profile-img">
            <img :src="t.Author | headerImage" alt="" />
          </div>
        </div>
        <div class="user-data">
          <div class="user-name authed">{{ t.Author.DisplayName }}</div>
          <div class="user-id">@{{ t.Author.UserName }}</div>
        </div></a
      >
      <div class="posted-time flex-right" v-if="t.StartTime">
        {{ t.StartTime | timeBeforeFormat }}
        <button
          class="btn-report"
          type="button"
          v-if="EnableReportButton"
        ></button>
      </div>
      <div class="posted-time flex-right" v-else>
        {{ t.CreateTime | timeBeforeFormat }}
        <button
          class="btn-report"
          type="button"
          v-if="EnableReportButton"
        ></button>
      </div>
    </div>
    <div class="post-item-body">
      <div class="post-content">
        {{ t.Content.Message }}
      </div>
      <div class="block-content d-flex" v-if="t.IsLock" @click.stop="unlock(t)">
        <div class="center-content">
          <i class="icon-lock"></i>
          <div class="text">
            <span>使用</span
            ><span class="data-num">{{ t.Price | comma }}點</span
            ><span>解鎖</span>
          </div>
          <div class="file-num">
            <div class="img-num" v-if="t.Content.ImageCount > 0">
              {{ t.Content.ImageCount }}
            </div>
            <div class="video-num" v-if="t.Content.VideoCount > 0">
              {{ t.Content.VideoCount }}
            </div>
          </div>
        </div>
      </div>
      <template v-if="!t.IsLock && t.Content.Media && t.Content.Media.length">
        <div
          class="post-imgs-single light-box"
          v-if="t.Content.Media.length == 1"
        >
          <a
            class="img-wrap lightboxed"
            :class="{ 'type-is-video': t.Content.Media[0].Type == 'video' }"
            :href="t.Content.Media[0].Url | ivCDN"
            v-lazy:background-image="
              $root.$options.filters.ivCDN(t.Content.Media[0].Url)
            "
            :rel="'group-' + t.ThreadID"
            :data-link="t.Content.Media[0].Url | imageCDN"
          >
            <button
              class="btn-play-video"
              type="button"
              v-if="t.Content.Media[0].Type == 'video'"
            ></button>
          </a>
        </div>
        <div
          class="post-imgs-group-2 light-box"
          v-if="t.Content.Media.length == 2"
        >
          <a
            v-for="img in t.Content.Media"
            :key="img.Url"
            class="img-wrap lightboxed"
            :class="{ 'type-is-video': img.Type == 'video' }"
            :href="img.Url | ivCDN"
            v-lazy:background-image="$root.$options.filters.ivCDN(img.Url)"
            :rel="'group-' + t.ThreadID"
            :data-link="img.Url | imageCDN"
          >
            <button
              class="btn-play-video"
              type="button"
              v-if="img.Type == 'video'"
            ></button
          ></a>
        </div>
        <div
          class="post-imgs-group-3 light-box"
          v-if="t.Content.Media.length == 3"
        >
          <div class="post-imgs-single">
            <a
              class="img-wrap lightboxed"
              :class="{ 'type-is-video': t.Content.Media[0].Type == 'video' }"
              :href="t.Content.Media[0].Url | ivCDN"
              v-lazy:background-image="
                $root.$options.filters.ivCDN(t.Content.Media[0].Url)
              "
              :rel="'group-' + t.ThreadID"
              :data-link="t.Content.Media[0].Url | imageCDN"
              ><button
                class="btn-play-video"
                type="button"
                v-if="t.Content.Media[0].Type == 'video'"
              ></button
            ></a>
          </div>
          <div class="post-imgs-group-2">
            <a
              v-for="img in $root.$options.filters.skip(t.Content.Media, 1)"
              :key="img.Url"
              class="img-wrap lightboxed"
              :class="{ 'type-is-video': img.Type == 'video' }"
              :href="img.Url | ivCDN"
              v-lazy:background-image="$root.$options.filters.ivCDN(img.Url)"
              :rel="'group-' + t.ThreadID"
              :data-link="img.Url | imageCDN"
              ><button
                class="btn-play-video"
                type="button"
                v-if="img.Type == 'video'"
              ></button
            ></a>
          </div>
        </div>
        <div
          class="post-imgs-group-4 light-box"
          v-if="t.Content.Media.length == 4"
        >
          <div class="post-imgs-group-2">
            <a
              v-for="img in $root.$options.filters.take(t.Content.Media, 2)"
              :key="img.Url"
              class="img-wrap lightboxed"
              :class="{ 'type-is-video': img.Type == 'video' }"
              :href="img.Url | ivCDN"
              v-lazy:background-image="$root.$options.filters.ivCDN(img.Url)"
              :rel="'group-' + t.ThreadID"
              :data-link="img.Url | imageCDN"
              ><button
                class="btn-play-video"
                type="button"
                v-if="img.Type == 'video'"
              ></button
            ></a>
          </div>
          <div class="post-imgs-group-2">
            <a
              v-for="img in $root.$options.filters.skip(t.Content.Media, 2)"
              :key="img.Url"
              class="img-wrap lightboxed"
              :class="{ 'type-is-video': img.Type == 'video' }"
              :href="img.Url | ivCDN"
              v-lazy:background-image="$root.$options.filters.ivCDN(img.Url)"
              :rel="'group-' + t.ThreadID"
              :data-link="img.Url | imageCDN"
              ><button
                class="btn-play-video"
                type="button"
                v-if="img.Type == 'video'"
              ></button
            ></a>
          </div>
        </div>
        <div
          class="post-imgs-group-5 light-box"
          v-if="t.Content.Media.length >= 5"
        >
          <div class="post-imgs-group-2">
            <a
              v-for="img in $root.$options.filters.take(t.Content.Media, 2)"
              :key="img.Url"
              class="img-wrap lightboxed"
              :class="{ 'type-is-video': img.Type == 'video' }"
              :href="img.Url | ivCDN"
              v-lazy:background-image="$root.$options.filters.ivCDN(img.Url)"
              :rel="'group-' + t.ThreadID"
              :data-link="img.Url | imageCDN"
              ><button
                class="btn-play-video"
                type="button"
                v-if="img.Type == 'video'"
              ></button
            ></a>
          </div>
          <div class="post-imgs-group-5-3">
            <a
              v-for="img in $root.$options.filters.range(t.Content.Media, 2, 4)"
              :key="img.Url"
              class="img-wrap lightboxed"
              :class="{ 'type-is-video': img.Type == 'video' }"
              :href="img.Url | ivCDN"
              v-lazy:background-image="$root.$options.filters.ivCDN(img.Url)"
              :rel="'group-' + t.ThreadID"
              :data-link="img.Url | imageCDN"
              ><button
                class="btn-play-video"
                type="button"
                v-if="img.Type == 'video'"
              ></button
            ></a>
            <a
              v-if="t.Content.Media.length == 5"
              class="img-wrap lightboxed"
              :class="{ 'type-is-video': t.Content.Media[4].Type == 'video' }"
              :href="t.Content.Media[4].Url | ivCDN"
              v-lazy:background-image="
                $root.$options.filters.ivCDN(t.Content.Media[4].Url)
              "
              :rel="'group-' + t.ThreadID"
              :data-link="t.Content.Media[4].Url | imageCDN"
              ><button
                class="btn-play-video"
                type="button"
                v-if="t.Content.Media[4].Type == 'video'"
              ></button
            ></a>
            <a
              v-else
              class="img-wrap more-img lightboxed"
              :href="t.Content.Media[4].Url | ivCDN"
              v-lazy:background-image="
                $root.$options.filters.ivCDN(t.Content.Media[4].Url)
              "
              :rel="'group-' + t.ThreadID"
              :data-link="t.Content.Media[4].Url | imageCDN"
              ><span>+{{ t.Content.Media.length - 5 }}</span></a
            >
            <template v-if="t.Content.Media.length > 5">
              <a
                :href="img.Url | ivCDN"
                class="lightboxed"
                style="display: none"
                v-for="img in $root.$options.filters.skip(t.Content.Media, 5)"
                :key="img.Url"
                :rel="'group-' + t.ThreadID"
                :data-link="img.Url | imageCDN"
              ></a>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="post-item-footer">
      <!-- 按讚 & 收藏後，btn加上 class="active"-->
      <div class="btn-like">
        <i class="icon-like"> </i><span>{{ t.LikeCount }}</span>
      </div>
      <div class="btn-comment">
        <i class="icon-comment"> </i><span>{{ t.ReplyCount }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

export default {
  props: ["Thread", "EnableGOTO", "EnableLightbox", "NewWindow"],
  data() {
    return {
      MemberID: -1,
      t: null,
      EnableReportButton: false,
    };
  },
  mounted() {
    var content = this.Thread.Content;
    content.Media = [];
    if (content.Images && content.Images.length > 0) {
      content.Images.forEach((x) =>
        content.Media.push({
          Url: x,
          Type: "image",
        })
      );
    }
    if (content.Video && content.Video.length > 0) {
      content.Video.forEach((x) =>
        content.Media.push({
          Url: x,
          Type: "video",
        })
      );
    }
    content.MediaCount = content.Media.length;
    this.t = this.Thread;

    this.MemberID = this.$route.params.id;

    if (this.EnableLightbox) {
      if (content.MediaCount > 0) {
        this.$nextTick(() => {
          $("a.img-wrap")
            .get()
            .forEach((a) => {
              var imgwrap = $(a);
              var link = imgwrap.attr("href");
              if (imgwrap.hasClass("type-is-video")) {
                var video = {
                  source: [{ src: imgwrap.data("link"), type: "video/mp4" }],
                  attributes: {
                    preload: false,
                    playsinline: true,
                    controls: true,
                  },
                };
                imgwrap.attr("data-video", JSON.stringify(video));
                imgwrap.attr("data-poster", link);
                imgwrap.removeAttr("href");
              }
              var img = $(`<img class="hidden" src="${link}" alt="">`);
              imgwrap.append(img);
            });
          lightGallery($(".light-box").get()[0], {
            selector: ".img-wrap",
            plugins: [lgZoom, lgThumbnail, lgVideo],
            //- videojs: true,
            //- videojsOptions: {
            //-     muted: true,
            //- },
            thumbnail: true,
            licenseKey: "your_license_key",
          });
        });
      }
    } else {
      this.$nextTick(() => {
        $("a.img-wrap").attr("href", "javascript:;");
      });
    }
  },
  methods: {
    async like(t) {
      var count = await this.$api.likeThread(t.ThreadID);
      t.IsLike = !t.IsLike;
      t.LikeCount = count;
    },
    async favorite(t) {
      await this.$api.favoriteThread(t.ThreadID);
      t.IsFavorite = true;
      notify("已加入收藏");
    },
    giveTip(t) {
      showGiveThreadTip(t);
    },
    unlock(t) {
      showUnlock(t);
    },
    gothread(){
      if(this.EnableGOTO){
        if(this.NewWindow){
          window.open(window.location.href.replace(/member\/(\d+)/g, 'thread/view/' + this.Thread.ThreadID));
        }else{
          this.$router.push(`/thread/view/${this.Thread.ThreadID}`);
        }
      }
    }
  },
};
</script>