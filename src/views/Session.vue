<template>
  <div>
    <div v-for="(item, key) in session" :key="key">
      <img
        :src="item.country.flags.svg"
        alt="session.country.name.common"
        height="50"
      />
      <br />
      <span
        v-if="item.country.name.common == item.selectedOption"
        style="color: green; font-weight: bold"
        >CORRECT!</span
      >
      <span v-else style="color: red; font-weight: bold">WRONG</span>
      {{ item.country.name.common }} - You selected:
      {{ item.selectedOption }}
      <hr />
    </div>
  </div>
</template>

<script>
var _ = require("lodash");

export default {
  computed: {
    session() {
      return _.reverse(this.$store.state.session);
    },
  },
  beforeMount() {
    console.log(this.session);
  },
};
</script>