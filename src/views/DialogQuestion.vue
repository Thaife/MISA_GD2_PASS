<template>
  <div class="view-dialog-wrap" v-show="isShowDialogQuestion">
    <div class="view-dialog view-dialog-question">
      <div class="dialog__container">
        <div class="up">
          <div class="icon">
            <div></div>
          </div>
          <div class="content">{{ messageDialogQuestion }}</div>
        </div>
        <div class="down">
          <div @click="SET_ISSHOW_DIALOG_QUESTION({ isShow: false })">
            <BaseButton
              text="Huỷ"
              height="36px"
              @handleKeyDown="handleKeyDownCancel"
              ref="btnCancel"
            />
          </div>
          <div class="right">
            <div class="btn-1" @click="handleNotCF">
              <BaseButton
                text="Không"
                height="36px"
                @handleKeyDown="handleNotCF"
              />
            </div>
            <div class="btn-2" @click="handleCF">
              <BaseButton
                text="Có"
                height="36px"
                :mainType="true"
                @handleKeyDown="handleCF"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButton from "../components/base/BaseButton.vue";
import DialogError from "../js/dialog/dialogError";

import typeOfUpdateCash from "../js/typeOfUpdateCash";
import ettOnModified from "../js/entityOnModified";
export default {
  name: "dialog-question",
  components: {
    BaseButton,
  },
  props: ["text"],
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    ...mapGetters([
      "isShowDialogQuestion",
      "formDetailsVendorMode",
      "vendorIdSelected",
      "messageDialogQuestion",
      "entityOnModified",
      "vendor",
      "i_paymentTransaction",
      "errMessage",
    ]),
  },
  watch: {
    isShowDialogQuestion(value) {
      if (value) {
        this.$refs.btnCancel.$el.focus();
      }
    },
  },
  methods: {
    ...mapMutations([
      "SET_ISSHOW_POPUP_DETAILS_PAYMENT",
      "SET_ISSHOW_POPUP_DETAILS_VENDOR",
      "SET_ISSHOW_DIALOG_QUESTION",
      "SET_ISSHOW_DIALOG_ERR",
      "SET_VALIDATES",
      "SET_ERR_MESSAGE",
    ]),
    ...mapActions(["addPayment", "addVendor", "updateVendor"]),
    validateVendor(vendor) {
      let isValidate = true;
      let valids = {};
      if (!vendor.VendorCode) {
        valids = {
          ...valids,
          VendorCode: true,
          VendorCodeTitle: DialogError.emptyCode,
        };
        // this.validates.vendorCode = true;
        // this.validates.vendorCodeTitle = "Mã nhân viên không được để trống.";
        if (isValidate) {
          this.SET_ERR_MESSAGE("Mã nhà cung cấp không được để trống");
        }
        isValidate = false;
      } else {
        const regex = /^((\bNCC-))\d[0-9]+$/;
        if (!regex.test(vendor.VendorCode)) {
          valids = {
            ...valids,
            VendorCode: true,
            VendorCodeTitle: DialogError.formatCode,
          };
          // this.validates.vendorCode = true;
          // this.validates.vendorCodeTitle = "Mã nhân viên không được để trống.";
          if (isValidate) {
            this.SET_ERR_MESSAGE(DialogError.vendorCode);
          }
          isValidate = false;
        }
      }
      //Kiểm tra tên không được trống và phải đúng định dạng
      if (!vendor.VendorFullName) {
        // this.validates.FullName = true;
        // this.validates.FullNameTitle = "Họ tên không được để trống.";
        valids = {
          ...valids,
          VendorFullName: true,
          VendorFullNameTile: DialogError.emptyName,
        };
        if (isValidate) {
          this.SET_ERR_MESSAGE(DialogError.vendorName);
        }
        isValidate = false;
      }
      //Kiểm tra ngày nghỉ việc có lớn hơn ngày hiện tại k
      if (vendor.DateOfIssue) {
        var DateOfIssue = new Date(vendor.DateOfIssue);
        if (DateOfIssue > new Date()) {
          // this.validates.DateOfBirth = true;
          // this.validates.DateOfBirthTitle =
          //   "Ngày sinh được lớn hơn ngày hiện tại.";
          valids = {
            ...valids,
            DateOfIssue: true,
            DateOfIssueTitle: DialogError.dateOfBirth,
          };
          if (isValidate) {
            this.SET_ERR_MESSAGE(DialogError.dateOfBirth);
          }
          isValidate = false;
        }
      }
      //Kiểm tra số điện thoại đúng định dạng của VietNam k
      if (vendor.VendorPhoneNumber) {
        const phoneNbRegex = /(84|0[3|5|7|8|9])+([0-9]{8})/;
        if (!phoneNbRegex.test(vendor.VendorPhoneNumber)) {
          // this.validates.Phone = true;
          // this.validates.PhoneTitle = "Số điện thoại sai định dạng.";
          valids = {
            ...valids,
            VendorPhoneNumber: true,
            VendorPhoneNumberTile: DialogError.formatPhoneNumber,
          };
          if (isValidate) {
            this.SET_ERR_MESSAGE(DialogError.formatPhoneNumber);
          }
          isValidate = false;
        }
      }
      //Kiểm tra Email đúng định dạng k
      if (vendor.ContactEmail) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!emailRegex.test(vendor.ContactEmail)) {
          // this.validates.Email = true;
          // this.validates.EmailTitle = "Email sai định dạng.";
          valids = {
            ...valids,
            ContactEmail: true,
            ContactEmailTitle: DialogError.formatMail,
          };
          if (isValidate) {
            this.SET_ERR_MESSAGE(DialogError.formatMail);
          }
          isValidate = false;
        }
      }
      this.SET_VALIDATES(valids);
      //Trả về true nếu validate thành công
      return isValidate;
    },
    validatePayment(payment) {
      let isValidate = true;
      let valids = {};
      if (!payment.PaymentCode) {
        valids = {
          ...valids,
          PaymentCode: true,
          PaymentCodeTitle: "Mã phiếu chi không được phép để trống.",
        };
        // this.validates.vendorCode = true;
        // this.validates.vendorCodeTitle = "Mã nhân viên không được để trống.";
        if (isValidate) {
          this.SET_ERR_MESSAGE("Mã phiếu chi không được phép để trống.");
        }
        isValidate = false;
      } else {
        const regex = /^((\bPC-))\d[0-9]+$/;
        if (!regex.test(payment.PaymentCode)) {
          valids = {
            ...valids,
            PaymentCode: true,
            PaymentCodeTitle: "Số phiếu chi không hợp lệ",
          };
          // this.validates.vendorCode = true;
          // this.validates.vendorCodeTitle = "Mã nhân viên không được để trống.";
          if (isValidate) {
            this.SET_ERR_MESSAGE("Số phiếu chi không hợp lệ");
          }
          isValidate = false;
        }
      }
      this.SET_VALIDATES(valids);
      //Trả về true nếu validate thành công
      return isValidate;
    },
    //Create by TVThai(25/4/2022)
    //đóng dialog
    handleKeyDownCancel() {
      this.SET_ISSHOW_DIALOG_QUESTION({ isShow: false });
    },
    //đóng dialog và form
    handleNotCF() {
      this.SET_ISSHOW_DIALOG_QUESTION({ isShow: false });
      this.SET_ISSHOW_POPUP_DETAILS_PAYMENT(false);
      this.SET_ISSHOW_POPUP_DETAILS_VENDOR(false);
    },
    //sự kiện click đồng ý
    handleCF() {
      this.SET_ISSHOW_DIALOG_QUESTION({ isShow: false });
      //kiểm tra dữ liệu, nếu hợp lệ => add employee
      let valid = true;
      console.log(this.entityOnModified);
      console.log(ettOnModified.vendor);
      if (this.entityOnModified == ettOnModified.vendor) {
        console.log("vendor");
        valid = this.validateVendor(this.vendor);
      } else {
        console.log("payment");
        valid = this.validatePayment(this.i_paymentTransaction);
      }
      if (!valid) {
        this.SET_ISSHOW_DIALOG_ERR({ isShow: "true", mess: this.errMessage });
      } else {
        if (this.entityOnModified == ettOnModified.vendor) {
          if (typeOfUpdateCash.addVendor == this.formDetailsVendorMode) {
            console.log(this.vendor);
            this.addVendor(this.vendor);
          } else {
            this.updateVendor({ body: this.vendor, id: this.vendorIdSelected });
          }
        } else {
          this.addPayment(this.i_paymentTransaction);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../style/views/dialog.scss";
</style>
