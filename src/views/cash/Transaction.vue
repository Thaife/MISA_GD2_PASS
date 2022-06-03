<template>
  <div class="cash__transaction">
    <div class="cash__transaction__header-wrap">
      <div class="cash__transaction__header">
        <div class="cash__transaction__header__title">Thu chi tiền mặt</div>
        <div class="cash__transaction__header__help">
          <div class="cash__transaction__header__help__icon"></div>
          <a href="" class="cash__transaction__header__help__text">Hướng dẫn</a>
        </div>
        <div
          class="btn__add__receipt"
          v-show="
            typeOfTransaction == this.transactionType.receipt ||
            typeOfTransaction == this.transactionType.paymentAndReceipt
          "
        >
          <BaseButtonIcon
            mainType="true"
            text="Thêm thu tiền"
            height="36px"
            :tabIndex="18"
            radius="20px"
          />
        </div>
        <div
          class="btn__add__payment"
          v-show="
            typeOfTransaction == this.transactionType.payment ||
            typeOfTransaction == this.transactionType.paymentAndReceipt
          "
          @click="handleClickAddPayment"
        >
          <BaseButtonIcon
            mainType="true"
            text="Thêm chi tiền"
            height="36px"
            :tabIndex="18"
            radius="20px"
          />
        </div>
      </div>
    </div>
    <div class="cash__transaction__body">
      <div class="cash__transaction__overview">
        <div class="cash__transaction__overview__item c-4">
          <div class="cash__transaction__overview__receipt">
            <div class="transaction__overview__money">0,0</div>
            <div class="transaction__overview__title">
              Tổng thu đầu năm tới hiện tại
            </div>
          </div>
        </div>
        <div class="cash__transaction__overview__item c-4 padd-0-6-0-6">
          <div class="cash__transaction__overview__payment">
            <div class="transaction__overview__money">0,0</div>
            <div class="transaction__overview__title">
              Tổng chi đầu năm tới hiện tại
            </div>
          </div>
        </div>
        <div class="cash__transaction__overview__item c-4">
          <div class="cash__transaction__overview__fund">
            <div class="transaction__overview__money money__fund">(0,0)</div>
            <div class="transaction__overview__title">
              Tổng chi đầu năm tới hiện tại
            </div>
          </div>
        </div>
        <div class="cash__transaction__overview__loading">
          <div class="overview__loading__icon"></div>
        </div>
      </div>
      <div class="cash__transaction__type">
        <div
          :class="[
            'cash__transaction__type__item',
            {
              active:
                typeOfTransaction == this.transactionType.paymentAndReceipt,
            },
          ]"
          @click="
            SET_TYPEOF_TRANSACTION(this.transactionType.paymentAndReceipt)
          "
        >
          Tất cả
        </div>
        <div
          :class="[
            'cash__transaction__type__item',
            {
              active: typeOfTransaction == this.transactionType.receipt,
            },
          ]"
          @click="SET_TYPEOF_TRANSACTION(this.transactionType.receipt)"
        >
          Thu tiền
        </div>
        <div
          :class="[
            'cash__transaction__type__item',
            {
              active: typeOfTransaction == this.transactionType.payment,
            },
          ]"
          @click="SET_TYPEOF_TRANSACTION(this.transactionType.payment)"
        >
          Chi tiền
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
              <div class="batch__execution__box" v-show="isShowBatchExecution">
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
            class="batch__execution filter"
            @click="() => {}"
          >
            Lọc
            <div class="batch__execution__more">
              <div class="batch__execution__icon__wrap">
                <div class="batch__execution__icon"></div>
              </div>
            </div>
          </div>
          <span class="filter__text">Đầu năm tới hiện tại</span>
        </div>
        <div class="cash__transaction__data__right">
          <BaseInput
            type="text"
            width="225px"
            height="32px"
            placeholder="Nhập từ khoá để tìm kiếm"
            @handleEnter="handleFilter"
            :search="true"
            field=""
            :autofocus="false"
          />
          <div
            class="cash__transaction__data__loading cash__transaction__data-wrap"
            @click="getPaymentsPaging"
          >
            <div class="cash__transaction__data__icon"></div>
          </div>
          <div
            class="cash__transaction__data__download cash__transaction__data-wrap"
            @click="handleClickExport"
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
          :data="transactions"
          :listCols="displayFieldTransaction"
          :listIdsSelected="listIdsSelected"
          :existFooter="true"
          fieldValue="PaymentId"
          textColor="#2ca01c"
          @handleClickView="handleClickView"
          @handleClickRemove="handleClickRemove"
          @handleClickRelica="handleClickRelica"
          @setListIdsSelected="setListIdsSelected"
          :notAllowUpdate="true"
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
    <BaseModified :listCols="displayFieldTransaction" />
  </div>
