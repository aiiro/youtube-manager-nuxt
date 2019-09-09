import {createRequestClient} from '~/store/request-client';
import firebase from "~/plugins/firebase";

export const state = () => ({
  items: [],
  relatedItems: [],
  searchItems: [],
  favoriteItems: [],
  item: {},
  meta: {},
  searchMeta: {},
  token: '',
})

export const actions = {
  async fetchPopularVideos({commit}, payload) {
    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.get(payload.uri, payload.params)
    commit('mutatePopularVideos', res)
  },
  async findVideo({commit}, payload) {
    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.get(payload.uri)
    const params = {
      ...res.video_list,
    }
    params.isFavorite = res.is_favorite || false
    commit('mutateVideo', params)
  },
  async fetchRelatedVideos({commit}, payload) {
    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.get(payload.uri)
    commit('mutateRelatedVideos', res)
  },
  async searchVideos({commit}, payload) {
    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.get(payload.uri, payload.params)
    commit('mutateSearchVideos', res)
  },
  async signUp({commit, dispatch}, payload) {
    await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    const res = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    const token = await res.user.getIdToken()
    this.$cookies.set('jwt_token', payload)
    const refreshToken = res.user.refreshToken
    this.$cookies.set('refresh_token', refreshToken)
    commit('mutateToken', token)
    this.app.router.push('/')
  },
  async setToken({commit}, payload) {
    this.$cookies.set('jwt_token', payload)
    commit('mutateToken', payload)
  },
  async login({commit, dispatch}, payload) {
    const res = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    const token = await res.user.getIdToken()
    this.$cookies.set('jwt_token', token)
    const refreshToken = res.user.refreshToken
    this.$cookies.set('refresh_token', refreshToken)
    commit('mutateToken', token)
    this.app.router.push('/')
  },
  async logout({commit}) {
    await firebase.auth().signOut()
    commit('mutateToken', null)
    this.$cookies.remove('jwt_token')
    this.app.router.push('/')
  },
  async toggleFavorite({commit}, payload) {
    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.post(payload.uri)
    commit('mutateToggleFavorite', res.is_favorite)
  },
  async fetchFavoriteVideos({commit}, payload) {
    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.get(payload.uri)
    commit('mutateFavoriteVideos', res)
  }
}

export const mutations = {
  mutatePopularVideos(state, payload) {
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  },
  mutateVideo(state, payload) {
    const params = (payload.items && payload.items.length > 0) ? payload.items[0] : {}
    params.isFavorite = payload.isFavorite || false
    state.item = params
  },
  mutateRelatedVideos(state, payload) {
    state.relatedItems = payload.items || []
  },
  mutateSearchVideos(state, payload) {
    state.searchItems = payload.items ? state.searchItems.concat(payload.items) : []
    state.searchMeta = payload
  },
  mutateFavoriteVideos(state, payload) {
    state.favoriteItems = payload.items || []
  },

  mutateToken(state, payload) {
    state.token = payload
  },
  mutateToggleFavorite(state, payload) {
    state.item.isFavorite = payload
  },
}

export const getters = {
  getPopularVideos(state) {
    return state.items
  },
  getMeta(state) {
    return state.meta
  },
  getVideo(state) {
    return state.item
  },
  getRelatedVideos(state) {
    return state.relatedItems
  },
  getSearchVideos(state) {
    return state.searchItems
  },
  getFavoriteVideos(state) {
    return state.favoriteItems
  },
  getSearchMeta(state) {
    return state.searchMeta
  },
  isLoggedIn(state) {
    return !!state.token
  },
}
