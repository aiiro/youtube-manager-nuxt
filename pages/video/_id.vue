<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="block video-player">
          <youtube
              :video-id="this.$route.params.id"
              ref="youtube"
          ></youtube>
        </div>

        <div class="box">
          <p>
            <span class="title is-4">{{ item.snippet.title }}</span>
          </p>

          <div class="level">
            <div class="level-left">
              {{ item.snippet.channelTitle }}
              <br/>
              {{ item.snippet.publishedAt }}
            </div>
            <div v-if="isLoggedIn" class="level-right">
              <a href="#" @click.prevent="toggleFavorite">
                <span class="icon is-large">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-heart fa-stack-1x"
                       :class="[item.isFavorite ? 'active' : 'has-text-grey-light']"
                    ></i>
                  </span>
                </span>
              </a>
            </div>
          </div>

          <hr>
          <p>{{ item.snippet.description }}</p>
        </div>
      </div>

      <div class="column is-4">
        <div class="box">
          <p>
            <span>関連動画</span>
          </p>
          <div v-for="relatedItem in relatedItems">
            <hr>
            <nuxt-link
                :to="`/video/${relatedItem.id.videoId}`"
            >
              <article class="media">
                <div class="media-left">
                  <figure class="image">
                    <img :src="relatedItem.snippet.thumbnails.default.url" alt="thumbnail">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>{{relatedItem.snippet.title}}</p>
                    <small>{{relatedItem.snippet.channelTitle}}</small>
                  </div>
                </div>
              </article>
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import ROUTES from '~/routes/api'

  export default {
    computed: {
      item() {
        return this.$store.getters.getVideo
      },
      relatedItems() {
        return this.$store.getters.getRelatedVideos
      },
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      }
    },

    methods: {
      async toggleFavorite() {
        await this.$store.dispatch('toggleFavorite', {
          uri: ROUTES.POST.TOGGLE_FAVORITE.replace(':id', this.$route.params.id)
        })
      }
    },

    async fetch({store, route}) {
      await store.dispatch('findVideo', {
        uri: ROUTES.GET.VIDEO.replace(':id', route.params.id),
      })
      await store.dispatch('fetchRelatedVideos', {
        uri: ROUTES.GET.RELATED.replace(':id', route.params.id),
      })
    }
  }
</script>

<style>
  iframe {
    width: 100%;
    height: 500px;
  }

  .video-player {
    max-width: 880px;
  }

  .fa-heart.active {
    color: #FF1493;
  }
</style>