</template>

<script>
import BaseButtonIcon from "@/components/base/BaseButtonIcon.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseCombobox from "@/components/base/BaseCombobox.vue";
import BasePaingControl from "@/components/base/BasePagingControl.vue";
import BaseModified from "@/components/base/BaseModified.vue";

import entityOnModified from "@/js/entityOnModified";
import typeOfUpdateCash from "@/js/typeOfUpdateCash";

import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "view-transaction",
  components: {
    BaseButtonIcon,
    BaseInput,
    BaseTable,
    BaseCombobox,
    BasePaingControl,
    BaseModified,
  },
  data() {
    return {
      //ẩn hiện thực hiện hàng loạt
      isShowBatchExecution: false,

      //list id được chọn trong table
      listIdsSelected: [],
      page: 1,
      recordInPage: null,
    };
  },
  computed: {
    ...mapGetters([
      "typeOfTransaction",
      "transactions",
      "displayFieldTransaction",
      "listTransactionIdSelected",
      //
      "textSearch",
      "totalRecord",
      "totalPage",
      "currentPage",
      "selectRecordInPage",
      "pageSize",
      ///
      "isShowPopupModified",
    ]),
  },
  watch: {
    listTransactionIdSelected(value) {
      this.listIdsSelected = value;
    },
    currentPage(value) {
      this.page = value;
      console.log("change page");
      this.SET_LIST_TRANSACTION_ID_SELECTED([]);
    },
    page(value) {
      console.log("change page");
      this.SET_CURRENT_PAGE(value);
      this.getPaymentsPaging();
    },
    recordInPage(value) {
      if (this.page != 1) {
        this.SET_CURRENT_PAGE(1);
      }
      if (value) this.SET_PAGE_SIZE(value);
      this.getPaymentsPaging();
    },
    // eslint-disable-next-line no-unused-vars
    searchText(value) {},
  },
  created() {
    this.getDisplayFieldTransaction();
  },
  mounted() {
    window.addEventListener("keydown", this.handleDocumentKeydown);
    this.recordInPage = 20;
    this.getPaymentsPaging();
    this.SET_ENTITY_ON_MODIFIED(entityOnModified.transaction);
    this.getAccountObjects();
    this.getBankAccounts();
    this.getCurrencys();
    this.getEmployeesCash();
    this.getVendorsCbb();
  },
  unmounted() {
    window.removeEventListener("keydown", this.handleDocumentKeydown);
    this.SET_CURRENT_PAGE(1);
    this.SET_PAGE_SIZE(20);
  },
  methods: {
    ...mapActions([
      "getVendorsCbb",
      "getTransactions",
      "getPaymentsPaging",
      "getPaymentById",
      "getPaymentTransactions",
      "getDisplayFieldTransaction",
      "deletePayment",
      "deleteMultiPayment",
      //
      "getAccountObjects",
      "getBankAccounts",
      "getCurrencys",
      "getEmployeesCash",
      //
      "exportExcel",
    ]),
    ...mapMutations([
      "SET_ISSHOW_POPUP_MODIFIED",
      "SET_TYPEOF_TRANSACTION",
      "SET_ISSHOW_POPUP_DETAILS_PAYMENT",
      "SET_TRANSACTION_ID_SELECTED",
      "SET_LIST_TRANSACTION_ID_SELECTED",
      "SET_FORM_DETAILS_TRANSACTION_MODE",

      // modify flex table
      "SET_ENTITY_ON_MODIFIED",
      //paging
      "SET_CURRENT_PAGE",
      "SET_PAGE_SIZE",
      "SET_TEXT_SEARCH",
      //
      "SET_ISSHOW_DIALOG_CONFIRM",
      "SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT",
    ]),
    //export excel
    handleClickExport() {
      console.log(this.transactions);
      let columns = [];
      console.log(this.displayFieldTransaction);
      this.displayFieldTransaction.forEach((field) => {
        if (field.isShow) {
          columns.push({
            Key: field.name,
            Name: field.display,
            Align: field.align,
          });
        }
      });
      this.exportExcel(columns);
      //axios('url, data, respon-content:blob)
      //.then(
      //fileDownload(data, "Thai.csv");
      //)

      console.log(columns);
      //pust nameColumn, displayColumn, align
    },

    //
    handleDocumentKeydown(e) {
      if (e.keyCode == 112 && e.ctrlKey) {
        e.preventDefault();
        this.handleClickAddPayment();
      }
    },
    //Xử lý tìm kiểm phiếu chi
    handleFilter(text) {
      //set text search trong store
      this.SET_TEXT_SEARCH(text);
      //get lại danh sách phiếu chi
      this.getPaymentsPaging();
    },
    //Xử lý thêm phiếu chi
    handleClickAddPayment() {
      // debugger;
      //Chuyển trạng thái sang thêm và mở form
      this.SET_FORM_DETAILS_TRANSACTION_MODE(typeOfUpdateCash.addPayment);
      this.SET_ISSHOW_POPUP_DETAILS_PAYMENT(true);
    },
    //Xử lý khi mở form ở chế độ xem
    handleClickView(id) {
      //Chuyển trạng thái sang xem
      this.SET_FORM_DETAILS_TRANSACTION_MODE(typeOfUpdateCash.viewPayment);
      //Set id được chọn và lấy payment theo id đó
      this.SET_TRANSACTION_ID_SELECTED(id);
      this.getPaymentById(id);
      //Mở form
      this.SET_ISSHOW_POPUP_DETAILS_PAYMENT(true);
    },
    //Xử lý khi mở form ở chế độ nhân bản
    handleClickRelica(id) {
      //Set id được chọn và lấy payment
      this.SET_TRANSACTION_ID_SELECTED(id);
      this.getPaymentById(id);
      //Chuyển trạng thái sang nhân bản
      this.SET_FORM_DETAILS_TRANSACTION_MODE(typeOfUpdateCash.replicaPayment);
      //Mở form
      this.SET_ISSHOW_POPUP_DETAILS_PAYMENT(true);
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
        //NếU list gồm 2 phần tử trở lên => cho phép thực hiện
        if (this.listIdsSelected.length > 1) {
          this.isShowBatchExecution = true;
        }
      }
    },

    //Xử lý xoá 1 row
    handleClickRemove(id) {
      //Set id được chọn
      this.SET_TRANSACTION_ID_SELECTED(id);
      //Lấy code để bind vào popup cảnh báo
      const paymentCode = this.transactions.find((payment) => {
        return payment.PaymentId == id;
      }).PaymentCode;
      //mở popup
      this.SET_ISSHOW_DIALOG_CONFIRM({
        isShow: true,
        mess: `Bạn có thực sự muốn xóa chứng từ <${paymentCode}> này không`,
      });
    },
    //Xử lý xoá hàng loạt
    handleClickDeleteMultiRecord() {
      //set list id được chọn
      this.SET_LIST_TRANSACTION_ID_SELECTED(this.listIdsSelected);
      //mở popup
      this.SET_ISSHOW_DIALOG_CONFIRM({
        isShow: true,
        mess: "Bạn có muốn xóa những chứng từ này không?",
      });
    },

    //
  },
};
</script>

<style lang="scss">
@import "../../style/views/cash/transaction.scss";
</style>
