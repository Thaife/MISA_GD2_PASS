const baseTitle = {
  state: {
    isShowBaseTitle: false,
    baseTitleText: "This is title",
    baseTitleLeft: 0,
    baseTitleTop: 0,
    baseTitleBackgr: "#3b3c3f",
  },
  getters: {
    baseTitleText: (state) => state.baseTitleText,
    baseTitleLeft: (state) => state.baseTitleLeft,
    baseTitleTop: (state) => state.baseTitleTop,
    isShowBaseTitle: (state) => state.isShowBaseTitle,
    baseTitleBackgr: (state) => state.baseTitleBackgr,
  },
  mutations: {
    SET_IS_SHOW_BASE_TITLE(state, isShow) {
      state.isShowBaseTitle = isShow;
    },
    SET_TEXT_BASE_TITLE(state, title) {
      state.baseTitleText = title;
    },
    SET_LEFT_BASE_TITLE(state, left) {
      state.baseTitleLeft = left;
    },
    SET_TOP_BASE_TITLE(state, top) {
      state.baseTitleTop = top;
    },
    SET_BACKGR_BASE_TITLE(state, color) {
      state.baseTitleBackgr = color;
    },
  },
};

export default baseTitle;
