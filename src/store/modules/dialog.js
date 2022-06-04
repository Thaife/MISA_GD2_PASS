//Create by TVThai(18/4/2022)
//store cho các dialog
const dialog = {
  state: {
    //Dialog thông báo
    isShowDialogNotify: false,
    messageDialogNotifi: "content",
    //Dialog báo lỗi
    isShowDialogErr: false,
    messageDialogErr: "content",
    //Dialog yêu cầu xác nhận xoá
    isShowDialogConfirm: false,
    messageDialogConfirm: "content",
    //Dialog khi dữ liệU thay đổi form
    isShowDialogQuestion: false,
    messageDialogQuestion: "content",
  },
  getters: {
    isShowDialogNotify: (state) => state.isShowDialogNotify,
    messageDialogNotifi: (state) => state.messageDialogNotifi,
    isShowDialogErr: (state) => state.isShowDialogErr,
    messageDialogErr: (state) => state.messageDialogErr,
    isShowDialogConfirm: (state) => state.isShowDialogConfirm,
    messageDialogConfirm: (state) => state.messageDialogConfirm,
    isShowDialogQuestion: (state) => state.isShowDialogQuestion,
    messageDialogQuestion: (state) => state.messageDialogQuestion,
  },
  mutations: {
    //set thông tin dialog thông báo
    SET_ISSHOW_DIALOG_NOTIFI(state, value) {
      state.isShowDialogNotify = value.isShow;
      state.messageDialogNotifi = value.mess;
    },
    //set thông tin dialog thông báo
    SET_ISSHOW_DIALOG_NOTIFI_DEVELOPMENT(state) {
      state.isShowDialogNotify = true;
      state.messageDialogNotifi =
        "Tính năng đang phát triển. Vui lòng thử lại sau.";
    },
    //set thông tin dialog lỗi
    SET_ISSHOW_DIALOG_ERR(state, value) {
      state.isShowDialogErr = value.isShow;
      state.messageDialogErr = value.mess;
    },
    //set thông tin dialog xác nhận
    SET_ISSHOW_DIALOG_CONFIRM(state, value) {
      state.isShowDialogConfirm = value.isShow;
      state.messageDialogConfirm = value.mess;
    },
    //set thông tin dialog question
    SET_ISSHOW_DIALOG_QUESTION(state, value) {
      state.isShowDialogQuestion = value.isShow;
      state.messageDialogQuestion = value.mess;
    },
  },
};

export default dialog;
