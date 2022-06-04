//Create by TVThai(20/4/2022)
import axios from "axios";
const transaction = {
  state: {
    //Danh sách thông tin của từng cột của phiếu chi trong table hiển thị trong màn grid(ẩn hiện, kích thước, tên hiển thị, fix ?)
    displayFieldTransaction: [],
  },
  getters: {
    displayFieldTransaction: (state) => state.displayFieldTransaction,
  },
  actions: {
    async getDisplayFieldTransaction(context) {
      try {
        const respon = await axios.get(
          "https://localhost:44325/api/v1/payments/table/infor"
        );
        context.commit("SET_DISPLAY_FIELD_TRANSACTIONS", respon.data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateDisplayFieldTransaction(context, infor) {
      var body = { data: JSON.stringify(infor) };
      try {
        await axios.put(
          "https://localhost:44325/api/v1/payments/table/infor",
          body
        );
        // await
        context.dispatch("getDisplayFieldTransaction");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_DISPLAY_FIELD_TRANSACTIONS(state, data) {
      state.displayFieldTransaction = data;
    },
  },
};

export default transaction;
