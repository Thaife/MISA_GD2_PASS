<template>
  <div class="container">
    <TheHeader />
    <router-view></router-view>
    <PopupDetailsTransaction />
    <Loading />
    <DialogNotify />
    <DialogError />
    <DialogQuestion />
    <DialogConfirm />
    <BaseToastMess />
  </div>
</template>

<script>
import Loading from "../../views/Loading.vue";
import PopupDetailsTransaction from "@/views/cash/PopupDetailsTransaction.vue";
import DialogNotify from "../../views/DialogNotification.vue";
import DialogQuestion from "../../views/DialogQuestion.vue";
import DialogError from "../../views/DialogError.vue";
import DialogConfirm from "../../views/DialogConfirm.vue";
import BaseToastMess from "../base/BaseToastMess.vue";
import TheHeader from "./TheHeader.vue";
export default {
  name: "c-container",
  components: {
    TheHeader,
    PopupDetailsTransaction,
    Loading,
    DialogNotify,
    DialogQuestion,
    DialogError,
    DialogConfirm,
    BaseToastMess,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../../style/layout/container.scss";
</style>
