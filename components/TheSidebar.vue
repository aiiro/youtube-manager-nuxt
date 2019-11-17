<template>
  <div class="column is-2">
    <div class="section">
      <aside class="menu">
        <ul class="menu-list">
          <li>
            <nuxt-link
                to="/"
            >
              ホーム
            </nuxt-link>
          </li>
          <li v-if="isLoggedIn">
            <nuxt-link
                to="/favorite"
            >
              お気に入り
            </nuxt-link>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      isLoggedIn() {
        return !!this.$store.getters.isLoggedIn
      }
    }
  }
</script>

