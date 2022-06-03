<template>
  <div class="view-dialog-wrap" v-show="isShowDialogErr">
    <div class="view-dialog view-dialog-err">
      <div class="dialog__container">
        <div class="up">
          <div class="icon">
            <div></div>
          </div>
          <div class="content">{{ messageDialogErr }}</div>
        </div>
        <div class="down">
          <div @click="SET_ISSHOW_DIALOG_ERR({ isShow: false })">
            <BaseButton
              ref="btn"
              text="Đóng"
              height="36px"
              :mainType="true"
              @keydown="handleKeyDown"
              :isFocus="isFocus"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseButton from "../components/base/BaseButton.vue";
export default {
  name: "dialog-err",
  components: {
    BaseButton,
  },
  props: ["text"],
  data() {
    return {
      isShow: true,
      isFocus: false,
    };
  },
  computed: {
    ...mapGetters(["isShowDialogErr", "messageDialogErr"]),
  },
  watch: {
    //Create by TVThai(25/4/2022)
    //khi hiển thị, focus vào btn
    isShowDialogErr(value) {
      console.log(value);
      this.isFocus = true;
    },
  },
  methods: {
    ...mapMutations(["SET_ISSHOW_DIALOG_ERR"]),
    //sự kiện được bind sang combonent con
    handleKeyDown() {
      this.SET_ISSHOW_DIALOG_ERR({ isShow: false });
    },
  },
};
</script>

<style lang="scss">
@import "../style/views/dialog.scss";
</style>
