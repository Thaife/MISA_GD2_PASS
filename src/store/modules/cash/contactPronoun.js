//Create by TVThai(20/4/2022)
//store cho người liên hệ
//import EmployeeAPI from "../../js/api/employeeApi";

const contactPronoun = {
  state: {
    contactPronouns: [],
  },
  getters: {
    //danh sách người liên hệ
    contactPronouns: (state) => state.contactPronouns,
  },
  actions: {
    async getContactPronouns(context) {
      try {
        const respon = await [
          {
            ContactPronounId: "id-01",
            ContactPronounName: "Ông",
          },
          {
            ContactPronounId: "id-02",
            ContactPronounName: "Bà",
          },
          {
            ContactPronounId: "id-03",
            ContactPronounName: "Chú",
          },
          {
            ContactPronounId: "id-07",
            ContactPronounName: "Cô",
          },
          {
            ContactPronounId: "id-04",
            ContactPronounName: "Bác",
          },
          {
            ContactPronounId: "id-05",
            ContactPronounName: "Con",
          },
          {
            ContactPronounId: "id-06",
            ContactPronounName: "Cháu",
          },
        ];
        context.commit("SET_CONTACT_PRONOUNS", respon);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_CONTACT_PRONOUNS(state, data) {
      state.contactPronouns = data;
    },
  },
};

export default contactPronoun;
