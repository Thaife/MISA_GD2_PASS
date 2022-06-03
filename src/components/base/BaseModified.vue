<template>
  <div class="base-modified-wrap" v-show="isShowPopupModified">
    <div :class="['base-modified', { active: isExtendView }]">
      <div class="modified__more" @click="isExtendView = !isExtendView">
        <div class="modified__more__icon"></div>
      </div>
      <div class="modified__title">
        <h2>Tuỳ chỉnh giao diện</h2>
        <div></div>
        <div class="modified__title__ic">
          <div class="modified__title__icon__wrap">
            <div class="modified__title__icon modified__help"></div>
          </div>
          <div
            class="modified__title__icon__wrap"
            @click="SET_ISSHOW_POPUP_MODIFIED(!isShowPopupModified)"
          >
            <div class="modified__title__icon modified__close"></div>
          </div>
        </div>
      </div>
      <div class="modified__header">
        <BaseInput
          type="text"
          width="192px"
          height="32px"
          placeholder="Nhập từ khoá để tìm kiếm"
          :search="true"
          field=""
          :autofocus="false"
        />
        <div
          class="modifiel__detail"
          @click="isShowColsDetails = !isShowColsDetails"
        >
          Sửa tên cột hiển thị và độ rộng
        </div>
      </div>
      <div class="modified__content">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th class="row__check-box__align" style="width: 38px">
                  <div
                    :class="[
                      'row__check-box',
                      {
                        active: selectAll,
                      },
                    ]"
                    @click="handleClickAllRow"
                  >
                    <div class="row__check-box-b"></div>
                  </div>
                </th>
                <th>
                  <div>Tên cột dữ liệu</div>
                </th>
                <th style="width: 200px" v-show="isShowColsDetails">
                  <div>Tên cột trên giao diện</div>
                </th>
                <th style="width: 100px" v-show="isShowColsDetails">
                  <div>Độ rộng</div>
                </th>
                <th style="width: 120px" v-show="isShowColsDetails">
                  <div>Cố định cột</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(col, index) in listColsShow"
                :key="index"
                @click="handleClickRow(col.name)"
              >
                <td>
                  <div class="drag">
                    <div class="drag-icon"></div>
                  </div>
                </td>
                <td class="row__check-box__align" style="width: 38px">
                  <div
                    :class="[
                      'row__check-box',
                      {
                        active:
                          listFieldsSelected.includes(col.name) || selectAll,
                      },
                    ]"
                    @click="handleClickCheckBox(col.name)"
                  >
                    <div class="row__check-box-b"></div>
                  </div>
                </td>
                <td>
                  {{ col.rootName }}
                </td>
                <td
                  @click="handleClickTdInput(col.name)"
                  v-show="isShowColsDetails"
                >
                  <div v-if="!isShowColsDetails"></div>
                  <div v-else-if="fieldFocus == col.name">
                    <BaseInput
                      type="text"
                      width="100%"
                      height="32px"
                      field=""
                      v-model="listColsFake[index].display"
                    />
                  </div>
                  <div style="line-height: 100%" v-else>
                    {{ listColsFake[index].display }}
                  </div>
                </td>
                <td v-show="isShowColsDetails">
                  <div v-if="!isShowColsDetails"></div>
                  <div v-else-if="fieldFocus == col.name">
                    <BaseInput
                      type="number"
                      width="100%"
                      height="32px"
                      field=""
                      v-model="listColsFake[index].width"
                    />
                  </div>
                  <div style="line-height: 100%" v-else>
                    {{ listColsFake[index].width }}
                  </div>
                </td>
                <td
                  v-show="isShowColsDetails"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div
                    :class="[
                      'row__check-box',
                      {
                        active: listFieldFixed.includes(col.name),
                      },
                    ]"
                    @click="handleClickCheckBoxFixed(col.name)"
                  >
                    <div class="row__check-box-b"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="show__more" @click="isShowAllCols = !isShowAllCols">
          Hiển thị thêm
        </div>
      </div>
      <div class="modified__bottom">
        <div class="modified__bottom__left">
          <div @click="isExtendView = !isExtendView">
            <BaseButton text="Huỷ" height="32px" @handleKeyDown="() => {}" />
          </div>
        </div>
        <div class="modified__bottom__right">
          <div class="btn__wrap">
            <BaseButton text="Lấy mẫu ngầm định" height="32px" />
          </div>
          <div @click="handleSaveModified">
            <BaseButton
              text="Cất"
              :mainType="true"
              height="32px"
              @handleKeyDown="() => {}"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";

