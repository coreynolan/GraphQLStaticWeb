<template>
  <div id="app">
    <Quotes />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Quotes from "./components/Quotes.vue";

export default Vue.extend({
  name: "App",
  components: {
    Quotes,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 650px;
}
</style>
