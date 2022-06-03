//Create by TVThai(20/4/2022)
//store cho export dữ liệu ra file Excel
import EmployeeAPI from "../../js/api/employeeApi";

const exportExC = {
  state: {
    //url để export
    linkExport: `${EmployeeAPI.exportExcel}`,
  },
  getters: {
    linkExport: (state) => state.linkExport,
  },
  actions: {},
};

export default exportExC;
