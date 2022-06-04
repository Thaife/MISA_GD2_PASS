<template>
  <div
    v-show="isShowBaseTitle"
    :style="{
      left: `${baseTitleLeft}px`,
      top: `${baseTitleTop}px`,
      backgroundColor: baseTitleBackgr,
    }"
    class="base-title"
  >
    {{ baseTitleText }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "base-titles",
  computed: {
    ...mapGetters([
      "isShowBaseTitle",
      "baseTitleText",
      "baseTitleLeft",
      "baseTitleTop",
      "baseTitleBackgr",
    ]),
  },
};
</script>

<style scopped>
.base-title {
  position: fixed;
  border-radius: 2px;
  color: white;
  font-size: 1.2rem;
  line-height: 100%;
  padding: 6px;
}
</style>
