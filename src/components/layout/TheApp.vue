<template>
  <div class="app">
    <TheSideBar />
    <TheContainer />
    <BaseTitle />
  </div>
</template>

<script>
import TheContainer from "./TheContainer.vue";
import TheSideBar from "./TheSideBar.vue";
import BaseTitle from "../base/BaseTitle.vue";
export default {
  components: { TheSideBar, TheContainer, BaseTitle },
};
</script>

<style lang="scss">
@import "../../style/common/common.scss";
.app {
  display: flex;
  height: 100vh;
}
</style>
