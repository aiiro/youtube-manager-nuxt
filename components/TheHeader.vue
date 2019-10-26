<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <nuxt-link
          class="navbar-item subtitle is-4"
          to="/"
      >
        Youtube Player
      </nuxt-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="field has-addons">
            <form action="/search" method="get">
              <div class="field has-addons">
                <div class="control">
                  <input name="q" class="input" type="text" placeholder="検索">
                </div>
                <div class="control">
                  <button class="button">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div
              class="buttons"
              v-if="isLoggedIn"
          >
            <a
                href="#"
                class="button is-light"
                @click.prevent="logout"
            >
              Log out
            </a>
          </div>
          <div
              class="buttons"
              v-else
          >
            <nuxt-link
                class="button is-primary"
                to="/signup"
            >
              <strong>Sign up</strong>
            </nuxt-link>
            <nuxt-link
                class="button is-light"
                to="/login"
            >
              Log in
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
      isLoggedIn() {
        return !!this.$store.getters.isLoggedIn
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
