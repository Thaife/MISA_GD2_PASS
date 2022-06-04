//Create by TVThai(17/4/2022)
//store chung cho router view employees

import axios from "axios";
import index from "../index.js";
import EmployeeAPI from "../../js/api/employeeApi";

function formatDate(dateTime) {
  if (dateTime) {
    var date = new Date(dateTime);
    if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() < 9
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        "-" +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
      );
    }
  }
  return null;
}

const employee = {
  state: {
    //object bind với popup
    i_employee: {},
    //id employee được chọn để xoá
    employeeIdRemove: null,
    //id employee được chọn để xoá
    employeeIdUpdate: null,
    employeeIdRelica: null,
    //mã mới tự sinh theo quy tắc NV-n+1
    newCode: "",
    //mảng employees lấy render vào table
    test__employees: [],
    //các lựa chọn paging

    //list Id tick chọn
    listIdsSelected: [],

    //biến kiểm tra tick chọn hết
    selectAll: false,
  },
  getters: {
    i_employee: (state) => state.i_employee,
    employeeIdRemove: (state) => state.employeeIdRemove,
    employeeIdUpdate: (state) => state.employeeIdUpdate,
    employeeIdRelica: (state) => state.employeeIdRelica,
    employees: (state) => state.employees,
    newCode: (state) => state.newCode,
    employee: (state) => state.employee,
    textSearch: (state) => state.textSearch,
    listIdsSelected: (state) => state.listIdsSelected,
    selectAll: (state) => state.selectAll,
  },
  actions: {
    //lấy giáo viên theo id
    async getEmployeeById(context, id) {
      try {
        let dataRespon;
        dataRespon = await axios
          .get(`${EmployeeAPI.get}/${id}`)
          .then((response) => {
            return response.data;
          })
          .catch((err) => {
            console.log(err);
          });

        if (dataRespon) {
          context.commit("SET_EMPLOYEE", dataRespon);
          context.commit("SET_UNIT_SELECTED", {
            UnitId: dataRespon.UnitId,
            UnitName: dataRespon.UnitName,
          });
          if (context.getters.modeStore == 2) {
            context.commit("SET_EMPLOYEE_CHECK_CHANGED", dataRespon);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    //lấy giáo viên có paging
    async getEmployees(context) {
      index.commit("SET_ISLOADING", true);
      try {
        let dataRespon;
        dataRespon = await axios
          .get(
            `${EmployeeAPI.getPaging}?PageSize=${context.state.pageSize}&PageNumber=${context.state.currentPage}&TextSearch=${context.state.textSearch}`
          )
          .then((response) => {
            return response.data;
          })
          .catch((err) => {
            console.log(err);
          });

        if (dataRespon) {
          context.commit("SET_EMPLOYEES", dataRespon.employees);
          context.commit("SET_CURRENT_PAGE", dataRespon.pageNumber);
          context.commit("SET_PAGE_SIZE", dataRespon.pageSize);
          context.commit("SET_TOTAL_RECORD", dataRespon.total);

          //reset lại các dòng đang được tick chọn
          context.commit("SET_SELECT_ALL_ROW", false);
          context.commit("SET_LIST_ID_SELECTED", []);
        }
      } catch (error) {
        console.log(error);
      }
      index.commit("SET_ISLOADING", false);
    },

    //thêm nhân viên
    async addEmployee(context, employee) {
      let method = "post";
      let api;
      if (context.getters.modeStore == 1) {
        api = `${EmployeeAPI.post}`;
      } else {
        method = "put";
        api = `${EmployeeAPI.put}/${context.getters.employeeIdUpdate}`;
      }
      try {
        let dataRespon = await axios[method](api, employee)
          .then((response) => {
            //chuyển về trang đầu tiên
            context.commit("SET_CURRENT_PAGE", 1);
            context.dispatch("getEmployees");
            //tắt popup chi tiết nhân viên
            context.commit("SET_ISSHOW_POPUP_DETAILS", false);
            //reset giá trị của phòng ban
            context.commit("SET_UNIT_SELECTED", null);

            if (context.getters.modeStore == 2) {
              index.commit(
                "SET_TOAST_MESS",
                "Bạn đã sửa nhân viên thành công !"
              );
              context.commit("SET_EMPLOYEEID_UPDATE", null);
              context.commit("SET_MODE_STORE", 1);
            } else {
              index.commit(
                "SET_TOAST_MESS",
                "Bạn đã thêm nhân viên thành công !"
              );
            }
            index.commit("SET_TOAST_ISSHOW", true);

            return response.data;
          })
          .catch((err) => {
            //lấy lỗi đầu tiên => hiển thị lên popup
            if (err.response.status == 400) {
              let objectValidate = {};
              const field = err.response.data.ex.errlst[0].field;
              const mess = err.response.data.ex.errlst[0].mess;
              objectValidate[field] = true;
              objectValidate[`${field}Title`] = mess;

              //set các thông tin validate và error vào dialog
              index.commit("SET_VALIDATES", objectValidate);
              index.commit("SET_ERR_MESSAGE", mess);
              //hiện dialog thông báo lỗi
              index.commit("SET_ISSHOW_DIALOG_NOTIFI", {
                isShow: true,
                mess: mess,
              });
            } else {
              if (context.getters.modeStore == 2) {
                index.commit("SET_TOAST_MESS", "Sửa nhân viên thất bại !");
                context.commit("SET_EMPLOYEEID_UPDATE", null);
                context.commit("SET_MODE_STORE", 1);
              } else {
                index.commit("SET_TOAST_MESS", "Thêm nhân viên thất bại !");
              }
              index.commit("SET_TOAST_ISSHOW", true);
            }
            console.log(err);
          });
        console.log(dataRespon);
      } catch (error) {
        console.log(error);
      }
    },
    async addEmployeeAndGet(context, employee) {
      let method = "post";
      let api;
      if (context.getters.modeStore == 1) {
        api = `${EmployeeAPI.post}`;
      } else {
        method = "put";
        api = `${EmployeeAPI.put}/${context.getters.employeeIdUpdate}`;
      }
      try {
        let dataRespon = await axios[method](api, employee)
          .then((response) => {
            //chuyển về trang đầu tiên
            context.commit("SET_CURRENT_PAGE", 1);
            //get list employee để render lại vào table
            context.dispatch("getEmployees");
            //reset lại form để người dùng thêm mới
            context.commit("SET_EMPLOYEE", {});
            //tự động sinh mã nhân viên mới
            context.dispatch("getNewCode");
            //reset giá trị của phòng ban
            context.commit("SET_UNIT_SELECTED", null);

            if (context.getters.modeStore == 2) {
              context.commit("SET_EMPLOYEEID_UPDATE", null);
              context.commit("SET_MODE_STORE", 1);
              index.commit(
                "SET_TOAST_MESS",
                "Bạn đã sửa nhân viên thành công !"
              );
            } else {
              index.commit(
                "SET_TOAST_MESS",
                "Bạn đã thêm nhân viên thành công !"
              );
            }

            index.commit("SET_TOAST_ISSHOW", true);
            return response.data;
          })
          .catch((err) => {
            //lấy lỗi đầu tiên => hiển thị lên popup
            if (err.response.status == 400) {
              let objectValidate = {};
              const field = err.response.data.ex.errlst[0].field;
              const mess = err.response.data.ex.errlst[0].mess;
              objectValidate[field] = true;
              objectValidate[`${field}Title`] = mess;

              //set các thông tin validate và error vào dialog
              index.commit("SET_VALIDATES", objectValidate);
              index.commit("SET_ERR_MESSAGE", mess);
              //hiện dialog thông báo lỗi
              index.commit("SET_ISSHOW_DIALOG_NOTIFI", {
                isShow: true,
                mess: mess,
              });
            } else {
              if (context.getters.modeStore == 2) {
                index.commit(
                  "SET_TOAST_MESS",
                  "Bạn đã sửa nhân viên thành công !"
                );
              } else {
                index.commit(
                  "SET_TOAST_MESS",
                  "Bạn đã thêm nhân viên thành công !"
                );
              }
              index.commit("SET_TOAST_ISSHOW", true);
            }
          });
        //context.commit("ADD_EMPLOYEE", dataRespon);
        console.log(dataRespon);
      } catch (error) {
        console.log(error);
      }
    },

    //xoá 1 nhân viên theo id
    async deleteEmployee(context, id) {
      try {
        let dataRespon = await axios
          .delete(`${EmployeeAPI.delete}/${id}`)
          .then((response) => {
            index.commit("SET_TOAST_STATUS", true);
            index.commit("SET_TOAST_MESS", "Xoá nhân viên thành công !");
            context.commit("SET_ISSHOW_DIALOG_CONFIRM", false);
            index.commit("SET_TOAST_ISSHOW", true);
            context.dispatch("getEmployees");
            return response;
          })
          .catch((err) => {
            index.commit("SET_TOAST_STATUS", false);
            index.commit("SET_TOAST_MESS", "Xoá nhân viên thất bại !");
            index.commit("SET_TOAST_ISSHOW", true);
            console.log(err);
          });
        //context.commit("ADD_EMPLOYEE", dataRespon);
        console.log(dataRespon);
      } catch (error) {
        console.log(error);
      }
    },

    //xoá nhiều nhân viên thoe listIds
    async deleteMultiEmployee(context, listId) {
      try {
        let dataRespon = await axios
          .put(`${EmployeeAPI.deleteMulti}`, listId)
          .then((response) => {
            index.commit("SET_TOAST_MESS", "Xoá nhân viên thành công !");
            context.commit("SET_ISSHOW_DIALOG_CONFIRM", false);
            context.dispatch("getEmployees");
            index.commit("SET_TOAST_ISSHOW", true);
            return response;
          })
          .catch((err) => {
            index.commit("SET_TOAST_STATUS", false);
            index.commit("SET_TOAST_MESS", "Xoá nhân viên thất bại !");
            context.commit("SET_ISSHOW_DIALOG_CONFIRM", false);
            index.commit("SET_TOAST_ISSHOW", true);
            console.log(err);
          });
        console.log(dataRespon);
      } catch (error) {
        console.log(error);
      }
    },

    //Lấy mã nhân viên mới
    async getNewCode({ commit }) {
      try {
        const employeeCode = await axios
          .get(`${EmployeeAPI.getNewCode}`)
          .then((respon) => {
            return respon.data;
          })
          .catch((err) => {
            console.log(err);
          });

        commit("SET_NEW_CODE", employeeCode);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_EMPLOYEE(state, employee) {
      state.i_employee = {
        ...employee,
        DateOfBirth: formatDate(employee.DateOfBirth),
        DateOfIdentityCard: formatDate(employee.DateOfIdentityCard),
      };
    },
    SET_EMPLOYEE_REPLICA(state, id) {
      state.employeeIdRelica = id;
    },
    SET_EMPLOYEEID_REMOVE(state, id) {
      state.employeeIdRemove = id;
    },
    SET_EMPLOYEEID_UPDATE(state, id) {
      state.employeeIdUpdate = id;
    },
    SET_EMPLOYEES(state, dataRespon) {
      state.employees = dataRespon;
    },
    SET_NEW_CODE(state, dateRespon) {
      state.newCode = dateRespon;
    },
    SET_TEXT_SEARCH(state, value) {
      state.textSearch = value;
    },
    SET_SELECT_ALL_ROW(state, value) {
      state.selectAll = value;
    },
    SET_LIST_ID_SELECTED(state, value) {
      state.listIdsSelected = value;
    },
  },
};

export default employee;
