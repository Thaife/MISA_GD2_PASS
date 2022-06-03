//Create by TVThai(20/4/2022)
//store cho export dữ liệu ra file Excel
//import EmployeeAPI from "../../js/api/employeeApi";
import axios from "axios";

const vendorGroup = {
  state: {
    //danh sách nhóm nhà cung cấp
    vendorGroups: [],
    //các thông tin của nhóm nhà cung cấp được bind trong cbb
    vendorGroupsInfor: [
      {
        display: "Mã nhóm KH, NCC",
        name: "VendorGroupCode",
        isInputDisplay: true,
        width: "120px",
      },
      {
        display: "Tên nhóm KH, NCC",
        name: "VendorGroupName",
        isInputDisplay: false,
        width: "140px",
      },
    ],
  },
  getters: {
    vendorGroups: (state) => state.vendorGroups,
    vendorGroupsInfor: (state) => state.vendorGroupsInfor,
  },
  actions: {
    async getVendorGroups(context) {
      let respon = [
        {
          VendorGroupId: "id-01",
          VendorGroupCode: "vendorGR-01",
          VendorGroupName: "Nhóm 1",
        },
        {
          VendorGroupId: "id-02",
          VendorGroupCode: "vendorGR-02",
          VendorGroupName: "Nhóm 2",
        },
        {
          VendorGroupId: "id-03",
          VendorGroupCode: "vendorGR-01",
          VendorGroupName: "Nhóm 1",
        },
        {
          VendorGroupId: "id-04",
          VendorGroupCode: "vendorGR-02",
          VendorGroupName: "Nhóm 2",
        },
        {
          VendorGroupId: "id-05",
          VendorGroupCode: "vendorGR-01",
          VendorGroupName: "Nhóm 1",
        },
        {
          VendorGroupId: "id-06",
          VendorGroupCode: "vendorGR-02",
          VendorGroupName: "Nhóm 2",
        },
      ];
      respon = await axios.get("https://localhost:44325/api/v1/vendorGroups");
      context.commit("SET_VENDOR_GROUP", respon.data);
    },
  },
  mutations: {
    SET_VENDOR_GROUP(state, data) {
      state.vendorGroups = data;
    },
  },
};

export default vendorGroup;
