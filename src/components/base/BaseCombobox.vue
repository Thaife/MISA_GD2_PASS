<template>
  <div
    ref="base_cbb"
    :class="['base-cbb', { disable: isDisable }]"
    :style="{ width: width, minHeight: height }"
  >
    <div class="input__wrap" ref="input">
      <input
        :style="[{ height: height, fontSize: fontSizeDisplay }]"
        ref="input_search"
        class="cbb__input"
        @keydown="handleKeyDownInput"
        v-model="textSearch"
        @input="handleOnInput"
        :tabindex="tabindex"
        :placeholder="placeholder"
        :disabled="isDisable ? true : false"
      />
      <div class="cbb__icon-wrap" @click="handleClickDisplayIcon">
        <div class="cbb__icon-hide" v-show="!isShowList"></div>
        <div class="cbb__icon-show" v-show="isShowList"></div>
      </div>
    </div>
  </div>
  <!-- list option of cbb -->
  <div
    class="cbb__list"
    v-show="isShowList"
    ref="listCbb"
    :style="{
      top: `${dropDownY}px`,
      left: `${dropDownX}px`,
      minWidth: `${inputWidth}px`,
    }"
  >
    <div
      :style="{ height: height }"
      :class="[
        'cbb__list__item',
        `cbbItem-${index}`,
        item[fieldValue] == modelValue ? 'active' : '',
      ]"
      v-for="(item, index) in dataChanged"
      :key="index"
      @click="handleClickOption(item)"
    >
      {{ item[fieldDisplay] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "base-combobox",
  props: [
    "width",
    "height",
    "data",
    "fieldValue",
    "fieldDisplay",
    "tabindex",
    "modelValue",
    "notAllowCreate",
    "tickCbb",
    "placeholder",
    "fontSizeDisplay",
    "isDisable",
    "focus",
  ],

  data() {
    return {
      isShowList: false,
      textSearch: "",
      dropDownX: null,
      dropDownY: null,
      inputWidth: 0,
      dataChanged: [],
    };
  },
  computed: {},
  watch: {
    //focus vào input nếu prop focus = true
    focus(value) {
      if (value) {
        this.$nextTick(() => this.$refs.input_search.focus());
      }
    },
    //gán sự kiện click outside khi list được show
    isShowList(value) {
      if (value) {
        document.addEventListener("click", this.focusOutSide);
      } else {
        document.removeEventListener("click", this.focusOutSide);
      }
    },
    modelValue(value) {
      if (!value) {
        //set text input về null khi k có value cbb
        this.textSearch = "";
      } else {
        //nếu cbb có value => bind text vào input
        const fieldSl = this.data.find((itemItem) => {
          return itemItem[this.fieldValue] == value;
        });
        if (fieldSl) {
          this.textSearch = fieldSl[this.fieldDisplay];
        } else {
          this.textSearch = "";
        }
      }
    },
  },

  mounted() {
    //bind text vào input khi được mount
    if (this.modelValue) {
      const res = this.data.find((item) => {
        return item[this.fieldValue] == this.modelValue;
      });
      if (res) {
        this.textSearch = res[this.fieldDisplay];
      }
    }
  },

  methods: {
    //Xét vị trí của list option
    setPositionListOption() {
      const coordinates = this.$refs.input_search.getBoundingClientRect();
      const inputHeight = this.$refs.input_search.offsetHeight;
      this.inputWidth = this.$refs.input_search.offsetWidth;
      this.dropDownX = coordinates.x;
      if (coordinates.y > 400) {
        this.dropDownY = coordinates.y - 161 + coordinates.height;
      } else {
        this.dropDownY = coordinates.y + inputHeight;
      }
    },
    //lấy data fake theo data gốc để xử lý search
    handleClickDisplayIcon() {
      if (!this.isDisable) {
        this.setPositionListOption();
        if (!this.isShowList) {
          this.dataChanged = this.data;
        }
        this.isShowList = !this.isShowList;
      }
    },
    //hàm xử lý click outside
    focusOutSide(e) {
      if (
        !e.target.classList.contains("cbb__icon-wrap") &&
        !e.target.classList.contains("cbb__icon-hide") &&
        !e.target.classList.contains("cbb__icon-show")
      ) {
        this.isShowList = false;
      }
    },
    //emit model value khi click vào option
    handleClickOption(item) {
      this.$emit("update:modelValue", item[this.fieldValue]);
      this.isShowList = false;
    },
    //hàm xử lý khi input thay đổi
    handleOnInput() {
      this.isShowList = true;
      if (!this.textSearch) {
        //nếu input == nul => reset modelValue và data fake
        this.$emit("update:modelValue", null);
        this.dataChanged = this.data;
      } else {
        //hiển thị option theo value input
        this.dataChanged = this.data.filter((item) => {
          return item[this.fieldDisplay]
            .toUpperCase()
            .includes(this.textSearch.toUpperCase());
        });
      }
    },
    //Xử lý show, chọn các option bằng bàn phím
    handleKeyDownInput(e) {
      const allElementShowing =
        this.$refs.listCbb.querySelectorAll(".cbb__list__item");

      switch (e.keyCode) {
        //type down
        case 40:
          //Khi đang show list item
          if (this.isShowList) {
            if (allElementShowing.length > 0) {
              const currElement = this.$refs.listCbb.querySelector(
                ".cbb__list__item.active"
              );
              //Nếu không có item nào đang được chọn => focus item đầu tiên
              if (!currElement) {
                this.$refs.listCbb
                  .querySelector(".cbb__list__item.cbbItem-0")
                  .classList.add("active");
              } else if (
                //Nếu đang focus vào item cuối => focus item đầu
                currElement.classList.contains(
                  `cbbItem-${allElementShowing.length - 1}`
                )
              ) {
                currElement.classList.remove("active");
                this.$refs.listCbb
                  .querySelector(".cbb__list__item.cbbItem-0")
                  .classList.add("active");
              } else {
                //else => focus vào item tiếp theo
                currElement.classList.remove("active");
                currElement.nextElementSibling.classList.add("active");
              }
            }
          }
          break;
        //type up
        case 38:
          //Khi đang show list item
          if (this.isShowList) {
            if (allElementShowing.length > 0) {
              const currElement = this.$refs.listCbb.querySelector(
                ".cbb__list__item.active"
              );
              //Nếu không có item nào đang được chọn => focus item cuối cùng
              if (!currElement) {
                this.$refs.listCbb
                  .querySelector(
                    `.cbb__list__item.cbbItem-${allElementShowing.length - 1}`
                  )
                  .classList.add("active");
              } else if (currElement.classList.contains(`cbbItem-0`)) {
                //Nếu đang focus vào item đầu => focus item cuối
                currElement.classList.remove("active");
                this.$refs.listCbb
                  .querySelector(
                    `.cbb__list__item.cbbItem-${allElementShowing.length - 1}`
                  )
                  .classList.add("active");
              } else {
                //else => focus vào item trước đó
                currElement.classList.remove("active");
                currElement.previousElementSibling.classList.add("active");
              }
            }
          }
          break;
        //type enter
        case 13:
          if (!this.isShowList) {
            //nếu đang ẩn => set vị trí list, show list, set lại data fake
            this.setPositionListOption();
            this.isShowList = true;
            this.dataChanged = this.data;
          } else {
            //nếu đang show => emit modelValue
            const currElement = this.$refs.listCbb.querySelector(
              ".cbb__list__item.active"
            );
            if (currElement) {
              currElement.click();
            }

            this.isShowList = false;
          }

          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/base/BaseCombobox.scss";
</style>
