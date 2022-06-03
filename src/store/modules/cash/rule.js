//Create by TVThai(20/4/2022)
//store cho các điều khoản thanh toán
//import EmployeeAPI from "../../js/api/employeeApi";

const rule = {
  state: {
    //Danh sách các điều khoản
    rules: [],
    //Các thông tin của điều khoản đc bind vào cbb
    rulesInfor: [
      {
        display: "Mã điều khoản thanh toán",
        name: "RuleCode",
        isInputDisplay: false,
        width: "120px",
      },
      {
        display: "Tên điều khoản thanh toán",
        name: "RuleName",
        isInputDisplay: true,
        width: "250px",
      },
    ],
  },
  getters: {
    rules: (state) => state.rules,
    rulesInfor: (state) => state.rulesInfor,
  },
  actions: {
    async getRules(context) {
      try {
        const respon = await [
          {
            ContractId: "id-01",
            RuleCode: "ĐK-01",
            RuleName: "Chủ thể hợp đồng",
          },
          {
            ContractId: "id-02",
            RuleCode: "ĐK-02",
            RuleName: "Giá và phương thức thanh toán",
          },
          {
            ContractId: "id-03",
            RuleCode: "ĐK-03",
            RuleName: "Quyền và nghĩa vụ của các bên",
          },
          {
            ContractId: "id-04",
            RuleCode: "ĐK-04",
            RuleName: "Phạt vi phạm và bồi thường thiệt hại",
          },
          {
            ContractId: "id-05",
            RuleCode: "ĐK-05",
            RuleName: "Chấm dứt hợp đồng",
          },
          {
            ContractId: "id-06",
            RuleCode: "ĐK-06",
            RuleName: "Điều kiện bảo mật",
          },
          {
            ContractId: "id-07",
            RuleCode: "ĐK-07",
            RuleName: "Bảo hành",
          },
        ];
        context.commit("SET_RULES", respon);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_RULES(state, data) {
      state.rules = data;
    },
  },
};

export default rule;
