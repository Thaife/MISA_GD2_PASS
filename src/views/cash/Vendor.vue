<template>
  <div class="view-vendor">
    <div class="cash__transaction">
      <div class="cash__transaction__header-wrap">
        <div class="cash__transaction__header">
          <div class="cash__transaction__header__title">
            Danh sách nhà cung cấp
          </div>
          <div class="cash__transaction__header__help">
            <div class="cash__transaction__header__help__icon"></div>
            <a href="" class="cash__transaction__header__help__text"
              >Hướng dẫn</a
            >
          </div>
          <div class="btn__add__receipt">
            <div
              style="margin-right: 12px"
              class="batch__execution"
              @click="() => {}"
            >
              Tiện ích
              <div class="batch__execution__more">
                <div class="batch__execution__icon__wrap">
                  <div class="batch__execution__icon"></div>
                </div>
                <div class="batch__execution__box" v-show="false">
                  <div class="batch__execution__box__item" @click="() => {}">
                    Xoá
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn__add__vendor" @click="handleClickAddVendor">
            <BaseButtonIcon
              mainType="true"
              text="Thêm"
              height="36px"
              :tabIndex="18"
              radius="20px"
            />
          </div>
        </div>
        <div class="header__back__category">
          <div class="header__back__category__icon"></div>
          <div class="header__back__category__text">Tất cả danh mục</div>
        </div>
      </div>
      <div class="cash__transaction__body">
        <div class="cash__transaction__overview">
          <div class="cash__transaction__overview__item c-4">
            <div
              class="cash__transaction__overview__overdue"
              @mousemove="handleCreateTitleTag($event, 'Bấm vào để lọc')"
              @mouseleave="handleUnMount"
            >
              <div class="transaction__overview__money">0,0</div>
              <div class="transaction__overview__title">Nợ quá hạn</div>
              <div class="transaction__overview__icon"></div>
            </div>
          </div>
          <div class="cash__transaction__overview__item c-4 padd-0-6-0-6">
            <div
              class="cash__transaction__overview__totalLiabilities"
              @mousemove="handleCreateTitleTag($event, 'Bấm vào để lọc')"
              @mouseleave="handleUnMount"
            >
              <div class="transaction__overview__money">0,0</div>
              <div class="transaction__overview__title">Tổng nợ phải trả</div>
              <div class="transaction__overview__icon"></div>
            </div>
          </div>
          <div class="cash__transaction__overview__item c-4">
            <div class="cash__transaction__overview__moneyPaid">
              <div class="transaction__overview__money money__fund">(0,0)</div>
              <div class="transaction__overview__title">
                Đã thanh toán (30 ngày gần đây)
              </div>
            </div>
          </div>
          <div class="cash__transaction__overview__loading">
            <div class="overview__loading__icon"></div>
          </div>
        </div>
        <div class="cash__transaction__data">
          <div class="cash__transaction__data__left">
            <div class="down__arrow__checkall">
              <div class="down__arrow__checkall__icon"></div>
            </div>
            <div
              style="margin-right: 12px"
              :class="[
                'batch__execution',
                listIdsSelected.length > 1 ? 'u-can' : '',
              ]"
              @click="handleClickBathExecution"
            >
              Thực hiện hàng loạt
              <div class="batch__execution__more">
                <div class="batch__execution__icon__wrap">
                  <div class="batch__execution__icon"></div>
                </div>
                <div
                  class="batch__execution__box"
                  v-show="isShowBatchExecution"
                >
                  <div
                    class="batch__execution__box__item"
                    @click="handleClickDeleteMultiRecord"
                  >
                    Xoá
                  </div>
                </div>
              </div>
            </div>
            <div
              style="margin-right: 12px"
              class="batch__execution"
              @click="() => {}"
            >
              Lọc
              <div class="batch__execution__more">
                <div class="batch__execution__icon__wrap">
                  <div class="batch__execution__icon"></div>
                </div>
                <div class="batch__execution__box" v-show="false">
                  <div class="batch__execution__box__item" @click="() => {}">
                    Xoá
                  </div>
                </div>
              </div>
            </div>
            <span class="filter__text"></span>
          </div>
          <div class="cash__transaction__data__right">
            <BaseInput
              type="text"
              width="225px"
              height="32px"
              placeholder="Nhập từ khoá để tìm kiếm"
              :search="true"
              v-model="searchText"
              @handleEnter="handleFilter"
              field=""
              :autofocus="false"
            />
            <div
              class="cash__transaction__data__loading cash__transaction__data-wrap"
              @click="getVendorsPaging"
            >
              <div class="cash__transaction__data__icon"></div>
            </div>
            <div
              class="cash__transaction__data__download cash__transaction__data-wrap"
              @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
            >
              <div class="cash__transaction__data__icon"></div>
            </div>
            <div
              class="cash__transaction__data__setting cash__transaction__data-wrap"
              @click="SET_ISSHOW_POPUP_MODIFIED(!isShowPopupModified)"
            >
              <div class="cash__transaction__data__icon"></div>
            </div>
          </div>
          <div class="execute__show__overview">
            <div class="execute__show__overview__icon"></div>
          </div>
        </div>
        <div class="transaction__table">
          <BaseTable
            :data="vendors"
            :listCols="displayFieldVendors"
            :listIdsSelected="listIdsSelected"
            :existFooter="false"
            fieldValue="VendorId"
            textColor="#111111"
            @handleClickView="handleClickView"
            @handleClickUpdate="handleClickUpdate"
            @handleClickRemove="handleClickRemove"
            @setListIdsSelected="setListIdsSelected"
            :notAllowReplica="true"
          />
        </div>
        <div class="cash__transaction__bottom">
          <div class="left">
            <div class="cash__transaction__total__record">
              Tổng số:
              <span style="font-family: 'notosansSemiBold'">{{
                totalRecord
              }}</span>
              bản ghi
            </div>
          </div>
          <div class="right">
            <BaseCombobox
              v-model="recordInPage"
              fieldValue="value"
              fieldDisplay="text"
              fontSizeDisplay="1.3rem"
              width="200px"
              height="32px"
              :data="selectRecordInPage"
            />
            <BasePaingControl
              :totalRecord="totalRecord"
              :totalPage="totalPage"
              v-model="page"
            />
          </div>
        </div>
      </div>
    </div>
    <BaseModified :listCols="displayFieldVendors" />
    <PopupDetailsVendor />
  </div>
