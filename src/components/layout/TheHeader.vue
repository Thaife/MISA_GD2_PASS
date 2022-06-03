<template>
  <div class="employ__container__header">
    <div class="left">
      <div class="more"></div>
      <div class="select__company">
        <span>Công ty cổ phần Misa</span>
        <div class="select__company__icon"></div>
      </div>
      <div class="select__dtb">DC-01</div>
    </div>
    <div class="right">
      <div class="down__excel">
        <div class="down__excel__icon"></div>
      </div>
      <div class="header__input__wrap">
        <BaseInput
          type="text"
          width="200px"
          height="32px"
          placeholder="Nhập từ khoá để tìm kiếm"
          :search="true"
          v-model="textSearch"
          @handleSearch="handleSearch"
        />
      </div>

      <div class="header__tool__icon__wrap">
        <div class="header__tool__icon tool__more"></div>
      </div>
      <div class="header__tool__icon__wrap">
        <div class="header__tool__icon tool__setting"></div>
      </div>
      <div class="header__tool__icon__wrap">
        <div class="header__tool__icon tool__chat"></div>
      </div>
      <div class="header__tool__icon__wrap ticker__new">
        <div class="ticker__new__tag">Mới</div>
        <div class="header__tool__icon tool__help"></div>
      </div>
      <div class="header__tool__icon__wrap">
        <div class="header__tool__icon tool__bell"></div>
      </div>
      <div class="avt"></div>
      <div class="user">
        <div class="name">Trần Văn Thái</div>
        <div class="icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "../base/BaseInput.vue";
export default {
  components: { BaseInput },
  data() {
    return {
      textSearch: "",
    };
  },
  methods: {
    handleSearch() {},
  },
};
</script>

<style lang="scss">
@import "../../style/layout/header.scss";
</style>
