//Create by TVThai(20/4/2022)
//store cho nhân viên
//import EmployeeAPI from "../../js/api/employeeApi";

import axios from "axios";

const employeeCash = {
  state: {
    //danh sách nhân viên
    employeesCash: [],
    //các thông tin của nhân viên được bind vào cbb
    employeesInfor: [
      {
        display: "Mã nhân viên",
        name: "EmployeeCode",
        isInputDisplay: false,
        width: "100px",
      },
      {
        display: "Tên nhân viên",
        name: "EmployeeFullName",
        isInputDisplay: true,
        width: "140px",
      },
      {
        display: "Đơn vị",
        name: "EmployeePosition",
        isInputDisplay: false,
        width: "100px",
      },
      {
        display: "ĐT di động",
        name: "EmployeePhoneNumber",
        isInputDisplay: false,
        width: "100px",
      },
    ],
    valueEmployeeCbb: null,
  },
  getters: {
    employeesCash: (state) => state.employeesCash,
    employeesInfor: (state) => state.employeesInfor,
    valueEmployeeCbb: (state) => state.valueEmployeeCbb,
  },
  actions: {
    async getEmployeesCash(context) {
      let respon = [
        {
          EmployeeId: "id-01",
          EmployeeCode: "MS-113",
          EmployeeFullName: "Trần Văn Thái",
          EmployeePosition: "Trưởng phòng kinh doanh",
          PhoneNumber: "0522474677",
          Address: "Hà Nội",
          TaxNumber: "123456",
        },
        {
          EmployeeId: "id-02",
          EmployeeCode: "MS-114",
          EmployeeFullName: "Mao Trạch Đông",
          EmployeePosition: "Trưởng phòng tài chính",
          Address: "Tàu khựa",
          TaxNumber: "234789",
          PhoneNumber: "0522474677",
        },
        {
          EmployeeId: "id-03",
          EmployeeCode: "MS-115",
          EmployeeFullName: "Nguyễn Trọng Tuấn",
          EmployeePosition: "Trưởng phòng đào tạo",
          Address: "Hà Nội",
          TaxNumber: "654236",
          PhoneNumber: "0522474677",
        },
      ];
      respon = await axios.get("https://localhost:44325/api/v1/employees");
      context.commit("SET_EMPLOYEES_CASH", respon.data);
    },
  },
  mutations: {
    SET_EMPLOYEES_CASH(state, data) {
      state.employeesCash = data;
    },
    SET_VALUE_EMPLOYEE_CBB(state, value) {
      state.valueEmployeeCbb = value;
    },
  },
};

export default employeeCash;
