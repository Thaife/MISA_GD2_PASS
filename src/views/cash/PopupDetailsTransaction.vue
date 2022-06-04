<template>
  <div
    class="view-popupDetailsTransaction-wrap"
    v-show="isShowPopupDetailsPayment"
    ref="popup_transaction"
  >
    <div
      class="view-popupDetailsTransaction"
      v-show="isShowPopupDetailsPayment"
    >
      <div class="details__transaction__header">
        <div class="recently">
          <div class="recently__icon"></div>
          <h2 class="recently__text">
            Phiếu chi {{ paymentTransaction.PaymentCode }}
          </h2>
        </div>
        <div class="payment__type">
          <BaseSelect
            v-model="paymentTransaction.PaymentType"
            width="350px"
            height="32px"
            :dropDown="true"
            :items="[{ text: 'Chi khác' }]"
            :itemDefault="{ text: 'Chi khác' }"
            :isDisable="isDisable"
          />
        </div>
        <div class="details__btn">
          <div class="details__btn__instructions">
            <div class="details__btn__instructions__icon"></div>
            <div class="details__btn__instructions__text">Hướng dẫn</div>
          </div>
          <div class="details__btn__wrap__icon" title="Tuỳ chỉnh giao diện">
            <div class="details__btn__setting__icon"></div>
          </div>
          <div class="details__btn__wrap__icon" title="Giúp">
            <div class="details__btn__help__icon"></div>
          </div>
          <div
            class="details__btn__wrap__icon"
            title="Đóng"
            @click="handleClosePopup"
          >
            <div class="details__btn__close__icon"></div>
          </div>
        </div>
      </div>
      <div class="details__transaction__infor">
        <div class="details__transaction__infor__left c-7">
          <div class="transaction__infor__item padd-r-12 c-5">
            <span>Mã đối tượng</span>
            <BaseComboboxTB
              :data="vendors"
              :infor="vendorsInfor"
              fieldValue="VendorId"
              fieldDisplay="VendorCode"
              v-model="valueCbbAccountObj"
              minHeight="32px"
              width="100%"
              :focus="fieldFocus == 'AccountObjectId'"
              :isDisable="isDisable"
              :size="sizeVendorsCbb"
              @handleScroll="handleScroll"
            />
          </div>
          <div class="transaction__infor__item c-7">
            <span>Tên đối tượng</span>
            <BaseInput
              v-model="paymentObjFullName"
              field="AccountObjectName"
              width="100%"
              height="32px"
              placehoder=""
              :search="false"
              :tabIndex="2"
              :isDisable="isDisable"
            />
          </div>
          <div class="transaction__infor__item padd-r-12 c-5">
            <span>Người nhận</span>
            <BaseInput
              v-model="paymentTransaction.ReceiverName"
              field="ReceiverName"
              width="100%"
              height="32px"
              placehoder=""
              :search="false"
              :tabIndex="2"
              :isDisable="isDisable"
            />
          </div>
          <div class="transaction__infor__item c-7">
            <span>Địa Chỉ</span>
            <BaseInput
              v-model="paymentTransaction.Address"
              field="Address"
              width="100%"
              height="32px"
              placehoder=""
              :search="false"
              :tabIndex="2"
              :isDisable="isDisable"
            />
          </div>
          <div class="transaction__infor__item c-12">
            <span>Lý do chi</span>
            <BaseInput
              v-model="paymentTransaction.PaymentReason"
              field="PaymentReason"
              width="100%"
              height="32px"
              placehoder=""
              :search="false"
              :tabIndex="2"
              :isDisable="isDisable"
            />
          </div>
        </div>
        <div class="details__transaction__infor__right c-5">
          <div
            class="transaction__infor__item date__picker c-6"
            :class="{ warring: validates.AccountingDate }"
          >
            <span>Ngày hạch toán</span>
            <DatePicker
              :placeholder="'DD/MM/YYYY'"
              :format="'DD/MM/YYYY'"
              :lang="'vi'"
              :clearable="false"
              title-format="DD/MM/YYYY"
              v-model:value="accountingDate"
              :disabled="isDisable"
              @open="() => (validates.AccountingDate = false)"
            />
            <div class="date__title__warring">
              Ngày hạch toán phải lớn hơn hoặc bằng ngày chứng từ, vui lòng kiểm
              tra lại
            </div>
          </div>
          <div class="transaction__infor__item c-6"></div>
          <div class="transaction__infor__item c-6">
            <span>Ngày phiếu chi</span>
            <DatePicker
              :format="'DD/MM/YYYY'"
              :placeholder="'DD/MM/YYYY'"
              :lang="'vi'"
              :clearable="false"
              title-format="DD/MM/YYYY"
              v-model:value="paymentDate"
              :disabled="isDisable"
            />
          </div>
          <div class="transaction__infor__item c-6"></div>
          <div class="transaction__infor__item c-6">
            <span>Số phiếu chi</span>
            <BaseInput
              v-model="paymentTransaction.PaymentCode"
              field="PaymentCode"
              width="100%"
              height="32px"
              placehoder=""
              :search="false"
              :tabIndex="2"
              :isDisable="isDisable"
              :warring="validates.PaymentCode"
            />
          </div>
          <div class="transaction__infor__item c-6"></div>

          <div class="details__transaction__total__cash">
            <span>Tổng tiền</span>
            <div>{{ handleMoneyDisplay(totalMoneyAccounting) }}</div>
          </div>
        </div>
        <div class="details__transaction__infor__bottom c-12">
          <div
            class="c-7"
            style="padding-right: 16px; display: flex; flex-wrap: wrap"
          >
            <div class="transaction__infor__item padd-r-12 c-5">
              <span>Nhân viên</span>
              <BaseComboboxTB
                :data="employeesCash"
                :infor="employeesInfor"
                fieldValue="EmployeeId"
                fieldDisplay="EmployeeFullName"
                v-model="valueCbbEmployee"
                minHeight="32px"
                width="100%"
                :isDisable="isDisable"
              />
            </div>
            <div class="transaction__infor__item c-7">
              <span>Kèm theo</span>
              <div class="transaction__infor__item__input__wrap">
                <BaseInput
                  v-model="paymentTransaction.AttachDocumentAmount"
                  field="AttachDocumentAmount"
                  type="number"
                  width="130px"
                  height="32px"
                  placeholder="Số lượng"
                  align="right"
                  :search="false"
                  :tabIndex="2"
                  :isDisable="isDisable"
                />
                <div class="transaction__infor__item__descri">Chứng từ gốc</div>
              </div>
            </div>
          </div>
        </div>
        <div class="details__transaction__reference c-12">
          <span>Tham chiếu</span>
          <div>...</div>
        </div>
      </div>
      <div class="details__transaction__accounting__header">
        <span>Hạch toán</span>
        <div class="details__accounting">
          <span>Loại tiền</span>
          <BaseComboboxTB
            :data="currencys"
            :infor="currencysInfor"
            fieldValue="CurrencyId"
            fieldDisplay="CurrencyCode"
            v-model="valueCbbCurrency"
            minHeight="32px"
            width="100px"
            :notAllowCreate="true"
            :isDisable="isDisable"
            @handleTab="switchToAccountings"
          />
          <div
            class="exchange__rate"
            v-show="paymentTransaction.CurrencyId !== 'currency-01'"
          >
            <span>Tỷ giá</span>
            <BaseInput
              v-model="paymentTransaction.ExchangeRate"
              field="ExchangeRate"
              width="130px"
              height="32px"
              placehoder="Số lượng"
              :search="false"
              :tabIndex="2"
              :isDisable="isDisable"
            />
          </div>
        </div>
      </div>
      <div class="details__transaction__accounting__table">
        <table>
          <thead>
            <tr>
              <th style="width: 24px; min-width: 24px"></th>
              <th style="width: 32px; min-width: 32px">#</th>
              <th style="min-width: 140px; text-align: left">
                <div>Diễn giải</div>
              </th>
              <th style="min-width: 100px; text-align: left">
                <div>TK Nợ</div>
              </th>
              <th style="min-width: 100px; text-align: left">
                <div>TK Có</div>
              </th>
              <th style="min-width: 165px; text-align: right">
                <div>Số tiền</div>
              </th>
              <th style="min-width: 271px; text-align: left">
                <div>Đối tượng</div>
              </th>
              <th style="min-width: 501px; text-align: left">
                <div>Tên đối tượng</div>
              </th>
              <th style="width: 32px; min-width: 32px"><div></div></th>
              <th style="width: 24px; min-width: 24px"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(account, index) in accountings"
              :key="index"
              @click="handleClickRowAccounting(account)"
            >
              <td></td>
              <td>{{ index + 1 }}</td>
              <td>
                <div v-if="account.AccountingId != accountingActive">
                  {{ account.AccountingDetail }}
                </div>
                <div v-else>
                  <BaseInput
                    v-model="account.AccountingDetail"
                    field=""
                    width="100%"
                    height="32px"
                    placehoder=""
                    :search="false"
                    :tabIndex="2"
                    :isDisable="isDisable"
                  />
                </div>
              </td>
              <td>
                <div v-if="account.AccountingId != accountingActive">
                  {{ handleDebitAccount(bankAccounts, account.DebitAccount) }}
                </div>
                <div v-else>
                  <BaseComboboxTB
                    :data="bankAccounts"
                    :infor="bankAccountsInfor"
                    fieldValue="BankId"
                    fieldDisplay="BankAccount"
                    v-model="account.DebitAccount"
                    minHeight="32px"
                    width="100%"
                    :notAllowCreate="true"
                    :isDisable="isDisable"
                  />
                </div>
              </td>
              <td>
                <div v-if="account.AccountingId != accountingActive">
                  {{
                    handleDebitAccount(bankCurrAccounts, account.AccountNumber)
                  }}
                </div>
                <div v-else>
                  <BaseComboboxTB
                    :data="bankCurrAccounts"
                    :infor="bankAccountsInfor"
                    fieldValue="BankId"
                    fieldDisplay="BankAccount"
                    v-model="account.AccountNumber"
                    minHeight="32px"
                    width="100%"
                    :notAllowCreate="true"
                    :isDisable="isDisable"
                  />
                </div>
              </td>
              <td>
                <div
                  style="text-align: right"
                  v-if="account.AccountingId != accountingActive"
                >
                  {{ handleMoneyDisplay(account.Money) }}
                </div>
                <div v-else>
                  <BaseInput
                    v-model="account.Money"
                    field=""
                    type="number"
                    width="100%"
                    height="32px"
                    placehoder=""
                    align="right"
                    :search="false"
                    :tabIndex="2"
                    :isDisable="isDisable"
                  />
                </div>
              </td>
              <td>
                <div v-if="account.AccountingId != accountingActive">
                  {{ handleAccountObject(account.AccountObjectId) }}
                </div>
                <div v-else>
                  <BaseComboboxTB
                    :data="vendors"
                    :infor="vendorsInfor"
                    fieldValue="VendorId"
                    fieldDisplay="VendorCode"
                    v-model="account.AccountObjectId"
                    minHeight="32px"
                    width="100%"
                    :notAllowCreate="true"
                    :isDisable="isDisable"
                  />
                </div>
              </td>
              <td>
                <div>
                  {{ handleAccountObjectName(account.AccountObjectId) }}
                </div>
              </td>
              <td>
                <div
                  class="remove__wrap"
                  title=""
                  @click="handleClickRemoveARow(index)"
                >
                  <div class="remove__wrap__icon"></div>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th style="text-align: left">
                <div></div>
              </th>
              <th style="text-align: left">
                <div></div>
              </th>
              <th style="text-align: left">
                <div></div>
              </th>
              <th style="text-align: right">
                <div>{{ handleMoneyDisplay(totalMoneyAccounting) }}</div>
              </th>
              <th style="text-align: left">
                <div></div>
              </th>
              <th style="text-align: left">
                <div></div>
              </th>
              <th style=""><div></div></th>
              <th style=""></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="details__transaction__controls">
        <div class="btns__control">
          <div class="details__transaction__btn" @click="handleClickAddOneRow">
            Thêm dòng
          </div>
          <div
            class="details__transaction__btn"
            @click="handleClickRemoveAllRow"
          >
            Xoá hết dòng
          </div>
        </div>
        <div class="details__transaction__upload">
          <div class="details__transaction__upload__header">
            <div class="details__transaction__upload__item"></div>
            <div class="details__transaction__upload__title">Đính kèm</div>
            <div class="details__transaction__upload__note">
              Dung lượng tối đa 5MB
            </div>
          </div>
          <div class="details__transaction__upload__input">
            <input type="file" v-show="false" />
            <div class="details__transaction__upload__box">
              Kéo/thả tệp vào đây hoặc bấm vào đây
            </div>
          </div>
        </div>
      </div>
      <div class="details__transaction__clear"></div>
      <div class="popupDetailsTransaction__footer">
        <div class="popupDetailsTransaction__footer__left">
          <div @click="SET_ISSHOW_POPUP_DETAILS_PAYMENT(false)">
            <BaseButton
              text="Huỷ"
              height="32px"
              :tabIndex="18"
              @handleKeyDown="handleClosePopup"
              :isDisable="isDisable"
            />
          </div>
        </div>
        <div class="popupDetailsTransaction__footer__right">
          <div style="margin-right: 10px" @click="handleStore">
            <BaseButton
              text="Cất"
              height="32px"
              :tabIndex="18"
              :isDisable="isDisable"
              @handleKeyDown="() => {}"
            />
          </div>
          <div @click="handleStoreAndPrint">
            <BaseButtonIcon
              text="Cất và In"
              height="32px"
              radius="2px"
              :mainType="true"
              :tabIndex="18"
              :isDisable="isDisable"
              @handleKeyDown="() => {}"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="overlay__disable"></div>
  </div>
