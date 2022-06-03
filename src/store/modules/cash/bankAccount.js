//Create by TVThai(20/4/2022)
//store cho tài khoản ngân hàng

const bank = {
  state: {
    //Danh sách tài khoản
    bankAccounts: [],
    //Các thông tin sẽ được bind vào combobox
    bankAccountsInfor: [
      {
        display: "Số tài khoản",
        name: "BankAccount",
        isInputDisplay: true,
        width: "120px",
      },
      {
        display: "Tên tài khoản",
        name: "BankName",
        isInputDisplay: false,
        width: "250px",
      },
    ],
  },
  getters: {
    bankAccounts: (state) => state.bankAccounts,
    bankCurrAccounts: () => {
      return [
        {
          BankId: "crrBank-01",
          BankAccount: "1111",
          BankName: "Tiền Việt Nam",
        },
        {
          BankId: "crrBank-02",
          BankAccount: "1112",
          BankName: "	Ngoại tệ",
        },
        {
          BankId: "crrBank-03",
          BankAccount: "1113",
          BankName: "Vàng tiền tệ",
        },
        {
          BankId: "crrBank-04",
          BankAccount: "1121",
          BankName: "Tiền Việt Nam",
        },
        {
          BankId: "crrBank-05",
          BankAccount: "1122",
          BankName: "Ngoại tệ",
        },
        {
          BankId: "crrBank-06",
          BankAccount: "1211",
          BankName: "Cổ phiếu",
        },
        {
          BankId: "crrBank-07",
          BankAccount: "1212",
          BankName: "Trái phiếu",
        },
        {
          BankId: "crrBank-08",
          BankAccount: "1331",
          BankName: "Phải thu nội bộ khác",
        },
      ];
    },
    bankAccountsInfor: (state) => state.bankAccountsInfor,
  },
  actions: {
    async getBankAccounts(context) {
      try {
        const respon = await [
          {
            BankId: "Bank-01",
            BankAccount: "111169684468",
            BankName: "Viettinbank",
          },
          {
            BankId: "Bank-02",
            BankAccount: "111869698765",
            BankName: "Techcombank",
          },
          {
            BankId: "Bank-03",
            BankAccount: "996234681191",
            BankName: "VPBank",
          },
          {
            BankId: "Bank-04",
            BankAccount: "446869681234",
            BankName: "Sacombank",
          },
          {
            BankId: "Bank-05",
            BankAccount: "111749281999",
            BankName: "Techcombank",
          },
          {
            BankId: "Bank-06",
            BankAccount: "101869684468",
            BankName: "Techcombank",
          },
          {
            BankId: "Bank-07",
            BankAccount: "111890114468",
            BankName: "Argibank",
          },
          {
            BankId: "Bank-08",
            BankAccount: "101869698765",
            BankName: "TPbank",
          },
          {
            BankId: "Bank-09",
            BankAccount: "111998881911",
            BankName: "VPBank",
          },
          {
            BankId: "Bank-10",
            BankAccount: "446869681234",
            BankName: "Viettinbank",
          },
          {
            BankId: "Bank-12",
            BankAccount: "181749281999",
            BankName: "Techcombank",
          },
          {
            BankId: "Bank-13",
            BankAccount: "101869684468",
            BankName: "Techcombank",
          },
        ];
        context.commit("SET_BANK_ACCOUNTS", respon);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_BANK_ACCOUNTS(state, data) {
      state.bankAccounts = data;
    },
  },
};

export default bank;
