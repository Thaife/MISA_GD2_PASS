<template>
  <div class="cash__process-wrap">
    <div class="cash__process">
      <div class="cash__process-major-and-dictionary">
        <div class="cash__process__major">
          <div class="process__major__header">Nghiệp vụ tiền mặt</div>
          <div class="process__major__content">
            <div class="process__major__content__image"></div>
            <div
              class="process__major__face process__major__face-receive"
              @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
            >
              Thu tiền
            </div>
            <div
              class="process__major__face process__major__face-pay"
              @click="handleClickPay"
            >
              Chi tiền
            </div>
            <div
              class="process__major__face process__major__face-audit"
              @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
            >
              Kiểm kế quỹ
            </div>
          </div>
        </div>
        <div class="cash__process__dictionary">
          <router-link
            to="/vendor"
            class="cash__dictionary__item cash__dictionary__provider"
          >
            <div class="cash__dictionary__item__img"></div>
            <span>Nhà cung cấp</span>
          </router-link>
          <div
            class="cash__dictionary__item cash__dictionary__account"
            @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
          >
            <div class="cash__dictionary__item__img"></div>
            <span>Hệ thống tài khoản</span>
          </div>
        </div>
      </div>
      <div class="cash__process__report">
        <div class="cash__report__header">Báo cáo</div>
        <div class="cash__report__list">
          <div
            class="cash__report__list__item"
            @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
          >
            Bảng kê số dư tiền theo ngày
          </div>
          <div
            class="cash__report__list__item"
            @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
          >
            Dòng tiền
          </div>
          <div
            class="cash__report__list__item"
            @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
          >
            S03a1-DN: Sổ nhật ký thu tiền
          </div>
          <div
            class="cash__report__list__item"
            @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
          >
            Sổ kế toán chi tiết quỹ tiền mặt
          </div>
          <div
            class="cash__report__list__item"
            @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
          >
            S03a2-DN: Sổ nhật ký chi tiền
          </div>
          <div
            class="cash__report__more__all"
            @click="SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT"
          >
            Tất cả báo cáo
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopupDetailsTransaction />
</template>

<script>
import entityOnModified from "@/js/entityOnModified";
import { mapActions, mapMutations } from "vuex";
import PopupDetailsTransaction from "@/views/cash/PopupDetailsTransaction.vue";
import typeOfUpdateCash from "@/js/typeOfUpdateCash";
export default {
  name: "view-process",
  components: {
    PopupDetailsTransaction,
  },
  methods: {
    ...mapActions([
      "getVendorsCbb",
      "getAccountObjects",
      "getBankAccounts",
      "getCurrencys",
      "getEmployeesCash",
    ]),
    ...mapMutations([
      "SET_ISSHOW_POPUP_DETAILS_PAYMENT",
      "SET_ENTITY_ON_MODIFIED",
      "SET_FORM_DETAILS_TRANSACTION_MODE",
      "SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT",
    ]),
    async handleClickPay() {
      await this.getVendorsCbb();
      this.SET_FORM_DETAILS_TRANSACTION_MODE(typeOfUpdateCash.addPayment);
      this.SET_ISSHOW_POPUP_DETAILS_PAYMENT(true);
      this.SET_ENTITY_ON_MODIFIED(entityOnModified.transaction);
      this.getAccountObjects();
      this.getBankAccounts();
      this.getCurrencys();
      this.getEmployeesCash();
      this.getVendorsCbb();
    },
  },
};
</script>

<style lang="scss">
@import "../../style/views/cash/process.scss";
</style>
