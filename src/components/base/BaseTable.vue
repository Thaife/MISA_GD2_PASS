<template>
  <div class="base__table__wrap">
    <div class="employ__table">
      <table :style="{ color: textColor }">
        <thead>
          <tr class="table__row__header">
            <th class="table__check__box">
              <div class="row__check-box__align">
                <div
                  :class="[
                    'row__check-box',
                    'txt-center',
                    { active: selectAll },
                  ]"
                  @click="handleClickRowCheckBox('all')"
                >
                  <div></div>
                </div>
              </div>
            </th>
            <th
              v-for="(col, index) in listCols"
              :key="index"
              v-show="col.isShow == true"
            >
              <div
                :title="col.display"
                :style="{
                  textAlign: `${col.align}`,
                  width: `${col.width}px`,
                }"
              >
                {{ col.display }}
              </div>
            </th>

            <th>CHỨC NĂNG</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in data"
            :key="item[fieldValue]"
            @click="handleClickRow(item[fieldValue])"
            @dblclick="this.$emit('handleClickView', item[fieldValue])"
            :class="[
              {
                active: listIdsSelected.includes(item[fieldValue]) || selectAll,
              },
              { focus: idFocus == item[fieldValue] },
            ]"
          >
            <td class="row__check-box__align">
              <div
                :class="[
                  'row__check-box',
                  {
                    active:
                      listIdsSelected.includes(item[fieldValue]) || selectAll,
                  },
                ]"
                @click="handleClickRowCheckBox(item[fieldValue])"
                @dblclick="
                  (e) => {
                    e.stopPropagation();
                  }
                "
              >
                <div class="row__check-box-b"></div>
              </div>
            </td>
            <td
              v-for="(col, index) in listCols"
              :key="index"
              v-show="col.isShow == true"
            >
              <div
                :class="{ col__link: col.link }"
                :style="{ textAlign: `${col.align}` }"
                :title="item[col.name]"
                v-on="
                  col.link
                    ? {
                        click: () => $emit('handleClickView', item[fieldValue]),
                      }
                    : { click: () => {} }
                "
              >
                {{
                  col.typeOfValue == "date"
                    ? handleDate(item[col.name])
                    : col.name == "Cash"
                    ? handleMoneyInTable(item)
                    : item[col.name]
                }}
              </div>
            </td>

            <td>
              <div class="row__func txt-center" style="min-width: 80px">
                <span @click="$emit('handleClickView', item[fieldValue])"
                  >Xem</span
                >
                <div class="row__func__box" @click.prevent="() => {}">
                  <div
                    :class="['icon__wrap', { active: id == item[fieldValue] }]"
                    @blur="handleBlurMoreFunc"
                    @click="handleClickMoreFunc($event, item[fieldValue])"
                    @dblclick="
                      (e) => {
                        e.stopPropagation();
                      }
                    "
                  >
                    <div class="icon" @click.prevent="() => {}"></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot v-show="existFooter">
          <tr>
            <th :style="{ width: `38px` }"></th>
            <th
              v-for="(col, index) in listCols"
              :key="index"
              :style="{ width: `${col.minWidth}` }"
              v-show="col.isShow == true"
            >
              <div
                v-if="index == 0"
                :style="{ textAlign: `center`, color: '#111111' }"
              >
                Tổng
              </div>
              <div
                v-else-if="col.getTotal"
                :style="{
                  textAlign: `${col.align}`,
                  color: '#111111',
                }"
              >
                {{ handleSumTotalMoney(sumTotalMoney) }}
              </div>
            </th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div class="no__content" v-show="data.length < 1">not output</div>
    </div>
  </div>
  <div
    class="drop__box__func"
    v-show="isShowFuncDrop"
    :style="{ top: `${dropBoxY}px`, left: `${dropBoxX}px` }"
  >
    <div class="drop__box">
      <div class="drop__box__item">Ghi sổ</div>
      <div
        v-show="!notAllowUpdate"
        class="drop__box__item"
        @click="handleClickUpdate"
      >
        Sửa
      </div>
      <div
        v-show="!notAllowDelete"
        class="drop__box__item"
        @click="handleClickRemove"
      >
        Xoá
      </div>
      <div
        v-show="!notAllowReplica"
        class="drop__box__item"
        @click="handleClickRelica"
      >
        Nhân bản
      </div>
    </div>
  </div>
</template>

