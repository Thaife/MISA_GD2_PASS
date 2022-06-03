<template>
  <div
    :class="[
      'base-select',
      { active: isShow },
      { disable: isDisable },
      dropDown ? 'dropDown' : 'dropTop',
    ]"
    :style="{ minWidth: width, height: height }"
  >
    {{ itemDefault.text }}
    <div class="base-select__box" v-show="isShow">
      <div
        class="base-select__item"
        v-for="(item, index) in items"
        :key="index"
        :style="{ width: width, height: height }"
        @click="handleClickItem(item)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="icon" @click="handleClickDisplayIcon">
      <div :class="{ show: isShow }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-select",
  props: ["width", "height", "items", "itemDefault", "dropDown", "isDisable"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    //Created by TVThai(5/5/2022)
    handleClickDisplayIcon() {
      if (!this.isDisable) {
        this.isShow = !this.isShow;
      }
    },
    handleClickItem(item) {
      //ẩn option của select
      this.isShow = false;
      //Gọi hàm của component cha khi click 1 option select
      this.$emit("update:modelValue", item);
    },
  },
};
</script>

<style lang="scss">
@use "@/style/common/help.scss";
.base-select {
  background-color: white;
  position: relative;
  outline: none;
  border: 1px solid rgb(202, 202, 202);
  border-radius: 2px;
  height: 24px;
  width: 160px;
  line-height: 1;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 30px;
  font-size: 1.3rem;
  cursor: pointer;
  &.disable {
    background-color: #eceef1;
  }

  &.active {
    border: 1px solid help.$main-color;
  }
  &__box {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 0;
    box-shadow: 0 0 4px rgb(82, 82, 82);
    width: 100%;
  }
  &.dropDown {
    & .base-select__box {
      top: calc(100% + 4px);
    }
  }
  &.dropTop {
    & .base-select__box {
      bottom: calc(100% + 4px);
    }
  }
  &__item {
    height: 30px;
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 30px;
    &:hover {
      background-color: rgb(200, 248, 200);
    }
  }
  & .icon {
    cursor: pointer;
    position: absolute;
    width: 30px;
    height: 100%;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    & div {
      background: url("../../assets/Resource/img/Sprites.64af8f61.svg")
        no-repeat -564px -365px;
      width: 8px;
      height: 5px;
      transition: linear 0.2s;
      &.show {
        transform: rotate(180deg);
      }
    }
    &:hover {
      background-color: #e0e0e0;
    }
  }
}
</style>
