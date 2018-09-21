<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">
    @import "./assets/css/reset.scss";
    @import "./assets/css/common.scss";
</style>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* min-width: 1130px; */
    min-height: 100%;
    background-color:#F4F4F4;
  }
</style>
