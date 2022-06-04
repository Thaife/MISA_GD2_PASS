//Create by TVThai(20/4/2022)
//store cho export dữ liệu ra file Excel
//import EmployeeAPI from "../../js/api/employeeApi";

import axios from "axios";

const location = {
  state: {
    countries: [],
    provinces: [],
    districts: [],
    wards: [],
  },
  getters: {
    countries: (state) => state.countries,
    provinces: (state) => state.provinces,
    districts: (state) => state.districts,
    wards: (state) => state.wards,
  },
  actions: {
    async getCountries(context) {
      try {
        // let respon = await axios.get(
        //   "http://140.238.38.197:5000/api/v1/countries"
        // );
        let respon = [
          {
            _id: "628f7791c8de318bb733cd5a",
            name: "Việt Nam",
            code: 1,
            division_type: "Quốc gia",
            codename: "quoc_gia_viet_nam",
            province_code: 1,
            wards: [],
          },
        ];
        context.commit("SET_COUNTRIES", respon);
      } catch (error) {
        console.log(error);
      }
    },
    async getProvincesByCountryId(context, id) {
      try {
        console.log(id);
        const respon = await axios.get(
          `http://localhost:4000/api/v1/provinces/`
        );
        context.commit("SET_PROVINCES", respon.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getDistrictsByProvinceId(context, id) {
      try {
        const respon = await axios.get(
          `http://localhost:4000/api/v1/districts/byProvince?code=${id}`
        );
        context.commit("SET_DISTRICTS", respon.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getWardsByDistrictId(context, id) {
      try {
        const respon = await axios.get(
          `http://localhost:4000/api/v1/wards/byDistrict?code=${id}`
        );
        context.commit("SET_WARDS", respon.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_COUNTRIES(state, data) {
      state.countries = data;
    },
    SET_DISTRICTS(state, data) {
      state.districts = data;
    },
    SET_PROVINCES(state, data) {
      state.provinces = data;
    },
    SET_WARDS(state, data) {
      state.wards = data;
    },
  },
};

export default location;
