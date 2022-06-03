<template>
  <div
    class="a-toast-mess"
    :class="{ fail: !toastStatus }"
    v-show="isShowToast"
  >
    <div class="toast-icon"></div>
    <div class="toast-content">
      <span class="status">{{ toastMess }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "BaseToastMess",
  components: {},
  watch: {
    isShowToast: function (value) {
      //Ẩn toast mess sau 1.5s hiện lên
      if (value) {
        setTimeout(() => {
          this.SET_TOAST_ISSHOW(false);
        }, 1500);
      }
    },
  },
  computed: {
    //Format trạng thái từ bit => Y N
    ...mapGetters(["isShowToast", "toastMess", "toastStatus"]),
  },
  methods: {
    ...mapMutations(["SET_TOAST_ISSHOW"]),
  },
};
</script>

<style lang="scss">
@import url("../../style/base/BaseToastMess.scss");

.a-toast-mess {
  min-height: 65px;
  box-shadow: 0 2px 4px rgb(190, 190, 190);
  min-width: 300px;
  max-width: 340px;
  border: 1px solid #ccc;
  display: flex;
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: white;
  z-index: 9999;
}

.toast-icon {
  background: url("../../assets/Resource/img/Sprites.64af8f61.svg") no-repeat -990px -462px;
  width: 36px;
  height: 36px;
  margin-right: 20px;
}

.a-toast-mess.fail {
  & .toast-icon {
    background: url("../../assets/Resource/img/Sprites.64af8f61.svg") no-repeat -752px -462px;
    width: 36px;
    height: 36px;
  }
}

.a-toast-mess.fail .toast-icon {
}

.toast-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.toast-content .status {
  font-size: 14px;
  margin-bottom: 4px;
}

.toast-content span {
  font-size: 12px;
}
</style>