<script>
import FormatData from "../../js/formatData/formatData";
export default {
  name: "base-table",
  props: [
    "data",
    "listCols",
    "fieldValue",
    "textColor",
    "listIdsSelected",
    "existFooter",
    "notAllowReplica",
    "notAllowUpdate",
    "notAllowDelete",
  ],
  data() {
    return {
      //Id để show box func
      isShowFuncDrop: false,

      id: null,

      //
      idFocus: null,

      selectAll: false,

      dropBoxX: 0,
      dropBoxY: 0,

      //
      sumTotalMoney: 0,
    };
  },
  emits: [
    "handleClickView",
    "handleClickUpdate",
    "handleClickRemove",
    "handleClickRelica",
    "setListIdsSelected",
  ],
  computed: {
    // totalCash() {
    //   const field = this.listCols.find((item) => {
    //     return item.getTotal;
    //   });
    //   const res = this.data.reduce((total, item) => {
    //     return parseInt(item[field.fieldName]) + total;
    //   }, 0);
    //   return res;
    // },

    //Tính toán tổng tiền trên 1 row
    handleMoneyInTable() {
      return (item) => {
        let totalCash = 0;
        if (item.Accountings) {
          let listAccountings = JSON.parse(item.Accountings);
          totalCash = listAccountings.reduce((total, item) => {
            return total + item.Money;
          }, 0);
        }
        //format lại tiền
        return FormatData.formatMoney(totalCash);
      };
    },
    //format lại tổng tiền
    handleSumTotalMoney() {
      return (total) => FormatData.formatMoney(total);
    },
    //format date
    handleDate() {
      return (dateString) => {
        return FormatData.formatDateFrom_DateTimePicker_to_YYMMDDDD(
          new Date(dateString)
        );
      };
    },
  },
  watch: {
    //add sự kiện click outside khi box chức năng đang được hiển thị
    isShowFuncDrop(value) {
      if (value) {
        document.addEventListener("click", this.focusOutSide);
      } else {
        document.removeEventListener("click", this.focusOutSide);
        this.id = null;
      }
    },
    data(value) {
      this.selectAll = false;
      let res = 0;
      if ((value, this.existFooter)) {
        res = this.data.reduce((total, item) => {
          let a = 0;
          if (item.Accountings) {
            a = JSON.parse(item.Accountings).reduce((t, acc) => {
              return t + acc.Money;
            }, 0);
          }
          return total + a;
        }, 0);
      }
      this.sumTotalMoney = res;
    },
  },
  methods: {
    focusOutSide(e) {
      if (
        !e.target.classList.contains("icon__wrap") &&
        !e.target.classList.contains("icon")
      ) {
        this.isShowFuncDrop = false;
      }
    },
    //emit..setListIdsSelected(listId)
    handleClickUpdate() {
      this.$emit("handleClickUpdate", this.id);
    },
    handleClickRemove() {
      this.$emit("handleClickRemove", this.id);
    },
    handleClickRelica() {
      this.$emit("handleClickRelica", this.id);
    },
    handleBlurMoreFunc() {},
    //Khi click drop box thao tác với 1 row => set vị trí hiển thị và hiển thị lên màn hình
    handleClickMoreFunc(e, id) {
      if (!this.isShowFuncDrop || id != this.id) {
        this.isShowFuncDrop = true;
        this.id = id;
        const heiEle = e.target.offsetHeight;
        if (e.target.getBoundingClientRect().y > 445) {
          this.dropBoxX = e.target.getBoundingClientRect().x - 108;
          this.dropBoxY = 440;
        } else {
          this.dropBoxX = e.target.getBoundingClientRect().x - 78;
          this.dropBoxY = e.target.getBoundingClientRect().y + heiEle + 4;
        }
      } else {
        this.isShowFuncDrop = false;
      }
    },
    handleClickRow(id) {
      this.idFocus = id;
    },
    handleClickRowCheckBox(id) {
      //khi click vào chọn tất cả...
      if (id == "all") {
        this.selectAll = !this.selectAll;
        //if bỏ chọn tất cả
        if (!this.selectAll) {
          this.$emit("setListIdsSelected", []);
          //else => chọn tất cả => thêm tất cả id vào list chọn
        } else {
          let listNow = [];
          this.data.forEach((item) => {
            listNow.push(item[this.fieldValue]);
          });
          this.$emit("setListIdsSelected", listNow);
        }
        //khi click vào 1 dòng
      } else {
        //Nếu đang chọn thì bỏ chọn, thoát khỏi trạng thái chọn tất cả
        if (this.listIdsSelected.includes(id)) {
          this.selectAll = false;
          let listNow = this.listIdsSelected.filter((idItem) => {
            return idItem != id;
          });
          this.$emit("setListIdsSelected", listNow);
          //Nếu chưa chọn => push vào list
        } else {
          this.$emit("setListIdsSelected", [...this.listIdsSelected, id]);
          //Nếu độ dài list = tổng employee đang hiển thị => kích hoạt trạng thái chọn tất cả
          if (this.listIdsSelected.length == this.data.length) {
            this.selectAll = true;
          }
        }
      }
    },
    handleClickLinkOnRow(id) {
      this.$emit("handleClickView", id);
    },
  },
};
</script>

<style lang="scss">
@import "../../style/views/table.scss";
</style>
