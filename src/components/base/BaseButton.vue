<template>
  <div
    :class="['base-button', { 'base-button-main': mainType }]"
    :style="{ height: height, borderRadius: radius }"
    :tabindex="tabIndex"
    @keydown="handleKeyDownBtn"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "base-button",
  props: ["text", "height", "mainType", "tabIndex", "tabEnd", "radius"],
  watch: {
    tabEnd(value) {
      if (value) {
        setTimeout(() => {
          this.$refs.btn.focus();
        }, 0);
      }
    },
  },
  methods: {
    //Gọi sự kiện của component cha khi ấn enter
    //Created by TVThai(5/5/2022)
    handleKeyDownBtn(e) {
      console.log(e.keyCode);
      if (e.keyCode == 13) {
        console.log(e.keyCode);
        this.$emit("handleKeyDown");
      } else if (e.keyCode == 9) {
        this.$emit("handlePrevFocus");
      }
    },
  },
};
</script>

<style lang="scss">
@use "../../style/common/help.scss";
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-size: 1.3rem;
  padding: 2px 16px;
  cursor: pointer;
  border: 1px solid #8d9096;
  font-family: notosansSemiBold;
  white-space: nowrap;
  outline: none;
  &.base-button-main {
    color: white;
    border: none;
    background-color: help.$main-color;
    &:focus {
      background-color: #35bf22;
    }
    &:hover {
      background-color: #35bf22;
    }
  }
  &:focus {
    background-color: #d2d3d6;
  }
  &:hover {
    background-color: #d2d3d6;
  }
}
</style>