</template>

<script>
import BaseButtonIcon from "@/components/base/BaseButtonIcon.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseCombobox from "@/components/base/BaseCombobox.vue";
import BasePaingControl from "@/components/base/BasePagingControl.vue";
import BaseModified from "@/components/base/BaseModified.vue";
import PopupDetailsVendor from "@/views/cash/PopupDetailsVendor.vue";

import entityOnModified from "@/js/entityOnModified";
import typeOfUpdateCash from "@/js/typeOfUpdateCash";

import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "view-vendor",
  components: {
    BaseButtonIcon,
    BaseInput,
    BaseTable,
    BaseCombobox,
    BasePaingControl,
    BaseModified,
    PopupDetailsVendor,
  },
  data() {
    return {
      //ẩn hiện thực hiện hàng loạt
      isShowBatchExecution: false,

      //list id được chọn trong table
      listIdsSelected: [],

      searchText: "",
      page: 1,
      recordInPage: null,
    };
  },
  computed: {
    ...mapGetters([
      "vendors",
      "displayFieldVendors",
      "listVendorIdSelected",
      "countries",
      //
      "textSearch",
      "totalRecord",
      "totalPage",
      "currentPage",
      "selectRecordInPage",
      "pageSize",
      ///
      "isShowPopupModified",

      /// Base Title
    ]),
  },
  watch: {
    listVendorIdSelected(value) {
      this.listIdsSelected = value;
    },
    currentPage(value) {
      this.page = value;
      this.SET_LIST_VENDOR_ID_SELECTED([]);
    },
    page(value) {
      this.SET_CURRENT_PAGE(value);
      this.getVendorsPaging();
    },
    recordInPage(value) {
      if (this.page != 1) {
        this.SET_CURRENT_PAGE(1);
      }
      if (value) this.SET_PAGE_SIZE(value);
      this.getVendorsPaging();
    },
    // eslint-disable-next-line no-unused-vars
    searchText(value) {},
  },
  created() {
    this.getDisplayFieldVendors();
  },
  mounted() {
    window.addEventListener("keydown", this.handleDocumentKeydown);
    this.recordInPage = 20;
    this.page = 1;
    this.getVendorsPaging();
    this.SET_ENTITY_ON_MODIFIED(entityOnModified.vendor);
    this.getEmployeesCash();
    this.getVendorGroups();
    this.getContactPronouns();
    this.getBankAccounts();
    this.getRules();
    this.getCountries();
  },
  unmounted() {
    window.removeEventListener("keydown", this.handleDocumentKeydown);
    this.SET_CURRENT_PAGE(1);
    this.SET_PAGE_SIZE(20);
  },
  methods: {
    ...mapActions([
      "getVendors",
      "getVendorsPaging",
      "getDisplayFieldVendors",
      "getVendorById",
      "getEmployeesCash",
      "getVendorGroups",
      "getContactPronouns",
      "getBankAccounts",
      "getRules",
      "getCountries",
    ]),
    ...mapMutations([
      "SET_ISSHOW_POPUP_DETAILS_VENDOR",
      "SET_FORM_DETAILS_VENDOR_MODE",
      "SET_LIST_VENDOR_ID_SELECTED",
      /// Base Title
      "SET_IS_SHOW_BASE_TITLE",
      "SET_TEXT_BASE_TITLE",
      "SET_LEFT_BASE_TITLE",
      "SET_TOP_BASE_TITLE",
      "SET_BACKGR_BASE_TITLE",
      // modify flex table
      "SET_ENTITY_ON_MODIFIED",
      "SET_ISSHOW_POPUP_MODIFIED",
      "SET_VENDOR_ID_SELECTED",
      //paging
      "SET_PAGE_SIZE",
      "SET_CURRENT_PAGE",
      "SET_TEXT_SEARCH",
      //dialog
      "SET_ISSHOW_DIALOG_CONFIRM",
      "SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT",
    ]),
    handleDocumentKeydown(e) {
      if (e.keyCode == 112 && e.ctrlKey) {
        e.preventDefault();
        this.handleClickAddVendor();
      }
    },

    //Xử lý tìm kiểm nhà cung cấp
    handleFilter(text) {
      //set text search trong store
      this.SET_TEXT_SEARCH(text);
      //get lại danh sách nhà cung cấp
      this.getVendorsPaging();
    },
    //Xử lý thêm nhà cung cấp
    handleClickAddVendor() {
      //Chuyển trạng thái sang thêm và mở form
      this.SET_FORM_DETAILS_VENDOR_MODE(typeOfUpdateCash.addVendor);
      this.SET_ISSHOW_POPUP_DETAILS_VENDOR(true);
    },
    //Xử lý khi mở form ở chế độ xem
    handleClickView(id) {
      //Chuyển trạng thái sang xem
      this.SET_FORM_DETAILS_VENDOR_MODE(typeOfUpdateCash.viewVendor);
      //Set id được chọn và lấy nhà cung cấp theo id đó
      this.SET_VENDOR_ID_SELECTED(id);
      this.getVendorById(id);
      //Mở form
      this.SET_ISSHOW_POPUP_DETAILS_VENDOR(true);
    },
    //Xử lý khi mở form ở chế độ sửa
    handleClickUpdate(id) {
      //Chuyển trạng thái sang sửa
      this.SET_FORM_DETAILS_VENDOR_MODE(typeOfUpdateCash.updateVendor);
      //Set id được chọn và lấy nhà cung cấp theo id đó
      this.SET_VENDOR_ID_SELECTED(id);
      this.getVendorById(id);
      //Mở form
      this.SET_ISSHOW_POPUP_DETAILS_VENDOR(true);
    },
    //Xử lý xoá 1 row
    handleClickRemove(id) {
      //Set id được chọn
      this.SET_VENDOR_ID_SELECTED(id);
      //Lấy code để bind vào popup cảnh báo
      const vendorCode = this.vendors.find((vendor) => {
        return vendor.VendorId == id;
      }).VendorCode;
      this.SET_ISSHOW_DIALOG_CONFIRM({
        isShow: true,
        mess: `Bạn có thực sự muốn xóa Nhà cung cấp <${vendorCode}> này không?`,
      });
    },
    //Xử lý xoá hàng loạt
    handleClickDeleteMultiRecord() {
      //Set id được chọn
      this.SET_LIST_VENDOR_ID_SELECTED(this.listIdsSelected);
      this.SET_ISSHOW_DIALOG_CONFIRM({
        isShow: true,
        mess: "Bạn có muốn xóa những nhà cung cấp này?",
      });
    },
    //Set list id được chọn
    setListIdsSelected(listId) {
      this.listIdsSelected = listId;
    },
    //Click thực hiện hàng loạt
    handleClickBathExecution() {
      if (this.isShowBatchExecution == true) {
        this.isShowBatchExecution = false;
      } else {
        //Nếu list gồm 2 phần tử trở lên => cho phép thực hiện
        if (this.listIdsSelected.length > 1) {
          this.isShowBatchExecution = true;
        }
      }
    },
    handleCreateTitleTag(e, text) {
      this.SET_IS_SHOW_BASE_TITLE(true);
      this.SET_TEXT_BASE_TITLE(text);
      this.SET_LEFT_BASE_TITLE(e.pageX + 10);
      this.SET_TOP_BASE_TITLE(e.pageY + 10);
    },
    handleUnMount() {
      this.SET_IS_SHOW_BASE_TITLE(false);
    },
  },
};
</script>

<style lang="scss">
@import "../../style/views/cash/vendor.scss";
</style>
