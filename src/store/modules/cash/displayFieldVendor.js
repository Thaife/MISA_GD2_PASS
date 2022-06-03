//Create by TVThai(20/4/2022)
import axios from "axios";
const vendor = {
  state: {
    //Danh sách thông tin của từng cột của nhà cung cấp trong table hiển thị trong màn grid(ẩn hiện, kích thước, tên hiển thị, fix ?)
    displayFieldVendors: [],
  },
  getters: {
    displayFieldVendors: (state) => state.displayFieldVendors,
  },
  actions: {
    async getDisplayFieldVendors(context) {
      try {
        let respon = await axios.get(
          "https://localhost:44325/api/v1/vendors/table/infor"
        );
        context.commit("SET_DISPLAY_FIELD_VENDORS", respon.data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateDisplayFieldVendor(context, infor) {
      var body = { data: JSON.stringify(infor) };
      try {
        await axios.put(
          "https://localhost:44325/api/v1/vendors/table/infor",
          body
        );
        context.dispatch("getDisplayFieldVendors");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_DISPLAY_FIELD_VENDORS(state, data) {
      state.displayFieldVendors = data;
    },
  },
};

export default vendor;
