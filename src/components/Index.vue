<template>
  <div>
      <router-view name='header'></router-view>
      <router-view name='main' class="main"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toycarHeader: true,
      carinfoHeader: false,
      designskillHeader: false
    };
  }
};
</script>

<style scoped>
.main {
  padding-top: 80px;
}
</style>


