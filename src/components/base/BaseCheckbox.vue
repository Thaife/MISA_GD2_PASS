<template>
  <div class="base-checkbox-wrap" @click="handleClickCheckBox">
    <div
      :class="['base-checkbox', { active: modelValue }]"
      :style="{ width: width, height: height }"
      @keydown="handleKeyDown"
    >
      <div class="base-checkbox-point" :tabindex="tabindex"></div>
      <div ref="flash_around" class="base-checkbox-flash-around"></div>
    </div>
    <div v-if="label" class="base-checkbox-label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "base-checkbox",
  props: ["width", "height", "modelValue", "tabindex", "label", "isDisable"],
  data() {
    return {};
  },
  computed: {},
  watch: {
    modelValue(value) {
      if (value) {
        this.$refs.flash_around.style.display = "block";
        setTimeout(() => {
          this.$refs.flash_around.style.display = "none";
        }, 100);
      }
    },
  },
  methods: {
    //Created by TVThai(5/5/2022)
    //Gọi sự kiện của component cha khi value checkbox thay đổi
    handleClickCheckBox() {
      if (!this.isDisable) {
        if (this.modelValue) {
          this.$emit("update:modelValue", 0);
        } else {
          this.$emit("update:modelValue", 1);
        }
      }
    },
    //[Update by TVThai(28/4/2022)]
    //Gọi sự kiện của component cha khi ấn enter
    handleKeyDown(e) {
      if (!this.isDisable) {
        if (e.keyCode == 13) {
          this.handleClickCheckBox;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@use "../../style/common/help.scss";
@keyframes baseCheckboxFlashAround {
  from {
    border: 1px solid help.$main-color;
  }
  to {
    border: 1px solid #ccc;
  }
}

.base-checkbox-wrap {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.base-checkbox {
  position: relative;
  border-radius: 2px;
  border: 1px solid #ccc;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:focus {
    outline: none;
    border: 1px solid green;
  }
  transform: rotate(-90deg);
  transition: linear 0.1s;
  &-flash-around {
    display: none;
    position: absolute;
    left: -4px;
    right: -4px;
    top: -4px;
    bottom: -4px;
    border: 1px solid help.$main-color;
    animation: baseCheckboxFlashAround linear 0.1s;
  }
}

.base-checkbox.active {
  border: 1px solid help.$main-color;
  transform: rotate(0);
}

.base-checkbox.active .base-checkbox-point {
  background: url("../../assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1225px -363px;
  width: 14px;
  height: 11px;
}

.base-checkbox-label {
  font-size: 1.3rem;
  margin-left: 10px;
}
</style>