</template>

<script>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/vi";

import BaseButtonIcon from "@/components/base/BaseButtonIcon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseComboboxTB from "@/components/base/BaseComboboxTB.vue";

import typeOfUpdateCash from "@/js/typeOfUpdateCash";
import DialogQuestion from "../../js/dialog/dialogQuestion";
// import formatData from "@/js/formatData/formatData";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FormatData from "../../js/formatData/formatData";
export default {
  name: "view-popupDetailsTransaction",
  components: {
    BaseSelect,
    BaseComboboxTB,
    BaseInput,
    DatePicker,
    BaseButton,
    BaseButtonIcon,
  },
  data() {
    return {
      fieldFocus: "",
      isDisable: false,
      valueCbbAccountObj: null,
      valueCbbEmployee: null,
      valueCbbCurrency: null,
      // //datePicker
      // langObject: {
      //   formatLocale: {
      //     firstDayOfWeek: 1,
      //   },
      //   monthBeforeYear: false,
      // },
      // langString: "zh-cn",
      paymentTransactionCompare: {},
      paymentTransaction: {},
      paymentObjFullName: "",
      accountingDate: null,
      paymentDate: null,
      //
      accountings: [],
      accountingActive: "",
    };
  },
  computed: {
    ...mapGetters([
      "transactions",
      "newCodeTransaction",
      "formDetailsTransactionMode",
      "validates",
      //
      "errMessage",
      "vendors",
      "vendorsInfor",
      "sizeVendorsCbb",
      "accountObjects",
      "accountObjectInfor",
      "employeesCash",
      "employeesInfor",
      "isShowPopupDetailsPayment",
      "bankAccounts",
      "bankCurrAccounts",
      "bankAccountsInfor",
      "currencys",
      "currencysInfor",
      "i_paymentTransaction",
      "transactionIdSelected",
    ]),

    //Tính tổng giá tiền của hạch toán trong 1 phiếu chi
    totalMoneyAccounting() {
      const total = this.accountings?.reduce((total, acc) => {
        return total + parseInt(acc.Money);
      }, 0);

      return total;
    },
    //Xử lý để hiển thị tài khoản ngân hàng trong hạch toán
    handleDebitAccount() {
      return (data, id) => {
        const acc = data.find((acc) => {
          return acc.BankId == id;
        });
        if (acc) {
          return acc.BankAccount;
        }
        return null;
      };
    },
    //Format lại giá trị tiền được truyền qua paras
    handleMoneyDisplay() {
      return (money) => FormatData.formatMoney(money);
    },
    //Xử lý để hiển thị mã đối tượng trong hạch toán
    handleAccountObject() {
      return (objId) => {
        const obj = this.vendors.find((vendor) => {
          return vendor.VendorId == objId;
        });
        if (obj) {
          return obj.VendorCode;
        }
        return null;
      };
    },
    //Xử lý để hiển thị mã đối tượng trong hạch toán
    handleAccountObjectName() {
      return (objId) => {
        const obj = this.vendors.find((vendor) => {
          return vendor.VendorId == objId;
        });
        if (obj) {
          return obj.VendorFullName;
        }
        return null;
      };
    },
  },
  watch: {
    async isShowPopupDetailsPayment(value) {
      // debugger;
      this.fieldFocus = "AccountObjectId";
      if (value) {
        // debugger;
        window.addEventListener("keydown", this.handleDocumentKeydown);
        //Ở trạng thái thêm mới
        if (this.formDetailsTransactionMode == typeOfUpdateCash.addPayment) {
          this.accountings = [
            {
              AccountingId: "1",
              AccountingDetail: "Chi tiền cho ",
              //Tài khoản nợ
              DebitAccount: null,
              //Tài khoản có
              AccountNumber: "crrBank-01",
              //
              Money: 0,
              Object: "",
            },
          ];
          await this.getNewCodeTransaction();
          this.paymentTransaction = {
            AccountObjectId: "",
            AccountingDate: new Date(),
            Address: "",
            AttachDocumentAmount: "",
            CurrencyId: "",
            EmployeeId: "",
            ExchangeRate: "",
            PaymentCode: "",
            PaymentDate: new Date(),
            PaymentReason: "Chi tiền cho ",
            ReceiverName: "",
          };
          // this.paymentDate = new Date();
          this.accountingDate = new Date();
          setTimeout(() => {
            this.paymentTransaction.PaymentCode = this.newCodeTransaction;
          }, 0);

          this.paymentTransaction.PaymentReason = "Chi tiền cho ";
          setTimeout(() => {
            this.valueCbbCurrency = "currency-01";
          }, 0);
          setTimeout(() => {
            this.paymentTransactionCompare = {
              ...this.paymentTransaction,
              Accountings: JSON.stringify(this.accountings),
            };
          }, 0);
        } else {
          //ở trạng thái nhân bản
          this.paymentTransactionCompare = { ...this.i_paymentTransaction };
          if (
            this.formDetailsTransactionMode == typeOfUpdateCash.replicaPayment
          ) {
            await this.getNewCodeTransaction();
            this.paymentTransaction.PaymentCode = this.newCodeTransaction;
          }
          //ở trạng thái xem
          else {
            this.isDisable = true;
          }
          setTimeout(() => {
            this.paymentObjFullName = this.paymentTransaction.AccountObjectName;
            //console.log(this.paymentTransaction.Accountings);
            this.accountings = JSON.parse(this.paymentTransaction.Accountings);
          }, 0);
        }
      } else {
        // debugger;
        window.removeEventListener("keydown", this.handleDocumentKeydown);

        this.SET_VALIDATES({});
        this.paymentTransactionCompare = {};
        this.isDisable = false;
        this.accountingActive = null;
        this.fieldFocus = "";
        this.accountings = [
          {
            AccountingId: "1",
            AccountingDetail: "Chi tiền cho ",
            //Tài khoản nợ
            DebitAccount: null,
            //Tài khoản có
            AccountNumber: null,
            //
            Money: 0,
            AccountObjectId: "",
          },
        ];
        //Reset lại tất cả giá trị khi đóng form
        this.valueCbbCurrency = null;
        this.valueCbbAccountObj = null;
        this.valueCbbEmployee = null;
        this.paymentTransaction = {};
        this.accountingDate = null;
        this.paymentDate = null;
        this.paymentObjFullName = "";
        this.SET_TRANSACTION_ID_SELECTED(null);
        this.SET_FORM_DETAILS_TRANSACTION_MODE(typeOfUpdateCash.viewPayment);
        this.SET_SIZE_VENDORS_CBB(100);
        this.getVendorsCbb();
      }
    },
    //biến trung gian model ở mỗi cbb
    //
    paymentObjFullName(value) {
      this.paymentTransaction.AccountObjectName = value;
      this.paymentTransaction.PaymentReason =
        "Chi tiền cho " + (value ? value : "");
    },

    accountingDate(value, oldValue) {
      this.paymentTransaction.AccountingDate = value;
      if (oldValue) {
        if (+oldValue == +this.paymentTransaction.PaymentDate)
          this.paymentDate = value;
      } else {
        this.paymentDate = value;
      }
    },
    paymentDate(value) {
      this.paymentTransaction.PaymentDate = value;
    },

    valueCbbAccountObj(value) {
      this.accountings.forEach((acc) => {
        acc.AccountObjectId = value;
      });
      this.accountings = [...this.accountings];
      this.paymentTransaction.AccountObjectId = value;

      if (this.accountObjects) {
        const res = this.vendors.find((vendor) => {
          return vendor.VendorId == this.paymentTransaction.AccountObjectId;
        });
        if (res) {
          this.paymentObjFullName = res.VendorFullName;
          this.paymentTransaction.ReceiverName = res.VendorFullName;
          this.paymentTransaction.Address = res.ContactAddress;
        } else {
          this.paymentObjFullName = null;
          this.paymentTransaction.ReceiverName = null;
          this.paymentTransaction.Address = null;
          // this.paymentTransaction.AccountObjectName = null;
        }
      }
    },
    valueCbbEmployee(value) {
      this.paymentTransaction.EmployeeId = value;
    },
    valueCbbCurrency(value) {
      this.paymentTransaction.CurrencyId = value;
      if (this.currencys) {
        const res = this.currencys.find((currency) => {
          return currency.CurrencyId == this.paymentTransaction.CurrencyId;
        });
        if (res) {
          this.paymentTransaction.ExchangeRate = res.ExchangeRate;
        } else {
          this.paymentTransaction.ExchangeRate = null;
        }
      }
    },
    //phiếu chi nhận được khi get by id
    i_paymentTransaction(value) {
      this.paymentTransaction = { ...value };
      //
      this.valueCbbAccountObj = value.AccountObjectId;
      this.valueCbbEmployee = value.EmployeeId;
      this.valueCbbCurrency = value.CurrencyId;
      //
      setTimeout(() => {
        this.paymentObjFullName = value.AccountObjectName;
        this.paymentTransaction.ReceiverName = value.ReceiverName;
        this.paymentTransaction.Address = value.Address;
        this.paymentTransaction.PaymentReason = value.PaymentReason;
      }, 0);
      //
      this.accountingDate = new Date(value.AccountingDate);
      const vl = value.PaymentDate;
      setTimeout(() => {
        this.paymentDate = new Date(vl);
      }, 0);
    },
  },

  created() {
    this.getVendors();
  },

  methods: {
    ...mapActions([
      "getNewCodeTransaction",
      "getVendors",
      "getAccountObjects",
      "getBankAccounts",
      "getCurrencys",
      "getEmployeesCash",
      "getPaymentById",
      "addPayment",
      "getVendorsCbb",
    ]),
    ...mapMutations([
      "SET_ISSHOW_POPUP_DETAILS_PAYMENT",
      "SET_PAYMENT",
      "SET_TRANSACTION_ID_SELECTED",
      "SET_FORM_DETAILS_TRANSACTION_MODE",
      "SET_ISSHOW_DIALOG_ERR",
      "SET_VALIDATES",
      "SET_ERR_MESSAGE",
      "SET_ISSHOW_DIALOG_QUESTION",
      "SET_SIZE_VENDORS_CBB",
    ]),
    handleDocumentKeydown(e) {
      if (e.keyCode == 27) {
        this.SET_ISSHOW_POPUP_DETAILS_PAYMENT(false);
      } else if (e.keyCode == 83 && e.ctrlKey) {
        e.preventDefault();
        this.handleStore();
      } else if (e.keyCode == 83 && e.shiftKey) {
        this.handleStoreAndPrint();
      }
    },
    switchToAccountings() {
      this.accountingActive = 1;
    },
    handleScroll(cbbSize) {
      this.SET_SIZE_VENDORS_CBB(cbbSize);
      this.getVendorsCbb();
    },
    handleClickRowAccounting(account) {
      if (!this.isDisable) this.accountingActive = account.AccountingId;
    },
    handleClickAddOneRow() {
      if (!this.isDisable) {
        const acc = {
          ...this.accountings[this.accountings.length - 1],
          AccountingId: this.accountings.length + 1,
        };
        this.accountings = [...this.accountings, acc];
        setTimeout(() => {
          this.accountingActive = this.accountings.length;
        }, 0);
      }
    },
    handleClickRemoveARow(index) {
      if (!this.isDisable) {
        if (this.accountings.length > 1)
          this.accountings = this.accountings.filter((acc, idx) => {
            return idx != index;
          });
      }
    },
    handleClickRemoveAllRow() {
      if (!this.isDisable) {
        this.accountings = [
          {
            AccountingId: "1",
            AccountingDetail: "Chi tiền cho ",
            //Tài khoản nợ
            DebitAccount: null,
            //Tài khoản có
            AccountNumber: null,
            Money: 0,
            AccountObjectId: "",
          },
        ];
      }
    },
    //validate
    validate(payment) {
      let isValidate = true;
      let valids = {};
      if (!payment.PaymentCode) {
        valids = {
          ...valids,
          PaymentCode: true,
          PaymentCodeTitle: "Mã phiếu chi không được phép để trống.",
        };
        if (isValidate) {
          this.SET_ERR_MESSAGE("Mã phiếu chi không được phép để trống.");
        }
        isValidate = false;
      } else {
        const regex = /^((\bPC-))\d[0-9]+$/;
        if (!regex.test(payment.PaymentCode)) {
          valids = {
            ...valids,
            PaymentCode: true,
            PaymentCodeTitle: "Số phiếu chi không hợp lệ",
          };
          // this.validates.vendorCode = true;
          // this.validates.vendorCodeTitle = "Mã nhân viên không được để trống.";
          if (isValidate) {
            this.SET_ERR_MESSAGE("Số phiếu chi không hợp lệ");
          }
          isValidate = false;
        }
      }
      if (+new Date(payment.PaymentDate) > +new Date(payment.AccountingDate)) {
        valids = {
          ...valids,
          AccountingDate: true,
          AccountingDateTitle:
            "Ngày hạch toán phải lớn hơn hoặc bằng ngày chứng từ.",
        };
        if (isValidate) {
          this.SET_ERR_MESSAGE(
            "Ngày hạch toán phải lớn hơn hoặc bằng ngày chứng từ."
          );
        }
        isValidate = false;
      }
      this.SET_VALIDATES(valids);
      //Trả về true nếu validate thành công
      return isValidate;
    },
    //Xử lý cất
    handleStore() {
      if (!this.isDisable) {
        if (this.paymentTransaction.AccountingDate) {
          this.paymentTransaction.AccountingDate = new Date(
            this.paymentTransaction.AccountingDate
          ).toDateString();
        }
        if (this.paymentTransaction.PaymentDate) {
          this.paymentTransaction.PaymentDate = new Date(
            this.paymentTransaction.PaymentDate
          ).toDateString();
        }
        const dataSended = {
          ...this.paymentTransaction,
          Accountings: JSON.stringify(this.accountings),
        };
        if (this.validate(dataSended)) {
          this.addPayment(dataSended);
        } else {
          this.SET_ISSHOW_DIALOG_ERR({ isShow: "true", mess: this.errMessage });
        }
      }
    },
    //Cất và in
    handleStoreAndPrint() {
      if (!this.isDisable) {
        if (this.paymentTransaction.AccountingDate) {
          this.paymentTransaction.AccountingDate = new Date(
            this.paymentTransaction.AccountingDate
          ).toDateString();
        }
        if (this.paymentTransaction.PaymentDate) {
          this.paymentTransaction.PaymentDate = new Date(
            this.paymentTransaction.PaymentDate
          ).toDateString();
        }
        //dataSended là data sẽ được gửi khi
        const dataSended = {
          ...this.paymentTransaction,
          Accountings: JSON.stringify(this.accountings),
        };
        //Nếu validate thành công => gọi hàm thêm trong store
        if (this.validate(dataSended)) {
          this.addPayment(dataSended);
        } else {
          this.SET_ISSHOW_DIALOG_ERR({ isShow: "true", mess: this.errMessage });
        }
      }
    },
    //Xử lý khi click đÓng popup
    handleClosePopup() {
      if (!this.isDisable) {
        ///
        //Convert data của form ở trạng thái đầu tiên(lúc mới mở form) và data của form trước khi click đóng sang json
        //Nếu khác nhau => hiển thị thông báo dữ liệu đã thay đổi
        ///
        const dataSended = {
          ...this.paymentTransaction,
          PaymentDate: new Date(this.paymentTransaction.PaymentDate),
          AccountingDate: new Date(this.paymentTransaction.AccountingDate),
          Accountings: JSON.stringify(this.accountings),
        };
        const rootObj = JSON.stringify({
          ...this.paymentTransactionCompare,
          PaymentDate: this.paymentTransactionCompare.PaymentDate
            ? new Date(this.paymentTransactionCompare.PaymentDate)
            : null,
          AccountingDate: this.paymentTransactionCompare.AccountingDate
            ? new Date(this.paymentTransactionCompare.AccountingDate)
            : null,
        });
        // console.log(rootObj);
        // console.log(JSON.stringify(dataSended));
        if (rootObj == JSON.stringify(dataSended)) {
          this.SET_ISSHOW_POPUP_DETAILS_PAYMENT(false);
        } else {
          this.SET_PAYMENT(dataSended);
          this.SET_ISSHOW_DIALOG_QUESTION({
            isShow: true,
            mess: DialogQuestion.confirmChanged,
          });
        }
      } else {
        this.SET_ISSHOW_POPUP_DETAILS_PAYMENT(false);
      }
    },
  },
};
</script>

<style lang="scss">
@use "../../style/common/help.scss";
//datePicker
.transaction__infor__item {
  & .mx-datepicker {
    width: 100%;
  }
  & .mx-input {
    border-radius: 2px;
    height: 32px;
    border: 1px solid rgb(180, 180, 180);
    &:focus {
      border: 1px solid help.$main-color;
    }
    &:hover {
      // border: 1px solid rgb(180, 180, 180);
    }
    &:disabled {
      color: #545454;
      background: #edeef0;
    }
  }
}

@import "../../style/views/cash/popupDetailsTransaction.scss";
</style>
