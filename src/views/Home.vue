<template>
  <div class="home">
    <div v-if="countriesCount > 0">
      <router-link to="play">PLAY NOW</router-link>
    </div>
    <div v-else>Loading...</div>
    <div>
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    countriesCount() {
      return this.$store.state.countries.length;
    },
  },
};
</script>
