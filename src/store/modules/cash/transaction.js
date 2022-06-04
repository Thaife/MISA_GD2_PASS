//Create by TVThai(20/4/2022)
import transactionType from "@/js/transactionType";
import typeOfUpdateCash from "@/js/typeOfUpdateCash";
import axios from "axios";
import index from "../../index";
const fileDownload = require("js-file-download");
const transaction = {
  state: {
    //Mã phiếu chi mới
    newCodeTransaction: "",
    //Danh sách phiếu chi
    transactions: [],
    //Id Phiếu chi đang được chọn
    transactionIdSelected: "",
    //Danh sách Id phiếu chi đang được chọn
    listTransactionIdSelected: [],
    //Phiếu chi được get theo id
    i_paymentTransaction: {},
    //state ẩn hiện form thêm phiếu chi
    isShowPopupDetailsPayment: false,
    //Trạng thái của phiếu chi (Thêm, Nhân bản)
    formDetailsTransactionMode: typeOfUpdateCash.addPayment,
    //Mặc định là phiếu chi (Còn phiếu thu, both)
    typeOfTransaction: transactionType.payment,
  },
  getters: {
    newCodeTransaction: (state) => state.newCodeTransaction,
    i_paymentTransaction: (state) => state.i_paymentTransaction,
    transactions: (state) => state.transactions,
    transactionIdSelected: (state) => state.transactionIdSelected,
    listTransactionIdSelected: (state) => state.listTransactionIdSelected,
    isShowPopupDetailsPayment: (state) => state.isShowPopupDetailsPayment,
    typeOfTransaction: (state) => state.typeOfTransaction,
    formDetailsTransactionMode: (state) => state.formDetailsTransactionMode,
  },
  actions: {
    async getNewCodeTransaction(context) {
      const res = await axios.get(
        "https://localhost:44325/api/v1/payments/newcode"
      );
      if (res.status == 200) {
        context.commit("SET_NEW_CODE_TRANSACTION", res.data);
      } else {
        alert("Hệ thống lỗi!");
      }
    },
    async getPaymentsPaging(context) {
      const pageSize = index.getters.pageSize;
      const pageNumber = index.getters.currentPage;
      const textSearch = index.getters.textSearch || "";
      index.commit("SET_ISLOADING", true);
      const respon = await axios.get(
        `https://localhost:44325/api/v1/payments/paging?pagesize=${pageSize}&pagenumber=${pageNumber}&textsearch=${textSearch}`
      );
      index.commit("SET_TOTAL_RECORD", respon.data.totalRecord);
      context.commit("SET_TRANSACTIONS", respon.data.data);
      index.commit("SET_ISLOADING", false);
    },
    async getTransactions(context) {
      try {
        let respon = await [
          {
            PaymentId: "transaction-01",
            AccountingDate: "2022-04-06",
            DateOfVouchers: null,
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            AccountObjectId: "AccoountObj-01",
            AccountObjectName: "Trần Văn Thái",
            ReceiverName: "Trần Văn Thái",
            Address: "Hà Nội",
            EmployeeId: "id-01",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-03",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 2,
          },
          {
            PaymentId: "transaction-04",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 2,
          },
          {
            PaymentId: "transaction-05",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 2,
          },
          {
            PaymentId: "transaction-06",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 2,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },

          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
          {
            PaymentId: "transaction-02",
            AccountingDate: "2022-04-06",
            DateOfVouchers: "2022-04-06",
            VouchersNumber: "10186968",
            PaymentReason: "Chi tiền cho",
            Cash: "100",
            EntityCode: "MS-113",
            EntityFullName: "Mao Trạch Đông",
            ReceiverFullName: "Trần Văn Thái",
            Address: "Thanh Lâm Mê Linh Hà Nội",
            EmployeeFullName: "Nguyễn Hữu Lộc",
            Reason: "Lý do khác",
            DateOfFund: "2022-04-06",
            DocumentTypeName: "Phiếu chi",
            MultipleBills: null,
            CreatedBy: "Nguyễn Đức Toán",
            DateOfCreated: "2022-04-05",
            EditBy: "Trần Văn Thái",
            DateOfEdit: "2022-04-05",
            BranchName: "Công ty cổ phần MISA",
            TypeOfTransaction: 1,
          },
        ];
        context.commit("SET_TRANSACTIONS", respon);
      } catch (error) {
        console.log(error);
      }
    },
    async getPaymentTransactions(context) {
      try {
        let respon = await axios.get(`https://localhost:44325/api/v1/Payments`);
        context.commit("SET_TRANSACTIONS", respon.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getPaymentById({ commit }, id) {
      let res = await axios.get(
        `https://localhost:44325/api/v1/Payments/${id}`
      );
      commit("SET_PAYMENT", res.data);
    },

    async addPayment(context, body) {
      try {
        context.commit("SET_ISSHOW_DIALOG_CONFIRM", { isShow: false });
        await axios
          .post(`https://localhost:44325/api/v1/Payments`, body)
          .then(() => {
            index.commit("SET_TOAST_STATUS", true);
            if (
              context.state.formDetailsTransactionMode ==
              typeOfUpdateCash.addPayment
            )
              index.commit("SET_TOAST_MESS", "Thêm thành công !");
            else if (
              context.state.formDetailsTransactionMode ==
              typeOfUpdateCash.replicaPayment
            )
              index.commit("SET_TOAST_MESS", "Nhân bản thành công !");
            index.commit("SET_TOAST_ISSHOW", true);
            index.commit("SET_ISSHOW_POPUP_DETAILS_PAYMENT", false);
            context.dispatch("getPaymentsPaging");
          })
          .catch((err) => {
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
              if (
                (index.getters.formDetailsTransactionMode =
                  typeOfUpdateCash.addPayment)
              )
                index.commit("SET_TOAST_MESS", "Thêm thành công !");
              else if (
                (index.getters.formDetailsTransactionMode =
                  typeOfUpdateCash.replicaPayment)
              )
                index.commit("SET_TOAST_MESS", "Nhân bản thành công !");
              index.commit("SET_TOAST_ISSHOW", true);
              index.commit("SET_ISSHOW_POPUP_DETAILS_PAYMENT", false);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    // async updatePayment(context, { id, body }) {
    //   try {
    //     console.log(id, body);
    //     let res = await axios.put(
    //       `https://localhost:44325/api/v1/payments/${id}`,
    //       body
    //     );
    //     if (res.status == 200) {
    //       index.commit("SET_TOAST_STATUS", true);
    //       index.commit("SET_TOAST_MESS", "Sửa thành công !");
    //       index.commit("SET_TOAST_ISSHOW", true);
    //       context.dispatch("getVendorsPaging");
    //     } else {
    //       index.commit("SET_TOAST_STATUS", false);
    //       index.commit("SET_TOAST_MESS", "Sửa thất bại !");
    //       index.commit("SET_TOAST_ISSHOW", true);
    //     }
    //     context.dispatch("getPaymentsPaging");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async deletePayment(context, id) {
      context.commit("SET_ISSHOW_DIALOG_CONFIRM", { isShow: false });
      try {
        let res = await axios.delete(
          `https://localhost:44325/api/v1/payments/${id}`
        );
        if (res.status == 200) {
          index.commit("SET_TOAST_STATUS", true);
          index.commit("SET_TOAST_MESS", "Xoá thành công !");
          index.commit("SET_TOAST_ISSHOW", true);
          context.dispatch("getPaymentsPaging");
        } else {
          index.commit("SET_TOAST_STATUS", false);
          index.commit("SET_TOAST_MESS", "Xoá thất bại !");
          index.commit("SET_TOAST_ISSHOW", true);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteMultiPayment(context, listId) {
      context.commit("SET_ISSHOW_DIALOG_CONFIRM", { isShow: false });
      try {
        let res = await axios.put(
          `https://localhost:44325/api/v1/payments/multi`,
          listId
        );
        console.log(res);
        if (res.status == 200) {
          index.commit("SET_TOAST_STATUS", true);
          index.commit("SET_TOAST_MESS", "Xoá thành công !");
          index.commit("SET_TOAST_ISSHOW", true);
          context.dispatch("getPaymentsPaging");
        } else {
          index.commit("SET_TOAST_STATUS", false);
          index.commit("SET_TOAST_MESS", "Xoá thất bại !");
          index.commit("SET_TOAST_ISSHOW", true);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async exportExcel(context, cols) {
      try {
        const pageSize = index.getters.pageSize;
        const pageNumber = index.getters.currentPage;
        const textSearch = index.getters.textSearch || "";
        let res = await axios({
          url: `https://localhost:44325/api/v1/payments/export?pageSize=${pageSize}&pageNumber=${pageNumber}&textSearch=${textSearch}`,
          method: "post",
          data: cols,
          responseType: "blob",
        });

        fileDownload(res.data, "thai.xlsx");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_NEW_CODE_TRANSACTION(state, newCode) {
      state.newCodeTransaction = newCode;
    },
    SET_ISSHOW_POPUP_DETAILS_PAYMENT(state, isShow) {
      state.isShowPopupDetailsPayment = isShow;
    },
    SET_TRANSACTIONS(state, data) {
      state.transactions = data;
    },
    SET_TRANSACTION_ID_SELECTED(state, id) {
      state.transactionIdSelected = id;
    },
    SET_LIST_TRANSACTION_ID_SELECTED(state, listId) {
      state.listTransactionIdSelected = listId;
    },
    SET_TYPEOF_TRANSACTION(state, type) {
      state.typeOfTransaction = type;
    },
    SET_FORM_DETAILS_TRANSACTION_MODE(state, mode) {
      state.formDetailsTransactionMode = mode;
    },
    SET_PAYMENT(state, data) {
      state.i_paymentTransaction = data;
    },
  },
};

export default transaction;
