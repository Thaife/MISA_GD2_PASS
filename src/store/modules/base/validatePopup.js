const validatePopup = {
  state: {
    //Object chứa thông tin lỗi
    validates: {},
    errMessage: "",
  },
  getters: {
    validates: (state) => state.validates,
    errMessage: (state) => state.errMessage,
  },
  mutations: {
    SET_VALIDATES(state, value) {
      state.validates = { ...value };
    },
    SET_ERR_MESSAGE(state, value) {
      state.errMessage = value;
    },
  },
};

export default validatePopup;
