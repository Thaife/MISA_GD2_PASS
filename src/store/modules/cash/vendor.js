//Create by TVThai(20/4/2022)
//store cho export dữ liệu ra file Excel
import typeOfUpdateCash from "@/js/typeOfUpdateCash";
import index from "../../index";
import axios from "axios";

const vendor = {
  state: {
    //Mã nhà cung cấp mới
    newCodeVendor: "",
    //Danh sách các nhà cung cấp
    vendors: [],
    //Thông tin nhà cung cấp được bind vào cbb
    vendorsInfor: [
      {
        display: "Đối tượng",
        name: "VendorCode",
        isInputDisplay: true,
        width: "100px",
      },
      {
        display: "Tên đối tượng",
        name: "VendorFullName",
        isInputDisplay: false,
        width: "140px",
      },
      {
        display: "Địa chỉ",
        name: "ContactAddress",
        isInputDisplay: false,
        width: "100px",
      },
      {
        display: "Mã số thuế",
        name: "VendorTaxCode",
        isInputDisplay: false,
        width: "100px",
      },
      {
        display: "Số điện thoại",
        name: "VendorPhoneNumber",
        isInputDisplay: false,
        width: "100px",
      },
    ],
    //số nhà cung cấp được bind vào cbb
    sizeVendorsCbb: 100,
    //Nhà cung cấp get theo id
    vendor: {},
    //Id nhà cung cấp đang được chọn
    vendorIdSelected: "",
    //Danh sách id nhà cung cấp đang được chọn
    listVendorIdSelected: [],
    //state ẩn hiện form chi tiết nhà cung cấp
    isShowPopupDetailsVendor: false,
    //Trạng thái của form nhà cung cấp (Thêm, sửa)
    formDetailsVendorMode: typeOfUpdateCash.addVendor,
    //state có giữ lại form sau khi cất không
    isHoldFormVendor: false,
  },
  getters: {
    newCodeVendor: (state) => state.newCodeVendor,
    vendors: (state) => state.vendors,
    sizeVendorsCbb: (state) => state.sizeVendorsCbb,
    vendorsInfor: (state) => state.vendorsInfor,
    vendor: (state) => state.vendor,
    listVendorIdSelected: (state) => state.listVendorIdSelected,
    vendorIdSelected: (state) => state.vendorIdSelected,
    isShowPopupDetailsVendor: (state) => state.isShowPopupDetailsVendor,
    formDetailsVendorMode: (state) => state.formDetailsVendorMode,
    isHoldFormVendor: (state) => state.isHoldFormVendor,
  },
  actions: {
    async getVendors(context) {
      let respon = await axios.get(`https://localhost:44325/api/v1/vendors`);
      context.commit("SET_VENDORS", respon.data);
    },
    async getVendorById(context, id) {
      try {
        let respon = await axios.get(
          `https://localhost:44325/api/v1/vendors/${id}`
        );
        context.commit("SET_VENDOR", respon.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getVendorsCbb(context) {
      index.commit("SET_ISLOADING", true);
      let respon = await axios.get(
        `https://localhost:44325/api/v1/vendors/paging?pagesize=${context.getters.sizeVendorsCbb}&pagenumber=1`
      );
      context.commit("SET_VENDORS", respon.data.data);
      index.commit("SET_ISLOADING", false);
    },
    async getVendorsPaging(context) {
      const pageSize = index.getters.pageSize;
      const pageNumber = index.getters.currentPage;
      const textSearch = index.getters.textSearch || "";
      index.commit("SET_ISLOADING", true);
      const respon = await axios.get(
        `https://localhost:44325/api/v1/vendors/paging?pagesize=${pageSize}&pagenumber=${pageNumber}&textsearch=${textSearch}`
      );
      index.commit("SET_TOTAL_RECORD", respon.data.totalRecord);
      context.commit("SET_VENDORS", respon.data.data);
      index.commit("SET_ISLOADING", false);
    },
    async getNewCodeVendor(context) {
      const res = await axios.get(
        "https://localhost:44325/api/v1/Vendors/newcode"
      );
      if (res.status == 200) {
        context.commit("SET_NEW_CODE_VENDOR", res.data);
      } else {
        alert("Hệ thống lỗi!");
      }
    },
    addVendor(context, body) {
      try {
        axios
          .post("https://localhost:44325/api/v1/vendors", body)
          .then(() => {
            index.commit("SET_TOAST_STATUS", true);
            index.commit("SET_TOAST_MESS", "Thêm thành công !");
            index.commit("SET_TOAST_ISSHOW", true);
            context.dispatch("getVendorsPaging");
            if (context.getters.isHoldFormVendor) {
              index.commit("SET_VALIDATES", {});
              context.commit("SET_VENDOR", {
                ProvinceId: null,
                ContactAddress: null,
                ContactEmail: null,
                ContactLegalRep: null,
                ContactName: null,
                ContactPhoneNumber: null,
                ContactPronounId: null,
                CountryId: null,
                DebitPaymentAccountId: null,
                DebitReceiptAccountId: null,
                DeliveryAddresses: [""],
                DistrictId: null,
                EinvoiceRecipient: null,
                EinvoiceRecipientEmails: null,
                EinvoiceRecipientPhoneNumber: null,
                VendorGroups: null,
                IsCustomer: 0,
                MaxDebitAmount: null,
                MaxDebitDateCount: null,
                PurchasingStaffId: null,
                RuleId: null,
                TextNote: null,
                VendorCode: null,
                VendorFullName: null,
                VendorPhoneNumber: null,
                VendorTaxCode: null,
                VendorType: 0,
                WardId: null,
                Website: null,
              });
              context.dispatch("getNewCodeVendor");
            } else {
              index.commit("SET_ISSHOW_POPUP_DETAILS_VENDOR", false);
            }
          })
          .catch((err) => {
            console.log("err");
            console.log(err);
            //lấy lỗi đầu tiên => hiển thị lên popup
            if (err.response.status == 400) {
              let objectValidate = {};
              const field = err.response.data.Data.errlst[0].field;
              const mess = err.response.data.Data.errlst[0].mess;
              objectValidate[field] = true;
              objectValidate[`${field}Title`] = mess;

              //set các thông tin validate và error vào dialog
              index.commit("SET_VALIDATES", objectValidate);
              index.commit("SET_ERR_MESSAGE", mess);
              //hiện dialog thông báo lỗi
              index.commit("SET_ISSHOW_DIALOG_NOTIFI", {
                isShow: true,
                mess: mess,
              });
            } else {
              index.commit("SET_TOAST_MESS", "Thêm thất bại !");
              index.commit("SET_TOAST_ISSHOW", true);
              index.commit("SET_ISSHOW_POPUP_DETAILS_VENDOR", false);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    async updateVendor(context, { id, body }) {
      try {
        await axios
          .put(`https://localhost:44325/api/v1/vendors/${id}`, body)
          .then(() => {
            index.commit("SET_TOAST_STATUS", true);
            index.commit("SET_TOAST_MESS", "Sửa thành công !");
            index.commit("SET_TOAST_ISSHOW", true);
            context.dispatch("getVendorsPaging");
            if (context.getters.isHoldFormVendor) {
              index.commit("SET_VALIDATES", {});
              context.commit("SET_VENDOR", {
                ProvinceId: null,
                ContactAddress: null,
                ContactEmail: null,
                ContactLegalRep: null,
                ContactName: null,
                ContactPhoneNumber: null,
                ContactPronounId: null,
                CountryId: null,
                DebitPaymentAccountId: null,
                DebitReceiptAccountId: null,
                DeliveryAddresses: [""],
                DistrictId: null,
                EinvoiceRecipient: null,
                EinvoiceRecipientEmails: null,
                EinvoiceRecipientPhoneNumber: null,
                VendorGroups: null,
                IsCustomer: 0,
                MaxDebitAmount: null,
                MaxDebitDateCount: null,
                PurchasingStaffId: null,
                RuleId: null,
                TextNote: null,
                VendorCode: null,
                VendorFullName: null,
                VendorPhoneNumber: null,
                VendorTaxCode: null,
                VendorType: 0,
                WardId: null,
                Website: null,
              });
              context.dispatch("getNewCodeVendor");
            } else {
              index.commit("SET_ISSHOW_POPUP_DETAILS_VENDOR", false);
            }
          })
          .catch((err) => {
            console.log(err);
            //lấy lỗi đầu tiên => hiển thị lên popup
            if (err.response.status == 400) {
              let objectValidate = {};
              const field = err.response.data.Data.errlst[0].field;
              const mess = err.response.data.Data.errlst[0].mess;
              objectValidate[field] = true;
              objectValidate[`${field}Title`] = mess;

              //set các thông tin validate và error vào dialog
              index.commit("SET_VALIDATES", objectValidate);
              index.commit("SET_ERR_MESSAGE", mess);
              //hiện dialog thông báo lỗi
              index.commit("SET_ISSHOW_DIALOG_NOTIFI", {
                isShow: true,
                mess: mess,
              });
            } else {
              index.commit("SET_TOAST_STATUS", false);
              index.commit("SET_TOAST_MESS", "Sửa thất bại !");
              index.commit("SET_TOAST_ISSHOW", true);
              index.commit("SET_ISSHOW_POPUP_DETAILS_VENDOR", false);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteVendor(context, id) {
      try {
        let res = await axios.delete(
          `https://localhost:44325/api/v1/vendors/${id}`
        );
        context.commit("SET_ISSHOW_DIALOG_CONFIRM", { isShow: false });
        if (res.status == 200) {
          index.commit("SET_TOAST_STATUS", true);
          index.commit("SET_TOAST_MESS", "Xoá thành công !");
          index.commit("SET_TOAST_ISSHOW", true);
          context.dispatch("getVendorsPaging");
        } else {
          index.commit("SET_TOAST_STATUS", false);
          index.commit("SET_TOAST_MESS", "Xoá thất bại !");
          index.commit("SET_TOAST_ISSHOW", true);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteMultiVendor(context, listId) {
      try {
        let res = await axios.put(
          `https://localhost:44325/api/v1/vendors/multi`,
          listId
        );
        context.commit("SET_ISSHOW_DIALOG_CONFIRM", { isShow: false });
        if (res.status == 200) {
          index.commit("SET_TOAST_STATUS", true);
          index.commit("SET_TOAST_MESS", "Xoá thành công !");
          index.commit("SET_TOAST_ISSHOW", true);
          context.dispatch("getVendorsPaging");
        } else {
          index.commit("SET_TOAST_STATUS", false);
          index.commit("SET_TOAST_MESS", "Xoá thất bại !");
          index.commit("SET_TOAST_ISSHOW", true);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_NEW_CODE_VENDOR(state, newCode) {
      state.newCodeVendor = newCode;
    },
    SET_SIZE_VENDORS_CBB(state, size) {
      state.sizeVendorsCbb = size;
    },
    SET_VENDORS(state, data) {
      state.vendors = data;
    },
    SET_VENDOR(state, data) {
      state.vendor = data;
    },
    SET_VENDOR_ID_SELECTED(state, id) {
      state.vendorIdSelected = id;
    },
    SET_LIST_VENDOR_ID_SELECTED(state, list) {
      state.listVendorIdSelected = list;
    },
    SET_ISSHOW_POPUP_DETAILS_VENDOR(state, isShow) {
      state.isShowPopupDetailsVendor = isShow;
    },
    SET_FORM_DETAILS_VENDOR_MODE(state, mode) {
      state.formDetailsVendorMode = mode;
    },
    SET_IS_HOLD_FORM_VENDOR(state, value) {
      state.isHoldFormVendor = value;
    },
  },
};

export default vendor;
