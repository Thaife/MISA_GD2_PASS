<template>
  <div class="base-input" :style="[{ width: width }, { height: height }]">
    <input
      ref="base_input"
      :class="[
        'input',
        { input_search: search },
        { warring: warring },
        { disable: isDisable },
      ]"
      :placeholder="placeholder"
      :type="type"
      :title="createTitleInput"
      :disabled="isDisable"
      @focus="handleFocusInput"
      @keydown="handleKeyDownInput"
      v-model="inputValue"
      :tabindex="tabindex"
      :style="{ textAlign: align ? align : 'left' }"
    />
    <div class="base-input-search" v-show="search">
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "base-input",
  props: [
    "type",
    "width",
    "height",
    "placeholder",
    "search",
    "field",
    "modelValue",
    "autofocus",
    "warring",
    "align",
    "focus",
    "tabindex",
    "isDisable",
  ],
  data() {
    return { inputValue: "", isWarring: false };
  },
  emits: ["handleEnter", "handleTab", "update:modelValue"],
  computed: {
    ...mapGetters(["errMessage", "validates", "isShowPopupDetails", "newCode"]),
    createTitleInput() {
      //Created by TVThai(5/5/2022)
      //NếU object validates có field trùng với input => bind title vào input
      if (this.validates[this.field]) {
        return this.errMessage;
      }
      return "";
    },
  },
  filters: {},
  watch: {
    warring(value) {
      this.isWarring = value;
    },
    //auto binding khi typing input
    inputValue(value) {
      this.$emit("update:modelValue", value);
    },
    modelValue(value) {
      this.inputValue = value;
    },
    focus(value) {
      if (value) {
        this.$nextTick(() => this.$refs.base_input.focus());
      }
    },

    //bind employeeCode mới vào input EmployeeCode và focus
    newCode(value) {
      if (value && this.autofocus) {
        this.$emit("input", value);
        this.$refs.base_input.focus();
      }
    },
  },
  mounted() {
    if (this.modelValue) {
      this.inputValue = this.modelValue;
    }
  },
  methods: {
    ...mapMutations(["SET_VALIDATES"]),
    //khi focus vào input
    handleFocusInput() {
      //bỏ trạng thái error ở input
      const fie = this.field;
      let newObj = {};
      newObj[fie] = false;
      this.SET_VALIDATES({ ...this.validates, ...newObj });
    },
    handleKeyDownInput(e) {
      //[Update by TVThai (25/4/2022)]
      //emit call handleSearch khi ấn Enter
      if (e.keyCode == 13) {
        this.$emit("handleEnter", this.inputValue);
      } else if (e.keyCode == 9) {
        this.$emit("handleTab");
      }
    },
  },
};
</script>

<style scoped>
.base-input {
  position: relative;
  font-size: 1.3rem;
  box-sizing: border-box;
}
.base-input > input::placeholder {
  font-style: italic;
}
input {
  border: 1px solid rgb(180, 180, 180);
  border-radius: 2px;
  height: 100%;
  outline: none;
  padding: 0 8px;
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  word-wrap: break-word;
}
input.disable {
  background-color: #edeef0;
}
input.warring {
  border: 1px solid red;
}
input.input_search {
  padding-right: 40px;
}
input::placeholder {
  font-size: 1.2rem;
  color: #a7a7a7;
}
input:focus {
  border: 1px solid green;
}
.base-input-search {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-input-search > div {
  background: url("../../assets/Resource/img/Sprites.64af8f61.svg") no-repeat -992px -360px;
  width: 16px;
  height: 16px;
}
</style>
