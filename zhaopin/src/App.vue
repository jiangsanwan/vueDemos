<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>
<script>
	export default {
		watch: {
			$route(to, from) {
				if(to.path == '/' || to.path == '/login' || to.path == '/register') {
					localStorage.clear()
					sessionStorage.clear()
					this.$store.commit('SET_TYPE', '')
					this.$store.commit('SET_TOKEN', '')
				}
			}
		},
	}
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
[v-cloak] {
	display: none
}
</style>
