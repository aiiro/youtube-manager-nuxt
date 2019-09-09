<template>
  <nuxt-link
      :to="`/video/${videoId}`"
  >
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-220x120">
            <img :src="item.snippet.thumbnails.medium.url" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ item.snippet.title }}</strong>
              <br>
              <small>{{ item.snippet.publishedAt }}</small>
              <small>{{ item.snippet.channelTitle }}</small>
              <br>
              {{ item.snippet.description | omit }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object
      },
      videoId: {
        type: String
      }
    },
    filters: {
      omit: (value) => {
        if (!value) {
          return '';
        }

        if (value.length > 120) {
          return value.substr(0, 120) + '...';
        }

        return value;
      }
    }
  };
</script>

<style scoped>
  .is-220x120 {
    width: 220px;
    height: 120px;
  }
</style>
