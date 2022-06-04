//Create by TVThai(20/4/2022)

const accountObject = {
  state: {
    accountObjects: [],
    accountObjectInfor: [
      {
        display: "Đối tượng",
        name: "AccountObjectCode",
        isInputDisplay: true,
        width: "100px",
      },
      {
        display: "Tên đối tượng",
        name: "AccountObjectName",
        isInputDisplay: false,
        width: "140px",
      },
      {
        display: "Địa chỉ",
        name: "Address",
        isInputDisplay: false,
        width: "100px",
      },
      {
        display: "Mã số thuế",
        name: "TaxNumber",
        isInputDisplay: false,
        width: "100px",
      },
      {
        display: "Số điện thoại",
        name: "PhoneNumber",
        isInputDisplay: false,
        width: "100px",
      },
    ],
    valueAccountObjectCbb: null,
  },
  getters: {
    accountObjects: (state) => state.accountObjects,
    accountObjectInfor: (state) => state.accountObjectInfor,
    valueAccountObjectCbb: (state) => state.valueAccountObjectCbb,
  },
  actions: {
    getAccountObjects(context) {
      const respon = [
        {
          AccountObjectId: "AccoountObj-01",
          AccountObjectCode: "MS-113",
          AccountObjectName: "Trần Văn Thái",
          Address: "Hà Nội",
          TaxNumber: "123456",
          PhoneNumber: "0522474677",
        },
        {
          AccountObjectId: "AccoountObj-02",
          AccountObjectCode: "MS-114",
          AccountObjectName: "Mao Trạch Đông",
          Address: "Tàu khựa",
          TaxNumber: "234789",
          PhoneNumber: "0522474677",
        },
        {
          AccountObjectId: "AccoountObj-03",
          AccountObjectCode: "MS-115",
          AccountObjectName: "Nguyễn Trọng Tuấn",
          Address: "Hà Nội",
          TaxNumber: "654236",
          PhoneNumber: "0522474677",
        },
      ];
      context.commit("SET_ACCOUNT_OBJECTS", respon);
    },
  },
  mutations: {
    SET_ACCOUNT_OBJECTS(state, data) {
      state.accountObjects = data;
    },
    SET_VALUE_ACCOUNT_OBJECT(state, value) {
      state.valueAccountObjectCbb = value;
    },
  },
};

export default accountObject;
