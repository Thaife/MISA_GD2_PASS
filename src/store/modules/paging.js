const paging = {
  state: {
    selectRecordInPage: [
      { text: "10 bản ghi trên 1 trang", value: 10 },
      { text: "20 bản ghi trên 1 trang", value: 20 },
      { text: "50 bản ghi trên 1 trang", value: 50 },
      { text: "100 bản ghi trên 1 trang", value: 100 },
    ],
    totalRecord: 200,
    pageSize: 20,
    //page đang được focus
    currentPage: 1,

    textSearch: "",
  },
  getters: {
    selectRecordInPage: (state) => state.selectRecordInPage,
    totalRecord: (state) => state.totalRecord,
    pageSize: (state) => state.pageSize,
    totalPage: (state) => {
      return Math.ceil(state.totalRecord / state.pageSize);
    },
    currentPage: (state) => state.currentPage,
  },
  actions: {},
  mutations: {
    SET_CURRENT_PAGE(state, currentPage) {
      state.currentPage = currentPage;
    },
    SET_PAGE_SIZE(state, pageSize) {
      state.pageSize = pageSize;
    },
    SET_TOTAL_RECORD(state, total) {
      state.totalRecord = total;
    },
    SET_TEXT_SEARCH(state, text) {
      state.textSearch = text;
    },
  },
};

export default paging;
