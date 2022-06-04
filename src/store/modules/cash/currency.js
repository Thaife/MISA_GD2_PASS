//Create by TVThai(20/4/2022)
//store cho export dữ liệu ra file Excel
//import EmployeeAPI from "../../js/api/employeeApi";

const currency = {
  state: {
    //Danh sách các loại tiền tệ
    currencys: [],
    //Các thông tin tiền tệ được bind vào cbb
    currencysInfor: [
      {
        display: "Mã loại tiền",
        name: "CurrencyCode",
        isInputDisplay: true,
        width: "120px",
      },
      {
        display: "Tên loại tiền",
        name: "CurrencyName",
        isInputDisplay: false,
        width: "250px",
      },
    ],
  },
  getters: {
    currencys: (state) => state.currencys,
    currencysInfor: (state) => state.currencysInfor,
  },
  actions: {
    async getCurrencys(context) {
      try {
        const respon = await [
          {
            CurrencyId: "currency-01",
            CurrencyCode: "VND",
            CurrencyName: "Việt Nam Đồng",
            ExchangeRate: 1,
          },
          {
            CurrencyId: "currency-02",
            CurrencyCode: "USD",
            CurrencyName: "Đô la Mỹ",
            ExchangeRate: 23.15,
          },
        ];
        context.commit("SET_CURRENCYS", respon);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_CURRENCYS(state, data) {
      state.currencys = data;
    },
  },
};

export default currency;
