<template>
  <div class="view-dialog-wrap" v-show="isShowDialogConfirm">
    <div class="view-dialog view-dialog-confirm">
      <div class="dialog__container">
        <div class="up">
          <div class="icon">
            <div></div>
          </div>
          <div class="content">{{ messageDialogConfirm }}</div>
        </div>
        <div class="down">
          <div @click="SET_ISSHOW_DIALOG_CONFIRM({ isShow: false })">
            <BaseButton text="Không" height="36px" />
          </div>
          <div @click="handleRemoveEmployee">
            <BaseButton text="Có" height="36px" :mainType="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButton from "../components/base/BaseButton.vue";
export default {
  name: "dialog-err",
  components: {
    BaseButton,
  },
  props: ["text"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "isShowDialogConfirm",
      "messageDialogConfirm",
      "vendorIdSelected",
      "listVendorIdSelected",
      "transactionIdSelected",
      "listTransactionIdSelected",
      "entityOnModified",
    ]),
  },
  watch: {
    //Create by TVThai(25/4/2022)
    //reset lại id để xoá về null khi đóng dialog
    isShowDialogConfirm(value) {
      if (!value) {
        this.SET_LIST_VENDOR_ID_SELECTED([]);
      }
    },
  },
  methods: {
    ...mapMutations([
      "SET_ISSHOW_DIALOG_CONFIRM",
      "SET_LIST_VENDOR_ID_SELECTED",
      "SET_LIST_TRANSACTION_ID_SELECTED",
      "SET_LIST__ID_SELECTED",
    ]),
    ...mapActions([
      "deleteVendor",
      "deleteMultiVendor",
      "deletePayment",
      "deleteMultiPayment",
    ]),
    handleRemoveEmployee() {
      //Kiểm tra đang ở trạng thái xoá nhiều hay xoá 1
      if (this.entityOnModified == this.entityModified.vendor) {
        if (this.listVendorIdSelected.length > 1) {
          this.deleteMultiVendor(this.listVendorIdSelected);
        } else {
          this.deleteVendor(this.vendorIdSelected);
        }
      } else if (this.entityOnModified == this.entityModified.transaction) {
        if (this.listTransactionIdSelected.length > 1) {
          this.deleteMultiPayment(this.listTransactionIdSelected);
        } else {
          this.deletePayment(this.transactionIdSelected);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../style/views/dialog.scss";
</style>
