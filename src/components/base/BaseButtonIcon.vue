<template>
  <div
    :class="['base-button_icon', { 'base-button-main': mainType }]"
    :style="{ height: height, borderRadius: radius }"
    :tabindex="tabIndex"
    @keydown="handleKeyDownBtn"
  >
    <div
      class="base-button_icon-btn"
      :style="{ borderTopLeftRadius: radius, borderBottomLeftRadius: radius }"
    >
      {{ text }}
    </div>
    <div
      class="base-button_icon-icon-wrap"
      :style="{ borderTopRightRadius: radius, borderBottomRightRadius: radius }"
    >
      <div class="base-button_icon-icon"></div>
    </div>
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
.base-button_icon {
  display: inline-flex;

  border-radius: 3px;
  font-size: 1.3rem;
  padding-right: 46px;
  cursor: pointer;
  border: 1px solid #8d9096;
  font-family: notosansSemiBold;
  white-space: nowrap;
  outline: none;
  position: relative;
  min-width: 100px;
  &.base-button-main {
    color: white;
    border: none;
    background-color: help.$main-color;
  }

  & .base-button_icon-btn {
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    &:hover {
      background-color: #35bf22;
    }
    &:focus {
      background-color: #35bf22;
    }
  }

  & .base-button_icon-icon-wrap {
    height: 100%;
    top: 0;
    right: 0;
    position: absolute;
    width: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      border-left: 1px solid white;
    }
    &:hover {
      background-color: #35bf22;
    }
  }

  & .base-button_icon-icon {
    background: url("../../assets/Resource/img/Sprites.64af8f61.svg") no-repeat -852px -365px;
    width: 8px;
    height: 5px;
  }
}
</style>
