//Create by TVThai(18/4/2022)
//store cho các dialog
const toastMess = {
  state: {
    //Dialog thông báo
    isShowToast: false,
    toastMess: "content",
    toastStatus: true,
  },
  getters: {
    isShowToast: (state) => state.isShowToast,
    toastMess: (state) => state.toastMess,
    toastStatus: (state) => state.toastStatus,
  },
  mutations: {
    SET_TOAST_ISSHOW(state, value) {
      state.isShowToast = value;
    },
    SET_TOAST_MESS(state, value) {
      state.toastMess = value;
    },
    SET_TOAST_STATUS(state, value) {
      state.toastStatus = value;
    },
  },
};

export default toastMess;
