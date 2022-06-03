<template>
  <div class="cash__container">
    <div class="cash__container__tabs">
      <router-link to="/cash/process" class="cash__tabs__item"
        >Quy trình</router-link
      >
      <router-link to="/cash/transaction" class="cash__tabs__item"
        >Thu, chi tiền</router-link
      >
    </div>
    <router-view />

    <transition>
      <div class="m-popover" id="basePopover" v-show="false">
        <div class="popover-list" @click="handleClickRemove">Xóa</div>
        <div class="popover-list" @click="handleClickReplication">Nhân bản</div>
        <div class="popover-list">Ngừng</div>
      </div>
    </transition>

    <!-- <Popup-Details />
    <DialogNotify />
    <DialogError />
    <DialogQues />
    <DialogCfirm />
    <BaseToastMess /> -->
    <!-- <PopOver /> -->
  </div>
</template>

<script>
// import BaseButton from "../components/base/BaseButton.vue";
// import DialogNotify from "./DialogNotification.vue";
// import DialogError from "./DialogError.vue";
// import DialogQues from "./DialogQuestion.vue";
// import DialogCfirm from "./DialogConfirm.vue";
// import PopupDetails from "./PopupDetails.vue";
// import BaseToastMess from "../components/base/BaseToastMess";
// import DialogConfirm from "../js/dialog/dialogConfirm";
//import PopOver from "./popOver.vue";

export default {
  components: {
    // BaseButton,
    // PopupDetails,
    // DialogError,
    // DialogNotify,
    // DialogQues,
    // DialogCfirm,
    // BaseToastMess,
    //PopOver,
  },
  name: "view-employee",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../../style/views/cash/cash.scss";
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.m-popover {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #babec5;
  border-radius: 2px;
  list-style: none;
  font-size: 12px;
  padding: 0;
  margin: 0;
  padding-top: 2px;
  padding-bottom: 2px;
}

.m-popover > div {
  margin: 0;
  height: 28px;
  width: 120px;
  display: flex;
  align-items: center;
  text-align: start;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    color: #35bf22;
    background-color: #ebedf0;
  }
}
</style>
