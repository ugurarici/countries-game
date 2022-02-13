<template>
  <div id="app" class="h-screen flex flex-col justify-between">
    <div id="nav" class="p-6">
      <router-link to="/">Home</router-link> |
      <template v-if="$store.state.countries.length > 0">
        <router-link to="/play">Play</router-link> |
      </template>
      <router-link to="/session">Session</router-link> |
      <a href="#" @click.prevent="$store.dispatch('resetState')">Reset</a>
    </div>
    <router-view class="overflow-scroll" />
    <div id="footer" class="p-2">
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    if (this.$store.state.countries.length == 0) {
      this.$store.dispatch("fetchCountriesFromAPI");
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #180239;
}

a {
  font-weight: bold;
  color: #180239;
}

a.router-link-exact-active {
  color: #7c3aed;
}
</style>
