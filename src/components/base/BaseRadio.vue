<template>
  <div class="base-radio">
    <div
      class="base-radio-item"
      v-for="(radio, index) in data"
      :key="index"
      :class="{ active: radio.value == modelValue }"
      @click="handleClickItemRadio(radio.value)"
    >
      <div class="base-radio-icon">
        <div class="base-radio-icon-point" :tabindex="tabindex + index"></div>
      </div>
      <div class="base-radio-label">{{ radio.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-radio",
  props: ["data", "modelValue", "isDisable", "tabindex"],
  emits: ["handleClickRadio", "update:modelValue"],
  methods: {
    //Emit value khi click vào radio
    handleClickItemRadio(value) {
      if (!this.isDisable) {
        this.$emit("update:modelValue", value);
        this.$emit("handleClickRadio", value);
      }
    },
  },
};
</script>

<style lang="scss">
@use "@/style/common/help.scss";
.base-radio {
  font-size: 1.3rem;
  display: flex;
  &-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    & + .base-radio-item {
      margin-left: 20px;
    }
  }
  &-icon {
    width: 18px;
    height: 18px;
    border: 1px solid #afafaf;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &-point {
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background: none;
    }
  }
  &-label {
    margin-left: 10px;
  }

  &-item.active {
    & .base-radio-icon {
      border-color: help.$main-color;
      &-point {
        background-color: help.$main-color;
      }
    }
  }
}
</style>
