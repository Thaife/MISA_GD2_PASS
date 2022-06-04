<template>
  <div
    ref="base_cbb"
    :class="['base-cbb-tb', { disable: isDisable }]"
    :style="{ width: width, minHeight: minHeight }"
  >
    <div class="input__wrap" ref="input">
      <input
        :style="[
          { height: minHeight },
          notAllowCreate ? { paddingRight: '32px' } : {},
        ]"
        :title="textSearch"
        ref="input_search"
        class="cbb__input"
        :disabled="isDisable ? true : false"
        @keydown="handleKeyDownInput"
        v-model="textSearch"
        @input="handleOnInput"
        :tabindex="tabindex"
      />
      <div class="cbb__icon__add-wrap" v-show="!notAllowCreate">
        <div class="cbb__icon__add"></div>
      </div>
      <div class="cbb__icon-wrap" @click="handleClickDisplayIcon">
        <div class="cbb__icon-hide" v-show="!isShowList"></div>
        <div class="cbb__icon-show" v-show="isShowList"></div>
      </div>
    </div>
  </div>
  <!-- list option of cbb -->
  <div
    class="cbb__tb__list"
    ref="cbb"
    v-show="isShowList"
    :style="{
      top: `${dropDownY}px`,
      left: `${dropDownX}px`,
      minWidth: `${inputWidth}px`,
    }"
    @scroll="handleScrollListOptions"
  >
    <table :style="{ width: '100%' }">
      <thead class="cbb__list__item-header" ref="header">
        <tr>
          <th
            class="cbb__item__col"
            v-for="(item, index) in infor"
            :key="index"
            :style="{ width: item.width }"
          >
            <div :style="{ width: item.width }">{{ item.display }}</div>
          </th>
        </tr>
      </thead>
      <tbody ref="listCbb">
        <tr
          v-for="(dataItem, dataIndex) in dataChanged"
          :key="dataIndex"
          @click="handleClickOption(dataItem)"
          :class="[
            dataItem[fieldValue] == modelValue ? 'active' : '',
            `cbbItem-${dataIndex}`,
          ]"
        >
          <td
            class="cbb__item__col"
            v-for="(item, index) in infor"
            :key="index"
          >
            <div :style="{ width: item.width }" :title="dataItem[item.name]">
              {{ dataItem[item.name] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "base-combobox-table",
  props: [
    "width",
    "minHeight",
    "data",
    "infor",
    "fieldValue",
    "fieldDisplay",
    "tabindex",
    "modelValue",
    "notAllowCreate",
    "isDisable",
    "focus",
    "size",
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
  emits: ["handleScroll", "update:modelValue", "handleTab"],

  computed: {},
  watch: {
    isShowList(value) {
      if (value) {
        document.addEventListener("click", this.focusOutSide);
      } else {
        document.removeEventListener("click", this.focusOutSide);
      }
    },
    //set data sẽ dùng để hiển thị
    data(value) {
      this.dataChanged = [...value];
    },
    //khi modelValue thay đổi => bind text vào input
    modelValue(value) {
      if (!value) {
        this.textSearch = "";
      } else {
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
    //focus vào input nếu prop focus = true
    focus(value) {
      if (value) {
        this.$nextTick(() => this.$refs.input_search.focus());
      }
    },
  },

  mounted() {
    if (this.modelValue) {
      //set text vào input khi modelValue thay đổi
      const res = this.data.find((item) => {
        return item[this.fieldValue] == this.modelValue;
      });
      if (res) {
        this.textSearch = res[this.fieldDisplay];
      }
    }
  },

  methods: {
    ...mapMutations([]),
    //emit hàm scroll khi scroll đến cuối
    handleScrollListOptions(e) {
      console.log(this.size);
      if (e.target.scrollHeight - e.target.scrollTop <= 200) {
        this.$emit("handleScroll", Number(this.size) + 100);
      }
    },
    //Khi click vào icon show
    handleClickDisplayIcon() {
      //nếu đang không ở chế độ xem
      if (!this.isDisable) {
        //Set vị trí của list
        const coordinates = this.$refs.input_search.getBoundingClientRect();
        const inputHeight = this.$refs.input_search.offsetHeight;
        this.inputWidth = this.$refs.input_search.offsetWidth;
        this.dropDownX = coordinates.x;
        if (coordinates.y > 400) {
          this.dropDownY = coordinates.y - 200;
        } else {
          this.dropDownY = coordinates.y + inputHeight;
        }
        //lấy data fake
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
    //emit modelValue khi click item
    handleClickOption(item) {
      const fieldSl = this.infor.find((iteminfor) => {
        return iteminfor.isInputDisplay;
      })?.name;
      this.textSearch = item[fieldSl];

      this.$emit("update:modelValue", item[this.fieldValue]);
      this.isShowList = false;
    },
    //Xử lý khi value input thay đổi
    handleOnInput() {
      this.isShowList = true;
      if (!this.textSearch) {
        //Nếu value input == null => emit lại modelValue null và reset data fake
        this.$emit("update:modelValue", null);
        this.dataChanged = this.data;
      } else {
        //else => show item theo value input
        this.dataChanged = this.data.filter((item) => {
          const isMap = this.infor.find((inforItem) => {
            return item[inforItem.name]
              ?.toUpperCase()
              .includes(this.textSearch.toUpperCase());
          });
          if (isMap) {
            return true;
          } else {
            return false;
          }
        });
      }
    },
    //Xử lý show, chọn các option bằng bàn phím
    handleKeyDownInput(e) {
      const allElementShowing = this.$refs.listCbb.querySelectorAll("tr");
      switch (e.keyCode) {
        case 9:
          this.$emit("handleTab");
          break;

        case 40:
          //Khi đang show list item
          if (this.isShowList) {
            if (allElementShowing.length > 0) {
              const currElement = this.$refs.listCbb.querySelector("tr.active");
              //Nếu không có item nào đang được chọn => focus item đầu tiên
              if (!currElement) {
                this.$refs.listCbb
                  .querySelector("tr.cbbItem-0")
                  .classList.add("active");
              } else if (
                //Nếu đang focus vào item cuối => focus item đầu
                currElement.classList.contains(
                  `cbbItem-${allElementShowing.length - 1}`
                )
              ) {
                currElement.classList.remove("active");
                this.$refs.listCbb
                  .querySelector("tr.cbbItem-0")
                  .classList.add("active");
              } else {
                //else => focus vào item tiếp theo
                currElement.classList.remove("active");
                currElement.nextElementSibling.classList.add("active");
              }
            }
          }
          break;
        case 38:
          //Khi đang show list item
          if (this.isShowList) {
            if (allElementShowing.length > 0) {
              const currElement = this.$refs.listCbb.querySelector("tr.active");
              if (!currElement) {
                this.$refs.listCbb
                  .querySelector(`tr.cbbItem-${allElementShowing.length - 1}`)
                  .classList.add("active");
              } else if (currElement.classList.contains(`cbbItem-0`)) {
                currElement.classList.remove("active");
                this.$refs.listCbb
                  .querySelector(`tr.cbbItem-${allElementShowing.length - 1}`)
                  .classList.add("active");
              } else {
                currElement.classList.remove("active");
                currElement.previousElementSibling.classList.add("active");
              }
            }
          }
          break;
        case 13:
          if (!this.isShowList) {
            const coordinates = this.$refs.input_search.getBoundingClientRect();
            const inputHeight = this.$refs.input_search.offsetHeight;
            this.inputWidth = this.$refs.input_search.offsetWidth;
            this.dropDownX = coordinates.x;
            if (coordinates.y > 400) {
              this.dropDownY = coordinates.y - 200;
            } else {
              this.dropDownY = coordinates.y + inputHeight;
            }
            this.isShowList = true;
            this.dataChanged = this.data;
          } else {
            const currElement = this.$refs.listCbb.querySelector("tr.active");
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
@import "../../style/base/BaseComboboxTB.scss";
</style>