import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "base-modified",
  props: ["listCols"],
  data() {
    return {
      //Danh sách backup từ list được truyền vào
      listColsFake: [],
      //Xét focus vào field được chọn
      colFocus: "",

      listFieldsSelected: [],
      listFieldFixed: [],
      selectAll: false,
      detailsCols: {},
      isShowAllCols: false,
      isExtendView: false,
      isShowColsDetails: false,
      fieldFocus: "",
    };
  },
  components: { BaseInput, BaseButton },
  computed: {
    ...mapGetters(["isShowPopupModified", "entityOnModified"]),
    //Danh sách cột người dùng nhìn thấy trên màn hình
    listColsShow() {
      //mặc định hiển thị 10 field, nếu isShowAllCols == true => hiện hết
      if (this.isShowAllCols) {
        return this.listColsFake;
      } else {
        const res = this.listColsFake.filter((col, index) => {
          return index < 10;
        });
        return res;
      }
    },
  },
  watch: {
    isShowPopupModified(value) {
      //reset lại form modified
      if (!value) {
        this.listFieldsSelected = [];
        this.selectAll = false;
        this.listFieldFixed = [];
        this.fieldFocus = "";
      } else {
        this.listCols.forEach((col) => {
          if (col.isShow == true) {
            this.listFieldsSelected.push(col.name);
          }
        });
        if (this.listCols.length == this.listFieldsSelected.length) {
          this.selectAll = true;
        }
      }
    },
    //Lấy giá trị cột và thông tin các cột
    listCols(value) {
      let list = [];
      value.forEach((item) => {
        list.push({ ...item });
      });
      this.listColsFake = list;
    },
  },
  methods: {
    ...mapMutations(["SET_ISSHOW_POPUP_MODIFIED"]),
    ...mapActions([
      "updateDisplayFieldTransaction",
      "updateDisplayFieldVendor",
    ]),
    handleClickAllRow() {
      //Set chế độ check all khi click vào checkbox check all
      this.selectAll = !this.selectAll;
      this.listFieldsSelected = [];
      if (this.selectAll) {
        const list = this.listFieldsSelected;
        this.listColsFake.forEach((col) => {
          list.push(col.name);
        });
      }
    },
    //Xử lý khi click vào checkbox chọn cột
    handleClickCheckBox(col) {
      //Nếu đang được check => bỏ check
      if (this.listFieldsSelected.includes(col)) {
        this.listFieldsSelected = this.listFieldsSelected.filter((item) => {
          return item != col;
        });
        if (this.selectAll) {
          this.selectAll = false;
        }
        //else => ...add
      } else {
        this.listFieldsSelected = [...this.listFieldsSelected, col];
        if (this.listFieldsSelected.length == this.listCols.length)
          this.selectAll = true;
      }
    },
    //not use
    handleClickCheckBoxFixed(col) {
      const list = this.listFieldFixed;
      if (list.includes(col)) {
        this.listFieldFixed = list.filter((item) => {
          return item != col;
        });
      } else {
        this.listFieldFixed.push(col);
      }
    },
    //khi click vào thông tin 1 field => set focus
    handleClickRow(col) {
      this.fieldFocus = col;
    },
    handleClickTdInput(colName) {
      this.colFocus = colName;
    },
    //xử lý khi lưu popup
    handleSaveModified() {
      //xác định lại các column đang được chọn để hiện thị và emit nó ra ngoài
      this.listColsFake = this.listColsFake.map((col) => {
        return { ...col, isShow: this.listFieldsSelected.includes(col.name) };
      });
      //Ẩn popup
      this.SET_ISSHOW_POPUP_MODIFIED(false);
      if (this.entityOnModified == this.entityModified.transaction)
        this.updateDisplayFieldTransaction(this.listColsFake);
      else if (this.entityOnModified == this.entityModified.vendor) {
        this.updateDisplayFieldVendor(this.listColsFake);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/style/base/BaseModified.scss";
</style>
