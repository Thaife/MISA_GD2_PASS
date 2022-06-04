//Create by TVThai(20/4/2022)
//not use
const baseCbb = {
  state: {
    isShowListCbb: false,
    dropDownXCbb: true,
    dropDownYCbb: true,
    inforCbb: [],
    dataCbbHandle: [],
    textSearchCbb: "",
  },
  getters: {
    isShowListCbb: (state) => state.isShowListCbb,
    textSearchCbb: (state) => state.textSearchCbb,
    dropDownXCbb: (state) => state.dropDownXCbb,
    dropDownYCbb: (state) => state.dropDownYCbb,
    inforCbb: (state) => state.inforCbb,
    dataCbbHandle: (state) => state.dataCbbHandle,
  },
  actions: {},
  mutations: {
    SET_ISSHOW_LIST_CBB(state, isShowListCbb) {
      state.isShowListCbb = isShowListCbb;
    },
    SET_TEXT_SEARCH_CBB(state, text) {
      state.textSearchCbb = text;
    },
    SET_DROPDOWN_X_CBB(state, x) {
      state.dropDownXCbb = x;
    },
    SET_DROPDOWN_Y_CBB(state, y) {
      state.dropDownYCbb = y;
    },
    SET_INFOR_CBB(state, data) {
      state.inforCbb = data;
    },
    SET_DATA_CBB_HANDLE(state, data) {
      state.dataCbbHandle = data;
    },
  },
};

export default baseCbb;
