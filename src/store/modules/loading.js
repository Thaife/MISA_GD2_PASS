//Create by TVThai(17/4/2022)
//store màn phủ khi loading
const loading = {
  state: {
    //true: ở trạng thái load dữ liệu
    isLoading: false,
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    SET_ISLOADING(state, value) {
      state.isLoading = value;
    },
  },
};

export default loading;
