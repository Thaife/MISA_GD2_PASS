//Create by TVThai(20/4/2022)
//import EmployeeAPI from "../../js/api/employeeApi";
import entityModified from "../../../js/entityOnModified";
const modified = {
  state: {
    //state ẩn hiện form chỉnh sửa grid
    isShowPopupModified: false,
    //đổi đượng đang được rend vào grid
    entityOnModified: entityModified.transaction,
  },
  getters: {
    isShowPopupModified: (state) => state.isShowPopupModified,
    entityOnModified: (state) => state.entityOnModified,
  },
  actions: {},
  mutations: {
    SET_ISSHOW_POPUP_MODIFIED(state, isShow) {
      state.isShowPopupModified = isShow;
    },
    SET_ENTITY_ON_MODIFIED(state, entity) {
      state.entityOnModified = entity;
    },
  },
};

export default modified;
